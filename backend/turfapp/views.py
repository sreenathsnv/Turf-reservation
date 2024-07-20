# from django.shortcuts import render
from django.http import HttpResponse
from .serializers import *
from .models import *
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK,HTTP_500_INTERNAL_SERVER_ERROR


# Create your views here.


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

    turfs  = Turf.objects.filter(turf_name__icontains = name)
    turfs += Turf.objects.filter(city__icontains = city)

    try:
        turf_serializer = TurfSerializer(turfs,many=True)

        return Response(turf_serializer.data,status=HTTP_200_OK)
    except Exception as e:

        return Response({'error':str(e)},status=HTTP_500_INTERNAL_SERVER_ERROR)
    

    
