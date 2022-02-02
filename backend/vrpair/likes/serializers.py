from rest_framework import serializers

from vrpair.likes.models import RatedProfile, Pair
from vrpair.profiles.serializers import ProfileSerializer
from vrpair.utils.serializers import FlattenMixin


class RatedProfileSerializer(FlattenMixin, serializers.ModelSerializer):
    class Meta:
        model = RatedProfile
        fields = ["id", "liked", "date"]
        flatten = [("profile", ProfileSerializer)]


class PairSerializer(FlattenMixin, serializers.ModelSerializer):
    class Meta:
        model = Pair
        fields = ["id", "date"]
        flatten = [("profile", ProfileSerializer)]
