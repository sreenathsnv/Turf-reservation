# urls.py
from django.urls import path, include, re_path
from rest_framework.routers import DefaultRouter
# from analytics.views import PlayerAnalysisViewSet 
from .views import (DailyBookingsView, WeeeklyBookingsView,
                    MonthlyBookingView,RevenueView,
                    ExportBookingsCSVView,current_performance_metrics,
                    overall_performance_rating,player_skill_radar_chart,TotalBookingsTodayView,
                    forecast_occupancy, compare_players_in_room,player_performance_analysis)
from . import views

# router = DefaultRouter()

# router.register(r'player-analysis', PlayerAnalysisViewSet)

urlpatterns = [
    # path('', include(router.urls)),
    path('bookings/daily/', DailyBookingsView, name='daily-bookings'),
    path('bookings/weekly/',  WeeeklyBookingsView, name='weekly-bookings'),
    path('bookings/monthly/', MonthlyBookingView, name='monthly-bookings'),
    path('revenue/', RevenueView, name='revenue'),
    path('total-bookings/today/', TotalBookingsTodayView, name='total-bookings-today'),
    path('export/bookings/', ExportBookingsCSVView.as_view(), name='export-bookings-csv'),
    re_path(r'player/(?P<player_id>[a-fA-F0-9-]+)/current-performance-metrics/$', current_performance_metrics, name='current_performance_metrics'),
    re_path(r'player/(?P<player_id>[a-fA-F0-9-]+)/overall-performance-rating/$', overall_performance_rating, name='overall_performance_rating'),
    re_path(r'player/(?P<player_id>[a-fA-F0-9-]+)/skill-radar-chart/$', player_skill_radar_chart, name='player_skill_radar_chart'),
    re_path(r'^player-performance/(?P<player_id>[a-fA-F0-9-]+)/(?P<attribute>\w+)/$', views.player_performance_analysis),
    path('forecast/', forecast_occupancy, name='forecast_occupancy'),

    path('compare-players/<uuid:room_id>/', compare_players_in_room, name='compare_players_in_room'),

    path('analysis/player-performance/<int:player_id>/<str:attribute>/', views.player_performance_analysis),


]