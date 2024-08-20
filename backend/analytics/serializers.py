from rest_framework import serializers
from turfapp.models import (PlayerAnalysis, Booking)

from rest_framework.serializers import ModelSerializer


class PlayerAnalysisSerializer(ModelSerializer):
    class Meta:
        model = PlayerAnalysis
        fields = '__all__'

class DailyBookingSerializer(ModelSerializer):
    date = serializers.DateField()
    count = serializers.IntegerField()

class WeeklyBookingSerializer(ModelSerializer):
    date = serializers.DateField()
    count = serializers.IntegerField()

class MonthlyBookingSerializer(ModelSerializer):
    date = serializers.DateField()
    count = serializers.IntegerField()

class RevenueSerializer(ModelSerializer):
    date = serializers.DateField()
    revenue = serializers.DecimalField(max_digits=10, decimal_places=2)

class PerformanceMetricsOverTimeSerializer(serializers.Serializer):
    dates = serializers.ListField(child=serializers.DateField())
    avg_dribble = serializers.ListField(child=serializers.FloatField())
    avg_shoot = serializers.ListField(child=serializers.FloatField())
    avg_pass_acuracy = serializers.ListField(child=serializers.FloatField())
    avg_defence = serializers.ListField(child=serializers.FloatField())


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
    



