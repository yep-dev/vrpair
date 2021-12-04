from rest_framework import serializers

from vrpair.profiles.models import Profile, Preferences


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        depth = 1
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
            "start_hour",
            "end_hour",
            "week_days",
            "description",
            "verified",
            "preferences",
        ]


class PreferencesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Preferences
        fields = [
            # 3
            "gender",
            "fem_avatar",
            "age_min",
            "age_max",
            # 4
            "setup",
            "role",
            "mute",
            "furry",
        ]
