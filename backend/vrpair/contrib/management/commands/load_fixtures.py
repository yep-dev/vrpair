from django.core.management.base import BaseCommand

from vrpair.profiles.factories import UserWithProfileFactory, UserWithPreferencesFactory
from vrpair.users.factories import UserFactory


class Command(BaseCommand):
    def handle(self, *args, **options):
        UserFactory.create_batch(100)
        UserWithProfileFactory.create_batch(500)
        UserWithPreferencesFactory.create_batch(1500)

        self.stdout.write(self.style.SUCCESS("Full fixtures loaded"))
