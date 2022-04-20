import factory
from django.core.files.storage import default_storage
from factory import Faker, fuzzy, random as _random
from factory.faker import faker
from factory.django import DjangoModelFactory

from vrpair.profiles.models import Preferences, Profile, ProfileImage
from vrpair.users.factories import UserFactory
from vrpair.utils.enums import GenderEnum, RoleEnum, WeekDayEnum, SetupEnum, BoolEnum
from vrpair.utils.factory import MultipleFuzzyChoice


random = _random.randgen
fake = faker.Faker()


class PreferencesFactory(DjangoModelFactory):
    # 3
    gender = MultipleFuzzyChoice(GenderEnum)
    fem_avatar = fuzzy.FuzzyChoice(BoolEnum)
    age_min = fuzzy.FuzzyInteger(18, 34)
    age_max = factory.LazyAttribute(lambda o: random.randint(o.age_min + 1, 35))

    # 4
    setup = MultipleFuzzyChoice(SetupEnum)
    role = MultipleFuzzyChoice(RoleEnum)
    mute = fuzzy.FuzzyChoice(BoolEnum)
    furry = fuzzy.FuzzyChoice(BoolEnum)

    class Meta:
        model = Preferences


class ProfileFactory(DjangoModelFactory):
    # 1
    username = Faker("user_name")
    birth_date = Faker("date_of_birth", minimum_age=18, maximum_age=40)
    gender = fuzzy.FuzzyChoice(GenderEnum)
    fem_avatar = factory.LazyFunction(lambda: random.random() > 0.3)

    # 2
    setup = fuzzy.FuzzyChoice(SetupEnum)
    role = fuzzy.FuzzyChoice(RoleEnum)
    mute = factory.LazyFunction(lambda: random.random() < 0.2)
    furry = factory.LazyFunction(lambda: random.random() < 0.1)

    # other
    start_hour = fuzzy.FuzzyInteger(23)
    end_hour = factory.LazyAttribute(lambda o: o.start_hour + random.randint(4, 8))
    week_days = MultipleFuzzyChoice(WeekDayEnum)
    description = factory.LazyFunction(
        lambda: fake.text(random.randint(5, 512)) if random.random() > 0.3 else None
    )
    # verified todo
    preferences = factory.SubFactory(PreferencesFactory)
    user = factory.RelatedFactory(UserFactory, factory_related_name="profile")

    class Meta:
        model = Profile

    @factory.post_generation
    def images(self, create, _):
        number = random.randint(0, 40)
        if create and random.random() > 0.2:
            for index in range(3):
                path = f"mock_images/{number}.{index}.png"
                if default_storage.exists(path):
                    ProfileImage.objects.create(profile=self, image=path)
        return
