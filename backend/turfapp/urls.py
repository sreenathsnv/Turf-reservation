
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
                    get_group_details,
                    remove_user,
                    leave_group,
                    get_user_groups,
                )

urlpatterns = [

    path('',test),
    path('get-all-rooms/',get_rooms_all,name='getrooms'),
    path('get-all-turfs/',get_turfs_all,name='get-turfs'),
    
    path('groups/',get_user_groups,name='user-groups'),
    path('groups/<int:pk>/',get_group_details,name='group'),
    path('groups/<int:pk>/join/',join_group,name='join-groups'),
    path('groups/create/',create_room,name='create-group'),
    path('groups/<int:pk>/comments/',comments,name='group-comments'),
    path('groups/comment/<int:pk>/delete/',delete_comment,name='delete-comment'),
    path('groups/<int:pk>/user/delete/',remove_user,name='delete-user'),
    path('groups/<int:pk>/leave/',leave_group,name='leave-group'),
    
    
    

    
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)