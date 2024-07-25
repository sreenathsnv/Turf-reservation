from djoser.serializers import UserCreateSerializer
from rest_framework.serializers import ModelSerializer
from .models import (
    CustomUser,PlayerAnalysis,Turf,
    TurfReview,GameRoom,GroupComments,
    Payment,Booking,Notification
                     )

class CustomUserSerializer(UserCreateSerializer):

    class Meta:
        model = CustomUser
        fields = ("id", "email", "username", "name", "password",'phone','is_owner','pref_position','location','profile_pic')


class PlayerAnalysisSerializer(ModelSerializer):
    
    class Meta:
        model = PlayerAnalysis
        fields = '__all__'

class TurfSerializer(ModelSerializer):
    
    class Meta:
        model = Turf
        fields = '__all__'

class TurfReviewSerializer(ModelSerializer):
    
    class Meta:
        model = TurfReview
        fields = '__all__'


class GameRoomSerializer(ModelSerializer):
    
    class Meta:
        model = GameRoom
        fields = '__all__'

class GroupCommentsSerializer(ModelSerializer):
    
    class Meta:
        model = GroupComments
        fields = '__all__'

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
