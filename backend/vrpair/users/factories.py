from factory import Faker
from factory.django import DjangoModelFactory

from vrpair.users.models import User


class UserFactory(DjangoModelFactory):
    discord_id = Faker("numerify", text="#" * 18)
    discord_username = Faker("user_name")
    discord_discriminator = Faker("numerify", text="####")

    class Meta:
        model = User
