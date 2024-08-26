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
    class Meta:
        model = Turf
        fields = ['id', 'turf_name', 'description', 'city', 'state', 'zipcode', 'open_time', 'close_time', 'turf_manager', 'slots','price','phone','is_open']

    def create(self,validated_data):
        slots_data = validated_data.pop('slots')
        turf = Turf.objects.create(**validated_data)

        for slot in slots_data:
            Slot.objects.create(turf=turf,**slot)
        
        return turf

 
class TurfReviewSerializer(ModelSerializer):
    
    
    class Meta:
        model = TurfReview
        fields = '__all__'
        

class GameRoomSerializer(ModelSerializer):
    

    turf = serializers.CharField(source='turf.turf_name')
    location = serializers.CharField(source='turf.city')
    slot_details = serializers.CharField(source='time_slot.start_time')

    class Meta:
        model = GameRoom
        fields =  ['id','group_name','req_players','is_active','turf', 'location','slot_details'] 
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

class NotificationSerializer(ModelSerializer):
    
    class Meta:
        model = Notification
        fields = '__all__'

