from rest_framework import serializers

from vrpair.likes.models import LikedProfile, SkippedProfile, Pair
from vrpair.profiles.serializers import ProfileSerializer


class LikedProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = LikedProfile
        fields = ["id", "profile", "date"]

    profile = ProfileSerializer()


class LikeSerializer(LikedProfileSerializer):
    profile = ProfileSerializer(source="author")


class SkippedProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = SkippedProfile
        fields = ["id", "profile", "date"]

    profile = ProfileSerializer()


class PairSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pair
        fields = ["id", "profile", "date"]

    profile = ProfileSerializer()
