import factory
from dateutil.relativedelta import relativedelta
from django.utils import timezone
from factory.django import DjangoModelFactory
from factory.fuzzy import FuzzyDateTime

from vrpair.likes.models import LikedProfile, SkippedProfile, Pair
from vrpair.profiles.models import Profile


class LikedProfileFactory(DjangoModelFactory):
    author = factory.Iterator(Profile.objects.order_by("?"))
    # profile has to be passed
    date = FuzzyDateTime(timezone.now() - relativedelta(months=3))

    class Meta:
        model = LikedProfile


class SkippedProfileFactory(DjangoModelFactory):
    author = factory.Iterator(Profile.objects.order_by("?"))
    # profile has to be passed
    date = FuzzyDateTime(timezone.now() - relativedelta(months=3))

    class Meta:
        model = SkippedProfile


class PairFactory(DjangoModelFactory):
    # profile1 and profile2 have to be passed
    date = FuzzyDateTime(timezone.now() - relativedelta(months=3))

    class Meta:
        model = Pair
