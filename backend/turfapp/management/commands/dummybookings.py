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

    # Generate Bookings
        for _ in range(1000):
            Booking.objects.create(
                user=CustomUser.objects.order_by('?').first(),
                turf=Turf.objects.order_by('?').first(),
                status="Confirmed",
                total_amount=random.uniform(10.0, 100.0),
                date=fake.date_this_year(before_today=True),
                time_slot=Slot.objects.order_by('?').first()
            )
            print("-done")
        
        self.stdout.write(self.style.SUCCESS('Successfully generated  dummy bookings'))
