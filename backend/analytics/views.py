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




def test(request):
    return HttpResponse("Good to Go")

#========================================PLayer View================================================


#*************Performance Metrics*********************

@api_view(['GET'])
def performance_metrics_over_time(request, player_id):
    from datetime import timedelta
    
    # Define the time range
    end_date = now().date()
    start_date = end_date - timedelta(days=30)
    
    # Filter PlayerAnalysis data for the specified player and time range
    player_performance = PlayerAnalysis.objects.filter(
        player__id=player_id,
        created_at__range=[start_date, end_date]
    ).values('created_at').annotate(
        avg_dribble=Avg('dribble'),
        avg_shoot=Avg('shoot'),
        avg_pass_acuracy=Avg('pass_acuracy'),
        avg_defence=Avg('defence')
    ).order_by('created_at')

    data = {
        'dates': [entry['created_at'] for entry in player_performance],
        'avg_dribble': [entry['avg_dribble'] for entry in player_performance],
        'avg_shoot': [entry['avg_shoot'] for entry in player_performance],
        'avg_pass_acuracy': [entry['avg_pass_acuracy'] for entry in player_performance],
        'avg_defence': [entry['avg_defence'] for entry in player_performance]
    }
    
    serializer = PerformanceMetricsOverTimeSerializer(data)
    return Response(serializer.data)

#****************Overall Performance Rating***************************

@api_view(['GET'])
def overall_performance_rating(request, player_id):
    try:
        player = PlayerAnalysis.objects.get(player__id=player_id)
        serializer = OverallPerformanceRatingSerializer(player)
        return Response(serializer.data)
    except PlayerAnalysis.DoesNotExist:
        return Response({'error': 'Player not found'}, status=404)
    
#Skill Radar
@api_view(['GET'])
def player_skill_radar_chart(request, player_id):
    try:
        player = PlayerAnalysis.objects.get(player__id=player_id)
        serializer = SkillRadarChartSerializer(player)
        return Response(serializer.data)
    except PlayerAnalysis.DoesNotExist:
        return Response({'error': 'Player not found'}, status=404)
    

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
@api_view(['GET'])
@permission_classes([IsAuthenticated])
class ExportBookingsCSVView(APIView):
    def get(self, request, *args, **kwargs):
        start_date = request.GET.get('start_date')
        end_date = request.GET.get('end_date')
        
        if start_date and end_date:
            bookings = Booking.objects.filter(date__range=[start_date, end_date], status='Confirmed')
        else:
            bookings = Booking.objects.filter(status='Confirmed')
        
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="bookings.csv"'
        writer = csv.writer(response)
        writer.writerow(['Date', 'Time Slot', 'User', 'Turf', 'Total Amount', 'Status'])

        for booking in bookings:
            writer.writerow([booking.date, booking.time_slot, booking.user.name, booking.turf.turf_name, booking.total_amount, booking.status])

        return response
    