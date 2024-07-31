
from django.urls import path,re_path
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
                    get_user_profile,
                )

urlpatterns = [

    path('',test),
    path('get-all-rooms/',get_rooms_all,name='getrooms'),
    path('get-all-turfs/',get_turfs_all,name='get-turfs'),
    
    path('groups/',get_user_groups,name='user-groups'),
    re_path(r'groups/(?P<pk>[a-fA-F0-9-]+)/$',get_group_details,name='group'),
    re_path(r'^groups/(?P<pk>[a-fA-F0-9-]+)/join/$',join_group,name='join-groups'),
    path('groups/create/',create_room,name='create-group'),
    re_path(r'^groups/(?P<pk>[a-fA-F0-9-]+)/comments/',comments,name='group-comments'),
    re_path(r'groups/comment/(?P<pk>[a-fA-F0-9-]+)/delete/',delete_comment,name='delete-comment'),
    re_path(r'groups/(?P<pk>[a-fA-F0-9-]+)/user/delete/',remove_user,name='delete-user'),
    re_path(r'groups/(?P<pk>[a-fA-F0-9-]+)/leave/',leave_group,name='leave-group'),
    
    re_path(r'user/(?P<pk>[a-fA-F0-9-]+)/profile/',get_user_profile,name='user-profile'),
    re_path(r'user/profile/',get_user_profile,name='view-profile'),
    
    
    

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)