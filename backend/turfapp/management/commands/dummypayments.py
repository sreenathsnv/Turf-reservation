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
        # Generate Payments
        for booking in Booking.objects.all():
            Payment.objects.create(
                user=booking.user,
                booking=booking,
                amount=booking.total_amount,
                payment_method=random.choice(['Credit Card', 'Debit Card', 'PayPal', 'Bank Transfer']),
                payment_status=random.choice(['Pending', 'Completed', 'Failed']),
                transaction_id=str(uuid.uuid4())
            )
            print("-done")
        print("created payments")
        
        self.stdout.write(self.style.SUCCESS('Successfully generated 1000 dummy payments'))
