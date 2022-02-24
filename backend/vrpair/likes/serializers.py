from rest_framework import serializers

from vrpair.likes.models import RatedProfile, Pair
from vrpair.profiles.serializers import ProfileSerializer
from vrpair.utils.serializers import FlattenMixin


class RatedProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = RatedProfile
        fields = ["liked", "likes", "date", "profile"]

    liked = serializers.SerializerMethodField()
    likes = serializers.SerializerMethodField()

    def get_liked(self, obj):
        request = self.context.get("request")
        return request and request.user.profile == obj.author

    def get_likes(self, obj):
        request = self.context.get("request")
        return request and request.user.profile == obj.profile


class PairSerializer(FlattenMixin, serializers.ModelSerializer):
    class Meta:
        model = Pair
        fields = ["id", "date"]
        flatten = [("profile", ProfileSerializer)]


class RateProfileSerializer(serializers.Serializer):
    profile_id = serializers.IntegerField()
    liked = serializers.BooleanField()
