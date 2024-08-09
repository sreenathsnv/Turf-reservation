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

        # Sets to store unique email and username
        unique_emails = set()
        unique_usernames = set()

        # Generate 200 Turf Managers and 800 Regular Users
        for i in range(1000):
            is_turf_manager = i < 200  # First 200 users are turf managers

            # Generate unique email
            email = fake.email()
            while email in unique_emails:
                email = fake.email()
            unique_emails.add(email)

            # Generate unique username
            username = fake.user_name()
            while username in unique_usernames:
                username = fake.user_name()
            unique_usernames.add(username)

            # Clean phone number
            phone_number = fake.phone_number()
            numeric_phone = ''.join(filter(str.isdigit, phone_number))  # Remove non-numeric characters

            # Create user
            user = CustomUser(
                email=email,
                name=fake.name(),
                username=username,
                phone=int(numeric_phone) if numeric_phone else None,
                location=fake.city(),
                is_owner=is_turf_manager,
                is_admin=is_turf_manager,
                is_active=True,
                is_staff=is_turf_manager,
                is_superuser=is_turf_manager,
            )
            user.set_password('password')  # Set a dummy password
            user.save()
            print("done")
            self.stdout.write(self.style.SUCCESS('Successfully generated 1000 dummy users'))
