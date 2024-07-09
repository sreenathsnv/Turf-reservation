from djoser.serializers import UserCreateSerializer
from .models import CustomUser

class CustomUserSerializer(UserCreateSerializer):

    class Meta:
        model = CustomUser
        fields = ("id", "email", "username", "name", "password",'phone','is_owner')