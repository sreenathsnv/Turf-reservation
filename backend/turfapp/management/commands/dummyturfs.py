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

        # Generate Turfs with assigned Turf Managers
        for _ in range(200):
            Turf.objects.create(
                turf_name=fake.company(),
                description=fake.text(),
                city=fake.city(),
                state=fake.state(),
                zipcode=fake.zipcode(),
                price = fake.pyfloat(left_digits=4, right_digits=2, positive=True, min_value=800, max_value=2000),
                open_time=fake.time_object(),
                close_time=fake.time_object(),
                turf_manager=CustomUser.objects.filter(is_owner=True).order_by('?').first()
            )
            print("-done")
        print("created turfs")
        self.stdout.write(self.style.SUCCESS('Successfully generated 1000 dummy turfs'))
