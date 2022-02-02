import factory
from factory.faker import faker
from factory import random as _random
from dateutil.relativedelta import relativedelta
from django.utils import timezone
from factory.django import DjangoModelFactory
from factory.fuzzy import FuzzyDateTime

from vrpair.likes.models import Pair, RatedProfile
from vrpair.profiles.models import Profile

random = _random.randgen
fake = faker.Faker()


class RatedProfileFactory(DjangoModelFactory):
    author = factory.Iterator(Profile.objects.order_by("?"))
    # profile has to be passed
    liked = factory.LazyFunction(lambda: random.random() < 0.3)
    date = FuzzyDateTime(timezone.now() - relativedelta(months=3))

    class Meta:
        model = RatedProfile


class PairFactory(DjangoModelFactory):
    # profile1 and profile2 have to be passed
    date = FuzzyDateTime(timezone.now() - relativedelta(months=3))

    class Meta:
        model = Pair
