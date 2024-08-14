from django.db import models
from django.contrib.auth.models import AbstractBaseUser,PermissionsMixin
from django.core.validators import MaxValueValidator,MinValueValidator
from django.utils import timezone
from .manager import CustomUserManager
import uuid 
# Create your models here.




class CustomUser(AbstractBaseUser,PermissionsMixin):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    email = models.EmailField(unique=True)
    name  = models.TextField(max_length=100)
    username = models.TextField(max_length=27,unique=True)
    phone = models.BigIntegerField(blank=True,null=True)
    profile_pic = models.ImageField(upload_to='profile_pics/',default='/dummy/empty.png')
    location = models.TextField(blank=True,null=True,default="Kerala",max_length=60)

    is_owner = models.BooleanField(default=False)


    is_admin = models.BooleanField(default=False) 
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username','name','is_owner','phone']



    objects = CustomUserManager()


    
    def __str__(self) -> str:
        return self.username

class PlayerAnalysis(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    player = models.ForeignKey(CustomUser,on_delete=models.CASCADE)
    pref_position = models.TextField(blank=True,null=True,max_length=30,default=None)


    games_played = models.IntegerField(blank=True,null=True)
    dribble = models.IntegerField(blank=True,null=True)
    shoot = models.IntegerField(blank=True,null=True)
    pass_acuracy = models.IntegerField(blank=True,null=True)
    defence = models.IntegerField(blank=True,null=True)

    
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.player.name

class Turf(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    turf_name = models.TextField(max_length=75)
    description = models.TextField(max_length=300)
    city = models.TextField(max_length=30)
    state = models.TextField(max_length=30)
    zipcode = models.TextField(max_length=20)

    open_time = models.TimeField(blank=True,null=True)
    close_time = models.TimeField(blank=True,null=True)
    
    turf_manager = models.ForeignKey(CustomUser,on_delete=models.CASCADE,default=None)
    
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.turf_name
    
    @property
    def is_open(self):
        if self.open_time and self.close_time:
            now = timezone.now()
            if self.open_time <= now <= self.close_time:
                return True
            return False
        return False

class TurfReview(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False) 
    turf = models.ForeignKey(Turf,on_delete=models.CASCADE)
    rating = models.IntegerField(validators=[MinValueValidator(0),MaxValueValidator(5)])
    user = models.ForeignKey(CustomUser,on_delete=models.CASCADE)
    comments = models.TextField(max_length=250)

    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self) -> str:
        return f"{self.user.name} : {self.comments[:20]}"



class GameRoom(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    group_admin = models.ForeignKey(CustomUser,related_name='group_admin',on_delete=models.CASCADE,default=None)

    group_name = models.TextField(max_length=24)
    req_players = models.IntegerField()
    time_slot = models.DateTimeField(default=timezone.now)

    players = models.ManyToManyField(CustomUser,blank=True,default=None)

    turf = models.ForeignKey(Turf,on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.group_name



class GroupComments(models.Model):
    
    user = models.ForeignKey(CustomUser,on_delete=models.CASCADE)
    body = models.TextField(max_length=250)
    group = models.ForeignKey(GameRoom,on_delete=models.CASCADE)


    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.body[:20]


class Slot(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    turf = models.ForeignKey(Turf,default=None,on_delete=models.CASCADE)
    start_time = models.TimeField()
    end_time = models.TimeField()
    
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f"{self.turf} : {self.created_at}"

def get_current_date():
    return timezone.now().date()
class Booking(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True, blank=True)
    turf = models.ForeignKey(Turf, on_delete=models.CASCADE,null=True,blank=True)
    status = models.CharField(max_length=50, default='Pending', choices=[
        ('Pending', 'Pending'), 
        ('Confirmed', 'Confirmed'), 
        ('Cancelled', 'Cancelled')
    ])
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    date = models.DateField(default=get_current_date,null=True,blank=True)
    time_slot = models.ForeignKey(Slot,on_delete=models.CASCADE,default=None)

    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        unique_together = ('turf', 'time_slot', 'date')

    def __str__(self) -> str:
        return f"{self.user.name} : {self.turf.turf_name}"

class Payment(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    booking = models.ForeignKey(Booking, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=3, default='usd')
    payment_method = models.CharField(max_length=50, default='Credit Card', choices=[
        ('Credit Card', 'Credit Card'), 
        ('Debit Card', 'Debit Card'), 
        ('PayPal', 'PayPal'), 
        ('Bank Transfer', 'Bank Transfer')
    ])
    payment_status = models.CharField(max_length=50, default='Pending', choices=[
        ('Pending', 'Pending'), 
        ('Completed', 'Completed'), 
        ('Failed', 'Failed'),
        ('Refund', 'Refund'),

    ])
    transaction_id = models.CharField(max_length=100, unique=True, default=uuid.uuid4, editable=False)
    payment_date = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f"{self.user} : {self.amount}"

class Notification(models.Model):
    NOTIFICATION_CHOICES = [
        ('group', 'group'),
        ('payment', 'payment'),
        ('booking', 'booking'),
        ('Refunded','Refunded')
    ]
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    head = models.CharField(max_length=100)
    body = models.CharField(max_length=200)
    notification_class = models.CharField(max_length=20, choices=NOTIFICATION_CHOICES)
    is_read = models.BooleanField(default=False)

    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.head


    
