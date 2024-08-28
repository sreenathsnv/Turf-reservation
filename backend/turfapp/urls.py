
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
                    update_user_profile,
                    create_turf,
                    update_turf,
                    delete_turf,
                    view_turfs,
                    view_a_turf,
                    logout,
                    add_slots,
                    delete_slot,
                    book_turf,
                    cancel_booking,
                    post_player_review,
                    post_turf_review,
                    create_payment

                )

urlpatterns = [

    path('',test),
    path('auth/user/logout',logout,name='logout'),

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
    path(r'user/profile/',get_user_profile,name='view-profile'),
    path(r'user/profile/edit',update_user_profile,name='edit-profile'),
    
    
    path('turf/create/',create_turf,name='create-turf'),
    re_path(r'turf/(?P<pk>[a-fA-F0-9-]+)/update/',update_turf,name='update-turf'),
    re_path(r'turf/(?P<pk>[a-fA-F0-9-]+)/delete/',delete_turf,name='delete-turf'),
    re_path(r'turf/(?P<pk>[a-fA-F0-9-]+)/view/',view_a_turf,name='view-turf'),
    re_path(r'turfs/',view_turfs,name='view-turfs-owner'),

    path('turf/add/slot/',add_slots,name='add-turfs-slot'),
    re_path(r'turf/slot/(?P<pk>[a-fA-F0-9-]+)/delete/',delete_slot,name='delete-slot'),

    path('turf/book/',book_turf,name='book-turf'),
    path('turf/cancel/book/',cancel_booking,name='book-cancel'),
    path('turf/book/payment',create_payment,name='book-payment'),


    path('player/review/',post_player_review,name='review-player'),
    path('turf/review/',post_turf_review,name='review-turf'),


    
    
    
    

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)