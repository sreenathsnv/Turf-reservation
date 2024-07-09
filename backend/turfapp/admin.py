from django.contrib import admin
from .models import CustomUser,PlayerAnalysis,Turf,GameRoom,GroupComments,Booking,Payment
# Register your models here.
admin.site.register(CustomUser)
admin.site.register(PlayerAnalysis)
admin.site.register(Turf)
admin.site.register(GameRoom)
admin.site.register(GroupComments)
admin.site.register(Booking)
admin.site.register(Payment)

