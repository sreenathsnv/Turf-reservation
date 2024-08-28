from datetime import datetime, timedelta
from django.core.management.base import BaseCommand
from faker import Faker
from turfapp.models import CustomUser, PlayerAnalysis, Turf, TurfReview, GameRoom, GroupComments, Slot, Booking, Payment, Notification
import random
from django.db import transaction
from django.utils import timezone
import uuid
class Command(BaseCommand):
    help = 'Generate 1000 dummy records for the database'

    def handle(self, *args, **kwargs):
        fake = Faker()

        # Generate GameRooms
        with transaction.atomic():
            for _ in range(100):
                turf = Turf.objects.order_by('?').first()
                slot = Slot.objects.order_by('?').first()
                group_admin = CustomUser.objects.order_by('?').first()

                # Ensure at least 5 users in the group, including group_admin
                group_users = list(CustomUser.objects.exclude(id=group_admin.id).order_by('?')[:4])  # Select 4 random users excluding the admin
                group_users.append(group_admin)  # Add the group_admin to the list
                date = fake.date_between(start_date='-1y', end_date='today')
                game_room = GameRoom.objects.create(
                    group_admin=group_admin,
                    group_name=fake.word(),
                    req_players=random.randint(1, 11),
                    turf=turf,
                    time_slot=slot,
                    date = date
                )

                # Add users to the GameRoom (assuming a ManyToMany relationship)
                game_room.players.add(*group_users)
                print("-done")
            print("created gamerooms")

            # Generate GroupComments
            for game_room in GameRoom.objects.all():
                # Create a comment for each user in the game_room
                for user in game_room.players.all():
                    GroupComments.objects.create(
                        user=user,
                        body=fake.text(),
                        group=game_room
                    )
                print("-done")
            print("created comments")

        self.stdout.write(self.style.SUCCESS('Successfully generated 1000 dummy groups and comments'))
