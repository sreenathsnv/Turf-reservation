from django.core.management.base import BaseCommand
from faker import Faker
from turfapp.models import CustomUser, PlayerAnalysis, Turf, TurfReview, GameRoom, GroupComments, Slot, Booking, Payment, Notification
import random
from django.utils import timezone
import uuid

class Command(BaseCommand):
    help = 'Generate 1000 dummy records for the database'

    def handle(self, *args, **kwargs):
        fake = Faker()
        for turf in Turf.objects.all():
            for _ in range(30):
                
                TurfReview.objects.create(
                turf=turf,
                rating=random.randint(0, 5),
                user=CustomUser.objects.order_by('?').first(),
                comments=fake.sentence(),
            )
            print("-done")
        
        self.stdout.write(self.style.SUCCESS('Successfully generated  dummy Reviews'))
