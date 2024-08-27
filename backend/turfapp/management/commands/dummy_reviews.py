from django.core.management.base import BaseCommand
from faker import Faker
from turfapp.models import CustomUser, Turf,TurfReview
import random
from django.utils import timezone
import uuid

class Command(BaseCommand):
    help = 'Generate 1000 dummy records for the database'

    def handle(self, *args, **kwargs):
        fake = Faker()

        # Generate Turfs with assigned Turf Managers
        nums = len(Turf.objects.all())
        for _ in range(nums):
            turf = Turf.objects.order_by('?').first()
            for _ in range(7):
                user = CustomUser.objects.order_by('?').first()
                TurfReview.objects.create(
                    turf=turf,
                    comments=fake.text(),
                    rating=fake.random_int(min=0,max=5),
                    user = user
                )
                print("-done")
        print("created reviews")
        self.stdout.write(self.style.SUCCESS('Successfully generated reviews'))
