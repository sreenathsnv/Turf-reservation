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
        # Generate PlayerAnalysis for all users
        for user in CustomUser.objects.all():
            PlayerAnalysis.objects.create(
                player=user,
                pref_position=fake.word(),
                games_played=random.randint(0, 100),
                dribble=random.randint(0, 100),
                shoot=random.randint(0, 100),
                pass_acuracy=random.randint(0, 100),
                defence=random.randint(0, 100),
            )
            print("-done")
        print("created users")
        # Generate Turfs with assigned Turf Managers
        for _ in range(100):
            Turf.objects.create(
                turf_name=fake.company(),
                description=fake.text(),
                city=fake.city(),
                state=fake.state(),
                zipcode=fake.zipcode(),
                open_time=fake.time_object(),
                close_time=fake.time_object(),
                turf_manager=CustomUser.objects.filter(is_owner=True).order_by('?').first()
            )
            print("-done")
        print("created turfs")
        # Generate TurfReviews
        for turf in Turf.objects.all():
            TurfReview.objects.create(
                turf=turf,
                rating=random.randint(0, 5),
                user=CustomUser.objects.order_by('?').first(),
                comments=fake.sentence(),
            )
            print("-done")
        print("created reviews")
        # Generate GameRooms
        for _ in range(100):
            GameRoom.objects.create(
                group_admin=CustomUser.objects.order_by('?').first(),
                group_name=fake.word(),
                req_players=random.randint(1, 11),
                time_slot=fake.date_time_this_year(),
                turf=Turf.objects.order_by('?').first()
            )
            print("-done")
        print("created gamerooms")
        # Generate GroupComments
        for game_room in GameRoom.objects.all():
            GroupComments.objects.create(
                user=CustomUser.objects.order_by('?').first(),
                body=fake.text(),
                group=game_room
            )
            print("-done")
        print("created comments")
        # Generate Slots
        for turf in Turf.objects.all():
            Slot.objects.create(
                turf=turf,
                start_time=fake.time_object(),
                end_time=fake.time_object()
            )
            print("-done")
        print("created slots")
        # Generate Bookings
        for _ in range(1000):
            Booking.objects.create(
                user=CustomUser.objects.order_by('?').first(),
                turf=Turf.objects.order_by('?').first(),
                status=random.choice(['Pending', 'Confirmed', 'Cancelled']),
                total_amount=random.uniform(10.0, 100.0),
                date=fake.date_this_year(),
                time_slot=Slot.objects.order_by('?').first()
            )
            print("-done")
        print("created bookings")

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
        # Generate Notifications
        for _ in range(500):
            Notification.objects.create(
                user=CustomUser.objects.order_by('?').first(),
                head=fake.sentence(),
                body=fake.text(),
                notification_class=random.choice(['group', 'payment', 'booking', 'Refunded']),
                is_read=fake.boolean()
            )
            print("-done")
        print("created notifications")
        self.stdout.write(self.style.SUCCESS('Successfully generated 1000 dummy records'))
