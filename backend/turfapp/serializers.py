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
        fields = '__all__'


    def create(self, validated_data):
        print("Validated Data: ", validated_data)
        return super().create(validated_data)
    
class UserProfileSerializer(ModelSerializer):
    class Meta:
        model = CustomUser
        exclude = ['username','email','password']

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
