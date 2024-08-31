from djoser.serializers import UserCreateSerializer
from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import (
    CustomUser,PlayerAnalysis,Turf,
    TurfReview,GameRoom,GroupComments,
    Payment,Booking,Notification,Slot
                     )

class CustomUserSerializer(UserCreateSerializer):

    class Meta:
        model = CustomUser
        fields = '__all__'


    def create(self, validated_data):
        print("Validated Data: ", validated_data)
        return super().create(validated_data)
    
class UserProfileSerializer(ModelSerializer):
    class Meta:
        model = CustomUser
        exclude = ['username','email','password','is_owner','is_superuser','is_staff','is_active','is_admin']

class PlayerAnalysisSerializer(ModelSerializer):
    
    class Meta:
        model = PlayerAnalysis
        fields = '__all__'

class SlotSerializer(ModelSerializer):
    
    class Meta:
        model = Slot
        fields = '__all__'

   
class TurfSerializer(ModelSerializer):
    
    slots = SlotSerializer(many=True,write_only=True)
    manager = serializers.CharField(source='turf_manager.username')
    class Meta:
        model = Turf
        fields = ['id','image', 'turf_name', 'description', 'city', 'state', 'zipcode', 'open_time', 'close_time', 'turf_manager', 'slots','price','phone','is_open','manager']

    def create(self,validated_data):
        slots_data = validated_data.pop('slots')
        turf = Turf.objects.create(**validated_data)

        for slot in slots_data:
            Slot.objects.create(turf=turf,**slot)
        
        return turf

class TurfSerializer(ModelSerializer):
    
    slots = SlotSerializer(many=True,write_only=True)
    manager = serializers.CharField(source='turf_manager.username')
    class Meta:
        model = Turf
        fields = ['id','image', 'turf_name', 'description', 'city', 'state', 'zipcode', 'open_time', 'close_time', 'turf_manager', 'slots','price','phone','is_open','manager']

    def create(self,validated_data):
        slots_data = validated_data.pop('slots')
        turf = Turf.objects.create(**validated_data)

        for slot in slots_data:
            Slot.objects.create(turf=turf,**slot)
        
        return turf
 
class POSTTurfSerializer(ModelSerializer):
    class Meta:
        model = Turf
        fields = ['id','image', 'turf_name', 'description', 'city', 'state', 'zipcode', 'open_time', 'close_time', 'turf_manager','price','phone']
 


class TurfReviewSerializer(ModelSerializer):
    
    username = serializers.CharField(source='user.username') 
    avatar = serializers.CharField(source='user.profile_pic') 
    class Meta:
        model = TurfReview
        fields = ['id', 'turf', 'rating', 'user', 'comments', 'updated_at', 'created_at','username','avatar']

class POSTTurfReviewSerializer(ModelSerializer):
    
    class Meta:
        model = TurfReview
        fields = ['id', 'rating', 'comments']
        


class GameRoomSerializer(serializers.ModelSerializer):
    turf = serializers.CharField(source='turf.turf_name')
    location = serializers.CharField(source='turf.city')
    slot_details = serializers.CharField(source='time_slot.start_time')

    class Meta:
        model = GameRoom
        fields = ['id', 'group_name', 'req_players', 'is_active', 'turf', 'location', 'slot_details', 'date',"time_slot"]

    def get_slot_details(self, obj):
        # Safely return the start_time if time_slot is set
        if obj.time_slot:
            return obj.time_slot.start_time
        return "16:20:39"  

class GETGameRoomSerializer(ModelSerializer):
    
    class Meta:
        model = GameRoom
        fields = ['group_name', 'req_players', 'time_slot', 'players', 'date', 'turf', 'is_active']
        # extra_fields = ['turf', 'location','slot_details']


class GroupCommentsSerializer(ModelSerializer):
    
    user = serializers.CharField(source='user.username')
    avatar = serializers.CharField(source='user.profile_pic')
    class Meta:
        model = GroupComments
        fields = ['id','user','body','created_at','group','avatar']

class PaymentSerializer(ModelSerializer):
    
    class Meta:
        model = Payment
        fields = '__all__'

class BookingSerializer(ModelSerializer):
    
    class Meta:
        model = Booking
        fields = '__all__'

class GETBookingSerializer(ModelSerializer):

    turf_name = serializers.CharField(source='turf.turf_name')    
    slot_details = serializers.CharField(source='time_slot.start_time')
    class Meta:
        model = Booking
        fields = ["id","user","turf_name","status","slot_details","total_amount","date","time_slot","updated_at","created_at"]

class NotificationSerializer(ModelSerializer):
    
    class Meta:
        model = Notification
        fields = '__all__'

