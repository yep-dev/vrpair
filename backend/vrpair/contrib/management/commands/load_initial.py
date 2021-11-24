import environ
from django.core.management.base import BaseCommand
from vrpair.pairs.models import User

env = environ.Env()


class Command(BaseCommand):
    def handle(self, *args, **options):
        superuser = User(
            is_staff=True,
            discord_id="admin",
            discord_username="admin",
            discord_discriminator="0000",
            is_superuser=True,
        )
        superuser.set_password(env.str("ADMIN_PASSWORD"))
        superuser.save()
        self.stdout.write(self.style.SUCCESS("Initial data loaded"))
