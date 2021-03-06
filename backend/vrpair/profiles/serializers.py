import datetime

from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import extend_schema_field
from drf_writable_nested import WritableNestedModelSerializer
from rest_framework import serializers

from vrpair.profiles.models import Profile, Preferences, ProfileImage
from vrpair.utils.enums import (
    RoleEnum,
    SetupEnum,
    GenderEnum,
    GenderBaseEnum,
)

from vrpair.utils.serializers import MultipleChoiceField


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
    trans = serializers.BooleanField()

    class Meta:
        model = Profile
        fields = [
            # 1
            "fem_avatar",
            "gender",
            "trans",
            # 2
            "furry",
            "mute",
            "role",
            "setup",
        ]

    def map_data(self, data):
        return {
            "gender": GenderEnum[data.pop("gender") + "Trans"]
            if data.pop("trans")
            else data.pop("gender"),
            **data,
        }

    def update(self, instance, data):
        return super().update(instance, self.map_data(data))


class CreateProfileFormSerializer(ProfileFormSerializer):
    # todo: over 18 validator based on month and year
    birth_month = serializers.IntegerField(min_value=1, max_value=12)
    birth_year = serializers.IntegerField(min_value=1920)
    preferences = PreferencesFormSerializer()

    class Meta:
        model = Profile
        fields = ProfileFormSerializer.Meta.fields + [
            "birth_month",
            "birth_year",
            "preferences",
        ]

    def map_data(self, data):
        return {
            "birth_date": datetime.date(
                year=data.pop("birth_year"), month=data.pop("birth_month"), day=1
            ),
            **data,
        }

    def create(self, data):
        return super().create(self.map_data(data))


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
            "thumbnail",
        ]

    age = serializers.IntegerField()


class ProfileImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfileImage
        fields = ["image", "order"]


class ProfileDetailsSerializer(ProfileSerializer):
    class Meta:
        model = Profile
        fields = ProfileSerializer.Meta.fields + [
            "start_hour",
            "end_hour",
            "week_days",
            "description",
            "preferences",
            "images",
        ]

    preferences = PreferencesSerializer()
    images = ProfileImageSerializer(many=True)


class CurrentProfileSerializer(ProfileDetailsSerializer):
    class Meta:
        model = Profile
        fields = ProfileDetailsSerializer.Meta.fields + [
            "birth_month",
            "birth_year",
            "trans",
        ]

    birth_month = serializers.SerializerMethodField()
    birth_year = serializers.SerializerMethodField()
    trans = serializers.SerializerMethodField()
    gender = serializers.SerializerMethodField()

    @extend_schema_field(OpenApiTypes.NUMBER)
    def get_birth_month(self, obj):
        return obj.birth_date.month

    @extend_schema_field(OpenApiTypes.NUMBER)
    def get_birth_year(self, obj):
        return obj.birth_date.year

    @extend_schema_field(OpenApiTypes.BOOL)  # gender type
    def get_trans(self, obj):
        return obj.gender.endswith("Trans")

    @extend_schema_field(
        serializers.ChoiceField(choices=GenderBaseEnum.choices)
    )  # gender type
    def get_gender(self, obj):
        return obj.gender.removesuffix("Trans")
