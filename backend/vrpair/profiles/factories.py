import factory
from factory import Faker, fuzzy, random as _random
from factory.faker import faker
from factory.django import DjangoModelFactory

from vrpair.profiles.models import Profile, Preferences
from vrpair.users.factories import UserFactory
from vrpair.utils.enums import GenderEnum, RoleEnum, WeekDayEnum, SetupEnum, BoolEnum
from vrpair.utils.factory import MultipleFuzzyChoice


random = _random.randgen
fake = faker.Faker()


class ProfileFactory(DjangoModelFactory):
    # Step 1
    birth_date = Faker("date_of_birth", minimum_age=18, maximum_age=40)
    gender = fuzzy.FuzzyChoice(GenderEnum)
    # other_gender todo

    # Step 2
    attracted_gender = MultipleFuzzyChoice(GenderEnum)
    role = fuzzy.FuzzyChoice(RoleEnum)

    # Step 3
    setup = fuzzy.FuzzyChoice(SetupEnum)
    feminine_avatar = factory.LazyFunction(lambda: random.random() > 0.3)
    furry = factory.LazyFunction(lambda: random.random() < 0.1)

    # Step 4
    username = Faker("user_name")
    description = factory.LazyFunction(
        lambda: fake.text(random.randint(5, 512)) if random.random() > 0.5 else None
    )

    # Step 4
    start_hour = fuzzy.FuzzyInteger(23)
    end_hour = factory.LazyAttribute(lambda o: o.start_hour + random.randint(4, 8))
    week_days = MultipleFuzzyChoice(WeekDayEnum)

    class Meta:
        model = Profile


class UserWithProfileFactory(UserFactory):
    profile = factory.SubFactory(ProfileFactory)


class PreferencesFactory(DjangoModelFactory):
    gender = MultipleFuzzyChoice(GenderEnum)
    role = MultipleFuzzyChoice(RoleEnum)
    setup = MultipleFuzzyChoice(SetupEnum)
    feminine_avatar = fuzzy.FuzzyChoice(BoolEnum)
    furry = fuzzy.FuzzyChoice(BoolEnum)
    age_min = fuzzy.FuzzyInteger(18, 40)
    age_max = factory.LazyAttribute(lambda o: o.age_min + random.randrange(20))

    class Meta:
        model = Preferences


class UserWithPreferencesFactory(UserWithProfileFactory):
    preferences = factory.SubFactory(PreferencesFactory)
