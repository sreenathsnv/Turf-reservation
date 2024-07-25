from django.db import models
from django.contrib.auth.models import AbstractBaseUser,PermissionsMixin
from django.core.validators import MaxValueValidator,MinValueValidator
from django.utils import timezone
from .manager import CustomUserManager
# Create your models here.




class CustomUser(AbstractBaseUser,PermissionsMixin):

    email = models.EmailField(unique=True)
    name  = models.TextField(max_length=100)
    username = models.TextField(max_length=27,unique=True)
    phone = models.BigIntegerField(blank=True,null=True)
    favourite = models.TextField(null=True,blank=True,max_length=30,default='Football')
    profile_pic = models.ImageField(upload_to='profile_pics/',default='/dummy/empty.png')
    location = models.TextField(blank=True,null=True,default="Kerala",max_length=60)
    pref_position = models.TextField(blank=True,null=True,max_length=30)

    
    is_owner = models.BooleanField(default=False)


    is_admin = models.BooleanField(default=False) 
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']



    objects = CustomUserManager()


    
    def __str__(self) -> str:
        return self.username

class PlayerAnalysis(models.Model):

    player = models.ForeignKey(CustomUser,on_delete=models.CASCADE)
    total_play = models.IntegerField(blank=True,null=True)
    dble = models.IntegerField(blank=True,null=True)
    shoot = models.IntegerField(blank=True,null=True)
    pas = models.IntegerField(blank=True,null=True)
    defc = models.IntegerField(blank=True,null=True)

    
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)


class Turf(models.Model):
    
    turf_name = models.TextField(max_length=75)
    description = models.TextField(max_length=300)
    city = models.TextField(max_length=30)
    state = models.TextField(max_length=30)
    zipcode = models.TextField(max_length=20)

    open_time = models.TimeField(blank=True,null=True)
    close_time = models.TimeField(blank=True,null=True)

    turf_manager = models.ForeignKey(CustomUser,on_delete=models.CASCADE)
    
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)


class TurfReview(models.Model):
    
    turf = models.ForeignKey(Turf,on_delete=models.CASCADE)
    rating = models.IntegerField(validators=[MinValueValidator(0),MaxValueValidator(5)])
    user = models.ForeignKey(CustomUser,on_delete=models.CASCADE)
    comments = models.TextField(max_length=250)

    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)



class GameRoom(models.Model):

    group_name = models.TextField(max_length=24)
    req_players = models.IntegerField()
    time_slot = models.DateTimeField(default=timezone.now)
    visibility = models.TextField(default='public')

    players = models.ManyToManyField(CustomUser,blank=True,default=None)

    turf = models.ForeignKey(Turf,on_delete=models.CASCADE)

    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)





class GroupComments(models.Model):
    user = models.ForeignKey(CustomUser,on_delete=models.CASCADE)
    body = models.TextField(max_length=250)
    group = models.ForeignKey(GameRoom,on_delete=models.CASCADE)


    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)


class Payment(models.Model):
    
    method = models.TextField(max_length=15)
    amount = models.FloatField()
    user = models.ForeignKey(CustomUser,on_delete=models.CASCADE)

    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)

class Booking(models.Model):

    user = models.ForeignKey(CustomUser,on_delete=models.CASCADE,null=True,blank=True)
    turf = models.ForeignKey(Turf,on_delete=models.CASCADE)
    Payment = models.ForeignKey(Payment,on_delete=models.CASCADE)

    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField( default=timezone.now)
    

class Notification(models.Model):

    CHOICES = [
        ('group','group'),
        ('payment','payment'),
        ('booking','booking'),
    ]
    user = models.ForeignKey(CustomUser,on_delete=models.CASCADE)
    head = models.TextField(max_length=100)
    body = models.TextField(max_length=200)
    notification_class = models.TextField(max_length=200,choices=CHOICES)
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField( auto_now_add=True)
    

