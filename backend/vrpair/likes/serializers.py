from rest_framework import serializers

from vrpair.likes.models import RatedProfile, Pair
from vrpair.profiles.serializers import ProfileSerializer, ProfileDetailsSerializer
from vrpair.utils.serializers import FlattenMixin


class RatedProfileSerializer(FlattenMixin, serializers.ModelSerializer):
    class Meta:
        model = RatedProfile
        fields = ["id", "liked", "date"]
        flatten = [("profile", ProfileSerializer)]


class RatedProfileDetailsSerializer(RatedProfileSerializer):
    class Meta(RatedProfileSerializer.Meta):
        flatten = [("profile", ProfileDetailsSerializer)]


class PairSerializer(FlattenMixin, serializers.ModelSerializer):
    class Meta:
        model = Pair
        fields = ["id", "date"]
        flatten = [("profile", ProfileSerializer)]


class RateProfileSerializer(serializers.Serializer):
    profile_id = serializers.IntegerField()
    liked = serializers.BooleanField()
