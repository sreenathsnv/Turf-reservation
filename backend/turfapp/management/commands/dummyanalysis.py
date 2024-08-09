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
        for user in CustomUser.objects.all():
            for _ in range(300):
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
        print("created player-analysis")
        self.stdout.write(self.style.SUCCESS('Successfully generated  dummy playeranalysis'))
