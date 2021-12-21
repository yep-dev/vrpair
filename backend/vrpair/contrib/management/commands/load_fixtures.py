import random
from django.core.management.base import BaseCommand

from vrpair.likes.factories import (
    LikedProfileFactory,
    SkippedProfileFactory,
    PairFactory,
)
from vrpair.likes.models import LikedProfile
from vrpair.profiles.factories import ProfileFactory
from vrpair.profiles.models import Profile
from vrpair.users.factories import UserFactory


class Command(BaseCommand):
    def handle(self, *args, **options):
        UserFactory.create_batch(100)
        ProfileFactory.create_batch(1000)

        for profile in Profile.objects.order_by("?")[:500]:
            for author in Profile.objects.exclude(id=profile.id).order_by("?")[
                : random.randint(0, 10) ** 2
            ]:
                LikedProfileFactory.create(author=author, profile=profile)

        for profile in Profile.objects.order_by("?")[:500]:
            for author in Profile.objects.exclude(id=profile.id).order_by("?")[
                : random.randint(0, 20) ** 2
            ]:
                SkippedProfileFactory.create(author=author, profile=profile)

        for liked_profile in LikedProfile.objects.order_by("?")[:1000]:
            PairFactory(profile1=liked_profile.author, profile2=liked_profile.profile)

        self.stdout.write(self.style.SUCCESS("Full fixtures loaded"))
