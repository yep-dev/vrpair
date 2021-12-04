from django.core.management.base import BaseCommand

from vrpair.profiles.factories import ProfileFactory
from vrpair.users.factories import UserFactory


class Command(BaseCommand):
    def handle(self, *args, **options):
        UserFactory.create_batch(100)
        ProfileFactory.create_batch(200, preferences=None)
        ProfileFactory.create_batch(1000)

        self.stdout.write(self.style.SUCCESS("Full fixtures loaded"))
