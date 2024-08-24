# urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
# from analytics.views import PlayerAnalysisViewSet 
from .views import (DailyBookingsView, WeeeklyBookingsView,
                    MonthlyBookingView,RevenueView,
                    ExportBookingsCSVView,performance_metrics_over_time,
                    overall_performance_rating,player_skill_radar_chart)
router = DefaultRouter()
# router.register(r'player-analysis', PlayerAnalysisViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('bookings/daily/', DailyBookingsView, name='daily-bookings'),
    path('bookings/weekly/',  WeeeklyBookingsView, name='weekly-bookings'),
    path('bookings/monthly/', MonthlyBookingView, name='monthly-bookings'),
    path('revenue/', RevenueView, name='revenue'),
    path('export/bookings/', ExportBookingsCSVView, name='export-bookings-csv'),
    path('player/<int:player_id>/performance-metrics-over-time/', performance_metrics_over_time, name='performance_metrics_over_time'),
    path('player/<int:player_id>/overall-performance-rating/', overall_performance_rating, name='overall_performance_rating'),
    path('player/<int:player_id>/skill-radar-chart/', player_skill_radar_chart, name='player_skill_radar_chart'),
]

