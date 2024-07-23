
from django.urls import path,include
from django.conf import settings
from django.conf.urls.static import static

from .views import (test,
                    get_rooms_all,
                    get_turfs_all,
                    join_group,
                    create_room,
                    comments,
                    delete_comment,
                )
urlpatterns = [

    path('',test),
    path('get-all-rooms/',get_rooms_all,name='getrooms'),
    path('get-all-turfs/',get_turfs_all,name='get-turfs'),

    path('groups/<int:pk>/join/',join_group,name='join-groups'),
    path('groups/create/',create_room,name='create-group'),
    path('groups/<int:pk>/comments/',comments,name='group-comments'),
    path('groups/comment/<int:pk>/delete/',delete_comment,name='delete-comment'),

        
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)