from rest_framework import serializers

from vrpair.likes.models import LikedProfile, SkippedProfile, Pair
from vrpair.profiles.serializers import ProfileSerializer


class LikedProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = LikedProfile
        fields = ["profile", "date"]

    profile = ProfileSerializer()


class SkippedProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = SkippedProfile
        fields = ["profile", "date"]

    profile = ProfileSerializer()


class PairSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pair
        fields = ["profile", "date"]

    profile = ProfileSerializer()
