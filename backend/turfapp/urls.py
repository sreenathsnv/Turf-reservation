
from django.urls import path,include

from .views import (test,
                    get_rooms_all,
                    get_turfs_all,
                    join_group,
                    create_room,
                    comments
                )
urlpatterns = [

    path('',test),
    path ('get-all-rooms/',get_rooms_all,name='getrooms'),
    path ('get-all-turfs/',get_turfs_all,name='get-turfs'),

    path ('groups/<int:pk>/join/',join_group,name='join-groups'),
    path ('groups/create/',create_room,name='create-group'),
    path ('groups/<int:pk>/comments/',comments,name='create-group'),
        
]