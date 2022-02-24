from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import extend_schema_field
from rest_framework import serializers

from vrpair.likes.models import RatedProfile, Pair
from vrpair.profiles.serializers import ProfileSerializer


class RatedProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = RatedProfile
        fields = ["liked", "likes", "date", "profile"]

    liked = serializers.SerializerMethodField()
    likes = serializers.SerializerMethodField()
    profile = ProfileSerializer()

    @extend_schema_field(OpenApiTypes.BOOL)
    def get_liked(self, obj):
        request = self.context.get("request")
        return request and request.user.profile == obj.author

    @extend_schema_field(OpenApiTypes.BOOL)
    def get_likes(self, obj):
        request = self.context.get("request")
        return request and request.user.profile == obj.profile


class PairSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pair
        fields = ["id", "date", "profile"]

    profile = ProfileSerializer()


class RateProfileSerializer(serializers.Serializer):
    profile_id = serializers.IntegerField()
    liked = serializers.BooleanField()
