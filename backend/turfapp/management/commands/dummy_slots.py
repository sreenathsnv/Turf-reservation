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

        # Generate Slots
        for turf in Turf.objects.all():
            Slot.objects.create(
                turf=turf,
                start_time=fake.time_object(),
                end_time=fake.time_object()
            )
            Slot.objects.create(
                turf=turf,
                start_time=fake.time_object(),
                end_time=fake.time_object()
            )
            Slot.objects.create(
                turf=turf,
                start_time=fake.time_object(),
                end_time=fake.time_object()
            )
            print("-done")
        print("created slots")
        # Generate Bookings
        self.stdout.write(self.style.SUCCESS('Successfully generated dummy slots'))
