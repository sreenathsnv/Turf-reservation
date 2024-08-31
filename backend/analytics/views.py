from analytics.serializers import PlayerAnalysisSerializer
from django.http import HttpResponse
from .serializers import *
from .models import *
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework.response import Response
from rest_framework.status import (HTTP_200_OK,
                                   HTTP_500_INTERNAL_SERVER_ERROR,
                                   HTTP_404_NOT_FOUND,
                                   HTTP_400_BAD_REQUEST,
                                   HTTP_201_CREATED,
                                   HTTP_403_FORBIDDEN,
                                   HTTP_205_RESET_CONTENT

                                   )
from django.db.models import Q
from django.db.models import Count
from django.shortcuts import get_object_or_404
from django.views.decorators.cache import cache_page
from django.views.decorators.vary import vary_on_cookie
from django.utils.timezone import now 
from turfapp.models import Booking
from turfapp.models import PlayerAnalysis
from rest_framework.views import APIView
import csv
from django.db.models import Avg
from django.db.models import Sum
from datetime import timedelta






def test(request):
    return HttpResponse("Good to Goo")

#========================================PLayer View================================================




#Performance Metrics********************************

@api_view(['GET'])
def current_performance_metrics(request, player_id):
    today = now().date()
    
    # Filter PlayerAnalysis data for the specified player and today
    player_performance = PlayerAnalysis.objects.filter(
        player__id=player_id,
        created_at__date=today
    ).aggregate(
        avg_dribble=Avg('dribble'),
        avg_shoot=Avg('shoot'),
        avg_pass_acuracy=Avg('pass_acuracy'),
        avg_defence=Avg('defence')
    )

    # Handle cases where there are no records for the day
    data = {
        'avg_dribble': player_performance['avg_dribble'] if player_performance['avg_dribble'] is not None else 0.0,
        'avg_shoot': player_performance['avg_shoot'] if player_performance['avg_shoot'] is not None else 0.0,
        'avg_pass_acuracy': player_performance['avg_pass_acuracy'] if player_performance['avg_pass_acuracy'] is not None else 0.0,
        'avg_defence': player_performance['avg_defence'] if player_performance['avg_defence'] is not None else 0.0
    }
    
    serializer = CurrentPerformanceMetricsSerializer(data)
    return Response(serializer.data)

#Overall Performance Rating*********************************

from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_list_or_404
from .models import PlayerAnalysis
from .serializers import OverallPerformanceRatingSerializer

@api_view(['GET'])
def overall_performance_rating(request, player_id):
    # Retrieve all PlayerAnalysis instances for the given player
    player_analyses = PlayerAnalysis.objects.filter(player__id=player_id)
    
    if not player_analyses.exists():
        return Response({'error': 'Player not found'}, status=404)
    
    # Aggregate the data (e.g., average the ratings)
    total_dribble = sum([p.dribble for p in player_analyses])
    total_shoot = sum([p.shoot for p in player_analyses])
    total_pass_accuracy = sum([p.pass_acuracy for p in player_analyses])
    total_defence = sum([p.defence for p in player_analyses])
    count = player_analyses.count()

    overall_rating = (total_dribble + total_shoot + total_pass_accuracy + total_defence) / (4 * count)

    data = {
        'player': player_id,
        'dribble': total_dribble // count,
        'shoot': total_shoot // count,
        'pass_acuracy': total_pass_accuracy // count,
        'defence': total_defence // count,
        'overall_rating': overall_rating
    }

    return Response(data)

    
#Skill Radar
@api_view(['GET'])
def player_skill_radar_chart(request, player_id):
    try:
        # Fetch a single instance of PlayerAnalysis
        player = PlayerAnalysis.objects.get(player__id=player_id)
        serializer = SkillRadarChartSerializer(player)
        return Response(serializer.data)
    except PlayerAnalysis.DoesNotExist:
        return Response({'error': 'Player not found'}, status=404)
    except PlayerAnalysis.MultipleObjectsReturned:
        return Response({'error': 'Multiple records found'}, status=400)
    
    
#===========================================ADMIN VIEW==================================================


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def DailyBookingsView(request):
    today = now().date()
    bookings_today = Booking.objects.filter(date=today).count()
    data = {'date': today, 'count': bookings_today}
    serializer = DailyBookingSerializer(data)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def WeeeklyBookingsView(request):
    today = now().date()
    bookings_this_week = Booking.objects.filter(date__week=today.isocalendar()[1]).count()
    data = {'date': today, 'count': bookings_this_week}
    serializer = WeeklyBookingSerializer(data)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def MonthlyBookingView(request):
    today = now().date()
    bookings_this_month = Booking.objects.filter(date__month=today.month).count()
    data = {'date': today, 'count': bookings_this_month}
    serializer = MonthlyBookingSerializer(data)
    return Response(serializer.data)




#--------------------------RevenueView-------------------------------------------------

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def RevenueView(request):
    today = now().date()
    revenue_today = Booking.objects.filter(date=today, status='Confirmed').aggregate(Sum('total_amount'))['total_amount__sum'] or 0.00
    data = {'date': today, 'revenue': revenue_today}
    serializer = RevenueSerializer(data)
    return Response(serializer.data)


#-----------------------------TotalBookingToday--------------------------------------------

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def TotalBookingsTodayView(request):
    today = now().date()
    total_bookings_today = Booking.objects.filter(date=today, status='Confirmed').count()
    data = {'total_bookings_today': total_bookings_today}
    return Response(data)




#---------------------------------Export CSV--------------------------------------------------

import csv
from datetime import datetime
from django.http import HttpResponse
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from .models import Booking

class ExportBookingsCSVView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        start_date_str = request.GET.get('start_date')
        end_date_str = request.GET.get('end_date')

        try:
            if start_date_str and end_date_str:
                start_date = datetime.strptime(start_date_str, '%Y-%m-%d').date()
                end_date = datetime.strptime(end_date_str, '%Y-%m-%d').date()
                bookings = Booking.objects.filter(date__range=[start_date, end_date], status='Confirmed')
            else:
                bookings = Booking.objects.filter(status='Confirmed')
        except ValueError:
            return HttpResponse('Invalid date format. Please use YYYY-MM-DD.', status=400)

        # Create a CSV response
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="bookings.csv"'
        
        # Create a CSV writer
        writer = csv.writer(response)
        writer.writerow(['Date', 'Time Slot', 'User', 'Turf', 'Total Amount', 'Status'])
        
        # Write the booking data
        for booking in bookings:
            writer.writerow([
                booking.date,
                booking.time_slot,
                booking.user.name if booking.user else 'N/A',
                booking.turf.turf_name if booking.turf else 'N/A',
                booking.total_amount,
                booking.status
            ])
        
        return response
    
#--------------------------------forecast Booking-------------------------------------------


# views.py
import pandas as pd
from django.http import JsonResponse
from prophet import Prophet
from turfapp.models import Booking
from django.db.models import Count

def forecast_occupancy(request):
    # Fetch historical booking data
    data = Booking.objects.filter(status='Confirmed').values('date').annotate(bookings=Count('id')).order_by('date')
    df = pd.DataFrame(data)

    if df.empty:
        return JsonResponse({'error': 'No booking data available for forecasting'}, status=400)

    df['date'] = pd.to_datetime(df['date'])
    df = df.rename(columns={'date': 'ds', 'bookings': 'y'})

    # Initialize and fit the Prophet model
    model = Prophet(yearly_seasonality=True, weekly_seasonality=True)
    model.fit(df)

    # Create future dataframe
    future = model.make_future_dataframe(periods=30)
    forecast = model.predict(future)

    # Extract components
    trend = forecast[['ds', 'trend']].to_dict(orient='records')
    yearly = forecast[['ds', 'yearly']].to_dict(orient='records')
    weekly = forecast[['ds', 'weekly']].to_dict(orient='records')

    # Convert forecast to JSON
    forecast_json = forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper']].to_dict(orient='records')

    response = {
        'forecast': forecast_json,
        'trend': trend,
        'yearly': yearly,
        'weekly': weekly
    }

    return JsonResponse(response, safe=False,status=200)


#====================================player comparison==========================================================

#player comparison

# from django.http import JsonResponse
# from django.shortcuts import get_object_or_404
# from .models import PlayerAnalysis

def compare_players_in_room(request, room_id):
    # Retrieve the game room
    game_room = get_object_or_404(GameRoom, id=room_id)

    # Retrieve player performance data for a specific game room
    players = PlayerAnalysis.objects.filter(player__in=game_room.players.all()).values(
        'player__name',
        'pref_position',
        'games_played',
        'dribble',
        'shoot',
        'pass_acuracy',
        'defence',
        'diving',
        'reflexes',
        'positioning'
    )[:10]
    
    comparison_data = list(players)
    def calculate_performance_score(player):
            return (
                player['shoot'] * 0.4 +  # Example weight for shooting
                player['dribble'] * 0.3 + # Example weight for dribbling
                player['pass_acuracy'] * 0.2 + # Example weight for passing accuracy
                player['defence'] * 0.1    # Example weight for defense
            )
        
    # Calculate scores for each player and add them to the data
    def calculate_performance_score(player):
        return (
            player.get('shoot', 0) * 0.4 +  # Example weight for shooting
            player.get('dribble', 0) * 0.3 + # Example weight for dribbling
            player.get('pass_acuracy', 0) * 0.2 + # Example weight for passing accuracy
            player.get('defence', 0) * 0.1    # Example weight for defense
        )
        
        # Calculate scores for each player and add them to the data
    for player in comparison_data:
        player['score'] = calculate_performance_score(player)


    sorted_players = sorted(comparison_data, key=lambda x: x['score'], reverse=True)
    
    return JsonResponse(comparison_data, safe=False)

#=====================================================================================================

import pandas as pd
from django.http import JsonResponse
from statsmodels.tsa.arima.model import ARIMA
from .models import PlayerAnalysis
def player_performance_analysis(request, player_id, attribute):
    # Fetch the player's performance data for the specified attribute
    performance_data = PlayerAnalysis.objects.filter(player_id=player_id).order_by('updated_at').values('updated_at', attribute)
    
    # Convert to DataFrame
    df = pd.DataFrame(list(performance_data))
    df.set_index('updated_at', inplace=True)
    
    # Ensure there is enough data for analysis
    if df.empty or len(df) < 2:
        return JsonResponse({'error': 'Not enough data for analysis.'}, status=400)
    
    # Fit ARIMA model
    model = ARIMA(df[attribute], order=(1, 1, 1))
    results = model.fit()

    # Forecast future values
    forecast = results.get_forecast(steps=10)
    forecast_df = forecast.conf_int()
    forecast_df['forecast'] = results.predict(start=forecast_df.index[0], end=forecast_df.index[-1])

    # Prepare response data
    forecast_df.reset_index(inplace=True)
    response_data = forecast_df[['index', 'forecast']].rename(columns={'index': 'ds'}).to_dict(orient='records')

    return JsonResponse(response_data, safe=False)