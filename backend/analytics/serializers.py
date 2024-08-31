from rest_framework import serializers
from turfapp.models import (PlayerAnalysis, Booking)

from rest_framework.serializers import ModelSerializer


class PlayerAnalysisSerializer(ModelSerializer):
    class Meta:
        model = PlayerAnalysis
        fields = '_all_'

class DailyBookingSerializer(serializers.Serializer):
        date = serializers.DateField()
        count = serializers.IntegerField()

class WeeklyBookingSerializer(serializers.Serializer):
    date = serializers.DateField()
    count = serializers.IntegerField()

class MonthlyBookingSerializer(serializers.Serializer):
    date = serializers.DateField()
    count = serializers.IntegerField()

class RevenueSerializer(serializers.Serializer):
    date = serializers.DateField()
    revenue = serializers.DecimalField(max_digits=10, decimal_places=2)

class CurrentPerformanceMetricsSerializer(serializers.Serializer):
    avg_dribble = serializers.FloatField()
    avg_shoot = serializers.FloatField()
    avg_pass_acuracy = serializers.FloatField()
    avg_defence = serializers.FloatField()



class OverallPerformanceRatingSerializer(serializers.ModelSerializer):
    overall_rating = serializers.SerializerMethodField()

    class Meta:
        model = PlayerAnalysis
        fields = ['player', 'dribble', 'shoot', 'pass_acuracy', 'defence', 'overall_rating']

    def get_overall_rating(self, obj):
        return (obj.dribble + obj.shoot + obj.pass_acuracy + obj.defence) / 4
    
class SkillRadarChartSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlayerAnalysis
        fields = ['player', 'dribble', 'shoot', 'pass_acuracy', 'defence']