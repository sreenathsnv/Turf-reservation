# from django.shortcuts import render
from django.http import HttpResponse
from .serializers import *
from .models import *
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import (HTTP_200_OK,
                                   HTTP_500_INTERNAL_SERVER_ERROR,
                                   HTTP_404_NOT_FOUND,
                                   HTTP_400_BAD_REQUEST,
                                   HTTP_201_CREATED,
                                   HTTP_403_FORBIDDEN

                                   )
from django.db.models import Q
from django.db.models import Count
from django.shortcuts import get_object_or_404

def test(request):
    return HttpResponse("hello world")

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_rooms_all(request):

    rooms = GameRoom.objects.all().order_by('created_at')

    try:
        room_serializer = GameRoomSerializer(rooms,many= True)

        return Response(room_serializer.data,status=HTTP_200_OK)
    except Exception as e:
        return Response({'error':str(e)},status=HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_turfs_all(request):

    turfs = Turf.objects.all().order_by('turf_name')

    name = request.GET.get('name','')
    city = request.GET.get('city','')

    print(f"Received search parameters - Name: {name}, Location: {city}")

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

        return Response({'error':str(e)},status=HTTP_500_INTERNAL_SERVER_ERROR)
    

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
    

    user = request.user
    
    
    if group.req_players <= group.player_count:

        return Response({'error':"This group is already full"},status=HTTP_400_BAD_REQUEST)
    
    elif user in group.players.all() :
        return Response({'error': 'User already exists'}, status=HTTP_400_BAD_REQUEST)
    else:

        group.players.add(user)
        group.save()

    serializer = GameRoomSerializer(group)

    
    return Response(serializer.data, status=HTTP_200_OK)
    
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_room(request):
    
    group_serializer = GameRoomSerializer(data=request.data)
  

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
       
        
        group = GameRoom.objects.get(id=pk)

        if not request.user in group.players.all():
            return Response({'error': 'User is not present in the group'}, status=HTTP_400_BAD_REQUEST)

        comment_serializer = GroupCommentsSerializer(data = request.data) 

        # Validate and save the serializer
        if comment_serializer.is_valid():
           
            comment_serializer.save(user=request.user)

            comments = GroupComments.objects.filter(group = pk)
            serializer = GroupCommentsSerializer(comments,many=True)

            return Response(serializer.data, status=HTTP_201_CREATED)
        else:
            return Response({'error': 'Error saving comment', 'details': comment_serializer.errors}, status=HTTP_400_BAD_REQUEST)
    

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
    group_id = comment.group
    
    if request.user != comment.user:
        return Response({'error':'Not allowed'},status=HTTP_403_FORBIDDEN)
    
    try:
        comment.delete()
        comments = GroupComments.objects.filter(group=group_id)
        serializer = GroupCommentsSerializer(comments,many=True)

        return Response(serializer.data,status=HTTP_200_OK)
    

    except GroupComments.DoesNotExist:
        return Response({'error':'Unknown error'},status=HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_group_details(request,pk):

    group = GameRoom.objects.get(id=pk)

    if group is None:
        return Response({'error':'No such group'},status=HTTP_400_BAD_REQUEST)
    
    serializer = GameRoomSerializer(group)

    return Response(serializer.data,status=HTTP_200_OK)


