
from django.urls import path,include

from .views import test,get_rooms_all,get_turfs_all
urlpatterns = [

    path('',test),
    path ('get-all-rooms/',get_rooms_all,name='getrooms'),
    path ('get-all-turfs/',get_turfs_all,name='get-turfs'),
    
]