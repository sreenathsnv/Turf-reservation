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
            turf = Turf.objects.order_by('?').first()
            slot = Slot.objects.order_by('?').first()
            GameRoom.objects.create(
                group_admin=CustomUser.objects.order_by('?').first(),
                group_name=fake.word(),
                req_players=random.randint(1, 11),
                turf=turf,
                time_slot=slot,
            )
            print("-done")
        print("created gamerooms")
        # Generate GroupComments
        for game_room in GameRoom.objects.all():
            user = game_room.players.order_by('?').first()
            GroupComments.objects.create(
                user= user,
                body=fake.text(),
                group=game_room
            )
            print("-done")
        print("created comments")

        self.stdout.write(self.style.SUCCESS('Successfully generated 1000 dummy groups and comments'))
