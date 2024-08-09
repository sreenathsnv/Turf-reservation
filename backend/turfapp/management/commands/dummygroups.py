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

        self.stdout.write(self.style.SUCCESS('Successfully generated 1000 dummy groups and comments'))
