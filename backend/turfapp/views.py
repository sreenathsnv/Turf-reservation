# from django.shortcuts import render
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
import stripe
from rest_framework_simplejwt.tokens import RefreshToken

def test(request):
    return HttpResponse("hello world")


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    try:
        refresh_token = request.data.get('refresh')
        token = RefreshToken(refresh_token)
        token.blacklist()  
        return Response({"detail": "Logout successful"}, status=HTTP_205_RESET_CONTENT)
    except TokenError:
            return Response({"detail": "Invalid or expired token"}, status=HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"detail": str(e)}, status=HTTP_400_BAD_REQUEST)
    
@cache_page(60 * 25)
@vary_on_cookie
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_rooms_all(request):

    rooms = GameRoom.objects.all().order_by('created_at')

    try:
        room_serializer = GameRoomSerializer(rooms,many= True)
        return Response(room_serializer.data,status=HTTP_200_OK)
    except Exception as e:
        return Response({'error':str(e)},status=HTTP_500_INTERNAL_SERVER_ERROR)

# @cache_page(60 * 25)
# @vary_on_cookie
@api_view(['GET'])
@permission_classes([AllowAny])
def get_turfs_all(request):

    turfs = Turf.objects.all().order_by('turf_name')

    name = request.GET.get('name','')
    city = request.GET.get('city','')

    # print(f"Received search parameters - Name: {name}, Location: {city}")

    if name and city:
        turfs = Turf.objects.filter(Q(turf_name__icontains=name) | Q(city__icontains=city))
    elif name:
        turfs = Turf.objects.filter(turf_name__icontains=name)
    elif city:
        turfs = Turf.objects.filter(city__icontains=city)

    
    try:
        turf_serializer = TurfSerializer(turfs,many=True)
        
        return Response(turf_serializer.data,status=HTTP_200_OK)
    except Exception as e:

        return Response({'error':str(e)},status=HTTP_400_BAD_REQUEST)


#==================== GROUP-RELATED APIs============================================== 

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_room(request):

    data = request.POST


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def join_group(request,pk):


    try:
        group = get_object_or_404(GameRoom.objects.annotate(player_count = Count('players')),id=pk)
    except GameRoom.DoesNotExist:
        return Response({'error':"Group doesn't exist"},status=HTTP_404_NOT_FOUND)
    
    if not group.is_active:
        return Response({'error':"This group is not active"},status=HTTP_400_BAD_REQUEST)
    
    user = request.user
    
    
    # if group.req_players <= group.player_count:

    #     return Response({'error':"This group is already full"},status=HTTP_400_BAD_REQUEST)
    
    if user in group.players.all() :
        print(user in group.players.all() ,group.players.all())
        return Response({'error': 'User already exists'}, status=HTTP_400_BAD_REQUEST)
    else:

        group.players.add(user)
        group.req_players -= 1

        
        group.save()
        group.refresh_from_db()
    serializer = GameRoomSerializer(group)

    
    return Response(serializer.data, status=HTTP_200_OK)
    
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_room(request):
    data = request.data.copy()
    data['group_admin'] = request.user.id
    group_serializer = GameRoomSerializer(data=data)
  
    
    if group_serializer.is_valid():

        game_room=group_serializer.save()

        game_room.players.add(request.user)

        game_room.save()

   
    else:
        return Response({'error':'Invalid data','details':group_serializer.errors},status=HTTP_400_BAD_REQUEST)
    
    return Response(group_serializer.data,status=HTTP_201_CREATED)






@api_view(['POST','GET'])
@permission_classes([IsAuthenticated])
def comments(request,pk):
    if request.method == 'POST':
        try:

            group = GameRoom.objects.get(id=pk)
        except GameRoom.DoesNotExist:
             return Response({'error': 'Group is not present '}, status=HTTP_400_BAD_REQUEST)
        if not request.user in group.players.all():
            return Response({'error': 'User is not present in the group'}, status=HTTP_400_BAD_REQUEST)

        

        # Validate and save the serializer
        
        GroupComments.objects.create(
        user=request.user,
        group=group,
        body=request.data.get('body'),
        
    )

        comments = GroupComments.objects.filter(group = pk)
        serializer = GroupCommentsSerializer(comments,many=True)

        return Response(serializer.data, status=HTTP_201_CREATED)
        
    

    if request.method == 'GET':

        try: 
            comments = GroupComments.objects.filter(group = pk)
            serializer = GroupCommentsSerializer(comments,many=True)

            return Response(serializer.data, status=HTTP_200_OK)
        
        except Exception as e:
            return Response({'error':'Some error occured','details':str(e)}, status=HTTP_400_BAD_REQUEST)




@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_comment(request,pk):
    
    comment = get_object_or_404(GroupComments,id=pk)
    group_id = comment.group.id
    group = get_object_or_404(GameRoom,id=group_id)
    if request.user != comment.user or request.user != group.group_admin:
        return Response({'error':'Not allowed'},status=HTTP_403_FORBIDDEN)
    
    try:
        comment.delete()
        comments = GroupComments.objects.filter(group=group_id)
        serializer = GroupCommentsSerializer(comments,many=True)

        return Response(serializer.data,status=HTTP_200_OK)
    

    except GroupComments.DoesNotExist:
        return Response({'error':'Unknown error'},status=HTTP_400_BAD_REQUEST)

# @cache_page(60 * 10)
# @vary_on_cookie
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_group_details(request,pk):

    group = GameRoom.objects.get(id=pk)
    group.refresh_from_db()
    
    if group is None:
        return Response({'error':'No such group'},status=HTTP_400_BAD_REQUEST)
    


    players = group.players.all()
    
    if request.user in players:
        is_member = True
    else:
        is_member = False

    if request.user == group.group_admin:
        is_admin= True
    else:
        is_admin = False

    players_details = [CustomUserSerializer(player).data for player in players]
    turf_info = Turf.objects.get(id = group.turf.id)
    turf_serializer = TurfSerializer(turf_info)
    serializer = GameRoomSerializer(group)

    response = {
        'group_info': serializer.data,
        'player_info':players_details,
        'turf_info':turf_serializer.data,
        'is_member':is_member,
        'is_admin':is_admin
    }
    return Response(response,status=HTTP_200_OK)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def remove_user(request,pk):
    
    group = GameRoom.objects.get(id=pk)
    user = request.data.get('user')
    
    try:
        user = CustomUser.objects.get(id=user)
    except CustomUser.DoesNotExist:
        return Response({'Error':'User Does not exist'})

    if not request.user == group.group_admin:
        return Response({'Error':'You are not a Group admin'},status=HTTP_403_FORBIDDEN)
    
    if group.group_admin == user:
        GameRoom.objects.delete(group)
        return Response({'details':'group deleted'},status=HTTP_200_OK)

    if not user in group.players.all():

        return Response({'Error':'User not present'},status=HTTP_400_BAD_REQUEST)
    
    try:
        group.players.remove(user)
        group.req_players += 1
        group.save()
        group.refresh_from_db()
        serializer = GameRoomSerializer(group)
        return Response(serializer.data,status=HTTP_200_OK)

    except Exception as e:
        return Response({'Error':str(e)},status=HTTP_400_BAD_REQUEST)
    
    
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])

def leave_group(request,pk):

    group = GameRoom.objects.get(id=pk)

    if not request.user in group.players.all():
        return Response({'ERROR':'You are not a member of this group'},status=HTTP_400_BAD_REQUEST)
    
    try:
        group.players.remove(request.user)
        print(request.user in group.players.all())
        group.req_players += 1
        group.save()
        group.refresh_from_db()
        serializer = GameRoomSerializer(group)
        return Response(serializer.data,status=HTTP_200_OK)
    except Exception as e:
        return Response({'Error':str(e)},status=HTTP_400_BAD_REQUEST)


# @cache_page(60 * 25)
# @vary_on_cookie
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_groups(request):
    groups = GameRoom.objects.filter(players = request.user)
    
    serializer = GameRoomSerializer(groups,many=True)

    return Response(serializer.data,status=HTTP_200_OK)



#========================= USER Profile ==========================

@cache_page(60 * 25)
@vary_on_cookie
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_profile(request,pk=None):
    
    player_analysis = None
    my_groups = None
    groups_in = None
    bookings = None
    payments = None

    turf_owned = None

    if pk is None:
        user = request.user
    else:
        user = CustomUser.objects.get(id=pk)


    if request.method == 'GET':
        
        if user.is_owner:
            player_analysis = None
            turf_owned = Turf.objects.filter(turf_manager = user)
            bookings = None
            if request.user == user:
                
                bookings = Booking.objects.filter(turf__turf_manager = user)
                payments = Payment.objects.filter(booking__turf__turf_manager = user)


        else:
            player_analysis = PlayerAnalysis.objects.filter(player = user)
            my_groups = GameRoom.objects.filter(group_admin=user)
            groups_in = GameRoom.objects.filter(players = user)
            if user == request.user:
                bookings = Booking.objects.filter(user = user)
                payments = Payment.objects.filter(user=user)

        user_serializer = CustomUserSerializer(user)
        turf_serializer = TurfSerializer(turf_owned,many=True)
        booking_serializer = BookingSerializer(bookings,many=True)
        payment_serializer = PaymentSerializer(payments,many=True)
        player_analysis_serializer = PlayerAnalysisSerializer(player_analysis,many=True)
        my_group_serializer = GameRoomSerializer(my_groups,many=True)
        group_in__serializer = GameRoomSerializer(groups_in,many=True)

    #TODO: Analsysis Report
        


        response = {
            "user_details":user_serializer.data,
            "booking":booking_serializer.data,
            "turfs":turf_serializer.data,
            "payment":payment_serializer.data,
            "analysis":player_analysis_serializer.data,
            "groups":{
                "my_groups":my_group_serializer.data,
                "groups_in":group_in__serializer.data,
            },

            

        }
        return Response(response,status=HTTP_200_OK)


@cache_page(60 * 10)
@vary_on_cookie
@api_view(['PUT','PATCH'])
@permission_classes([IsAuthenticated])
def update_user_profile(request):
    
    user = get_object_or_404(CustomUser,id = request.user.id)

    if request.method == 'PUT':
        serializer = UserProfileSerializer(user,data=request.data)
    if request.method == 'PATCH':
        serializer = UserProfileSerializer(user,data=request.data,partial=True)
    
    if serializer.is_valid():
        serializer.save()
        
        return Response(serializer.data,status=HTTP_200_OK)
    
    return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)



#====================== Turf ====================

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_turf(request):
    
    if not request.user.is_owner:
        return Response({'error':'Not allowed.User is not a turf manager'},status=HTTP_400_BAD_REQUEST)
    
    serializer = TurfSerializer(data= request.data)

    if serializer.is_valid():

        serializer.save(turf_manager = request.user)
        return Response(serializer.data,status=HTTP_201_CREATED)
    
    return Response({'error':serializer.errors},status=HTTP_400_BAD_REQUEST)
    
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_turf(request,pk):
    
    try:

        turf = get_object_or_404(id=pk)
    except Turf.DoesNotExist:
        return Response({'error':'Object does not Exists'},status=HTTP_400_BAD_REQUEST)
    
    if not request.user.is_owner:
        return Response({'error':'Not allowed.User is not a turf manager'},status=HTTP_400_BAD_REQUEST)

    serializer = TurfSerializer(turf,data = request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data,status=HTTP_200_OK)
     
    return Response({'error':serializer.error_messages},status=HTTP_400_BAD_REQUEST)
    

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_turf(request,pk):
    
        try:
            turf = get_object_or_404(id=pk)
        except Turf.DoesNotExist:
            return Response({'error':'Object does not Exists'},status=HTTP_400_BAD_REQUEST)
        
        if not request.user.is_owner:
            return Response({'error':'Not allowed.User is not a turf manager'},status=HTTP_400_BAD_REQUEST)

        try:
            turf.delete()
            turfs = Turf.objects.all()
            serializer = TurfSerializer(turfs,many=True)
            return Response(serializer.data,status=HTTP_200_OK)
        
        except Exception as e:
            return Response({'error':str(e)},status=HTTP_400_BAD_REQUEST)
        
        
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def view_turfs(request):
    
    if not request.user.is_owner:
            return Response({'error':'Not allowed.User is not a turf manager'},status=HTTP_400_BAD_REQUEST)

    turfs = Turf.objects.filter(turf_manager=request.user)

    serializer = TurfSerializer(turfs,many=True)

    return Response(serializer.data,status=HTTP_200_OK)


@api_view(['GET'])
@permission_classes([AllowAny])
def view_a_turf(request,pk):

    try:
        turf = Turf.objects.get(id=pk)
        print(turf)
    except Turf.DoesNotExist:
        return Response({'error':'Turf does not Exists'},status=HTTP_400_BAD_REQUEST)

    slots = Slot.objects.filter(turf=turf)
    reviews = TurfReview.objects.filter(turf=turf)
    t_serializer = TurfSerializer(turf)
    s_serializer = SlotSerializer(slots,many=True)
    r_serializer = TurfReviewSerializer(reviews,many=True)

    response={
        'turf_data':t_serializer.data,
        'turf_reviews':r_serializer.data,
        'slots_info':s_serializer.data
    } 

    return Response(response,status=HTTP_200_OK)


#================== Slots =====================================
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_slots(request):
    
    if not request.user.is_owner:
            return Response({'error':'Not allowed.User is not a turf manager'},status=HTTP_400_BAD_REQUEST)


    slot = SlotSerializer(data=request.data)

    if slot.is_valid():
        slot.save()
        return Response(slot.data,status=HTTP_200_OK)
    else:
        return Response({'error':str(slot.error_messages)},status=HTTP_400_BAD_REQUEST)
    

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_slot(request,pk):
    
    if not request.user.is_owner:
            return Response({'error':'Not allowed.User is not a turf manager'},status=HTTP_400_BAD_REQUEST)

    try:
        slot = Slot.objects.get(id=pk)
        turf = slot.turf

        turf_manager = turf.turf_manager
        
        if not turf_manager != request.user:
            return Response({'error':'Not allowed'},status=HTTP_400_BAD_REQUEST)
        
    except Slot.DoesNotExist:
        return Response({'error':'The slot does not exist'},status=HTTP_400_BAD_REQUEST)
    
    slot.delete()
    slots = Slot.objects.filter(turf=turf)

    serializer = SlotSerializer(slots,many=True)

    return Response(serializer.data,status=HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def view_available_slots(request,pk):
    
    pass

#=========================Booking ==================


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def book_turf(request):
    user = request.user
    total_amount = request.data.get('total_amount')
    turf = Turf.objects.get(id= request.data.get('turf'))
    slot = Slot.objects.get(id = request.data.get('time_slot'))
    
    try:
        
        
        serializer = BookingSerializer(data={
    'user': user.id,
    'turf': turf.id,
    'time_slot': slot.id,  
    'date': timezone.now().date() if not request.data.get('date') else request.data.get('date'),  
    'total_amount': total_amount
})

        if serializer.is_valid():
            serializer.save()
            print("done")
            return Response({
                'data':serializer.data,
                'slot_details':SlotSerializer(slot).data,
                'turf_data':TurfSerializer(turf).data,
                }, status=HTTP_201_CREATED)
        else:
            return Response({'error':str(serializer.errors)},status=HTTP_400_BAD_REQUEST)
        
    except Turf.DoesNotExist:
        return Response({'error': 'Turf not found'}, status=HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=HTTP_500_INTERNAL_SERVER_ERROR)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def cancel_booking(request):
    booking_id = request.data.get('booking_id')

    

    try:
        booking = Booking.objects.get(id=booking_id, user=request.user)
        
        if request.user != booking.user:
            return Response({'error': 'Not allowed'}, status=HTTP_400_BAD_REQUEST)
        if booking.status == 'Pending':
            booking.delete()
            return Response({'details': 'Deleted succesffully'}, status=HTTP_200_OK)

        booking.status = 'Cancelled'
        booking.turf = None
        booking.date  = None
        booking.save()
        serializer = BookingSerializer(booking)
        
        try:
            
            payment = Payment.objects.get(booking=booking)
            payment.payment_status = 'Refund'
            payment.save()
        except Payment.DoesNotExist:
            booking.delete()
        return Response(serializer.data, status=HTTP_200_OK)
    except Booking.DoesNotExist:
        return Response({'error': 'Booking not found or not authorized'}, status=HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_payment(request):
    data = request.data
    user = request.user
    booking_id = data.get('booking_id')
    payment_method = data.get('payment_method', 'Credit Card')
    
    try:
        
        booking = Booking.objects.get(id=booking_id)

        
        charge = stripe.Charge.create(
            amount=int(data['amount']),
            currency=data.get('currency', 'INR'),
            source=data['token'], 
            description=f"Charge for {user.email} - Booking ID: {booking_id}",
        )

        
        payment = Payment.objects.create(
            user=user,
            booking=booking,
            amount=data['amount'],
            currency=data.get('currency', 'usd'),
            payment_method=payment_method,
            payment_status='Completed',
            transaction_id=charge['id'],
        )

        booking.status = 'Confirmed'
        booking.save()


        return Response(PaymentSerializer(payment).data, status=HTTP_201_CREATED)

    except Booking.DoesNotExist:
        return Response({"error": "Booking not found"}, status=HTTP_404_NOT_FOUND)
    
    except stripe.error.StripeError as e:
        return Response({"error": str(e)}, status=HTTP_400_BAD_REQUEST)
    
    except Exception as e:
        return Response({"error": str(e)}, status=HTTP_400_BAD_REQUEST)
    

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def post_player_review(request):

    try:
        player = CustomUser.objects.get(id=request.data.get('player'))
        print("player retrived",player.username)
        if player is None:
            return Response({"error": "Player does not exist"}, status=HTTP_400_BAD_REQUEST)
        
        latest_data = PlayerAnalysis.objects.filter(player=player).order_by('-games_played').first()
        
        if latest_data is None:
            games_played = 1
            
        else:   
            games_played = latest_data.games_played + 1
        serializer = PlayerAnalysisSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(games_played=games_played)
            return Response(serializer.data,status=HTTP_200_OK)
        else:
            return Response({"error": str(serializer.errors)}, status=HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"error": str(e)}, status=HTTP_400_BAD_REQUEST)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def post_turf_review(request):

    try:

        serializer = TurfReviewSerializer(request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data,status=HTTP_200_OK)
        else:
            Response({"error": str(serializer.errors)}, status=HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"error": str(e)}, status=HTTP_400_BAD_REQUEST)
    