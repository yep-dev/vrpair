import random
from django.core.management.base import BaseCommand

from vrpair.likes.factories import (
    RatedProfileFactory,
    PairFactory,
)
from vrpair.likes.models import RatedProfile
from vrpair.profiles.factories import ProfileFactory
from vrpair.profiles.models import Profile
from vrpair.users.factories import UserFactory


class Command(BaseCommand):
    def handle(self, *args, **options):
        UserFactory.create_batch(100)
        ProfileFactory.create_batch(1000)

        for profile in Profile.objects.order_by("?")[:500]:
            for author in Profile.objects.exclude(id=profile.id).order_by("?")[
                : random.randint(0, 20) ** 2
            ]:
                RatedProfileFactory.create(author=author, profile=profile)

        for liked_profile in RatedProfile.objects.filter(liked=True).order_by("?")[
            :1000
        ]:
            PairFactory(profile1=liked_profile.author, profile2=liked_profile.profile)
            liked_profile.delete()

        self.stdout.write(self.style.SUCCESS("Full fixtures loaded"))
