import datetime

from drf_writable_nested import WritableNestedModelSerializer
from rest_framework import serializers

from vrpair.likes.models import RatedProfile
from vrpair.profiles.models import Profile, Preferences
from vrpair.utils.enums import (
    RoleEnum,
    SetupEnum,
    GenderEnum,
)
from vrpair.utils.models import get_or_none

from vrpair.utils.serializers import MultipleChoiceField


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = [
            "id",
            # 1
            "username",
            "age",
            "gender",
            "fem_avatar",
            # 2
            "setup",
            "role",
            "mute",
            "furry",
            # other
            "verified",
            # custom
            "likes",
        ]

    likes = serializers.ReadOnlyField()


class ProfileDetailsSerializer(ProfileSerializer):
    class Meta:
        model = Profile
        depth = 1
        fields = ProfileSerializer.Meta.fields + [
            "start_hour",
            "end_hour",
            "week_days",
            "description",
            "preferences",
        ]

    likes = serializers.SerializerMethodField()

    def get_likes(self, obj):
        return RatedProfile.objects.filter(
            author=obj, profile=self.context["request"].user.profile, liked=True
        ).exists()

    def get_liked(self, obj):
        rated_profile = get_or_none(
            RatedProfile, author=self.context["request"].user.profile, profile=obj
        )
        return rated_profile and rated_profile.liked


class CurrentProfileSerializer(ProfileSerializer):
    class Meta:
        model = Profile
        depth = 1
        fields = ProfileSerializer.Meta.fields + ["birth_date"]


class PreferencesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Preferences
        fields = [
            # 1
            "gender",
            "fem_avatar",
            "age_min",
            "age_max",
            # 2
            "setup",
            "role",
            "mute",
            "furry",
        ]


class PreferencesFormSerializer(serializers.ModelSerializer):
    # 1
    age_max = serializers.IntegerField(min_value=19, max_value=35)
    age_min = serializers.IntegerField(min_value=18, max_value=34)
    gender = MultipleChoiceField(GenderEnum)
    # 2
    role = MultipleChoiceField(RoleEnum)
    setup = MultipleChoiceField(SetupEnum)

    class Meta:
        model = Preferences
        fields = [
            # 1
            "age_max",
            "age_min",
            "fem_avatar",
            "gender",
            # 2
            "furry",
            "mute",
            "role",
            "setup",
        ]


class ProfileFormSerializer(WritableNestedModelSerializer):
    # todo: over 18 validator based on month and year
    birth_month = serializers.IntegerField(min_value=1, max_value=12)
    birth_year = serializers.IntegerField(min_value=1920)
    trans = serializers.BooleanField()

    preferences = PreferencesFormSerializer()

    class Meta:
        model = Profile
        fields = [
            # 1
            "birth_month",
            "birth_year",
            "fem_avatar",
            "gender",
            "trans",
            "username",
            # 2
            "furry",
            "mute",
            "role",
            "setup",
            # other
            "preferences",
        ]

    def map_data(self, data):
        return {
            "birth_date": datetime.date(
                year=data.pop("birth_year"), month=data.pop("birth_month"), day=1
            ),
            "gender": GenderEnum[data.pop("gender") + "Trans"]
            if data.pop("trans")
            else data.pop("gender"),
            **data,
        }

    def create(self, data):
        return super().create(self.map_data(data))

    def update(self, instance, data):
        return super().update(instance, self.map_data(data))
