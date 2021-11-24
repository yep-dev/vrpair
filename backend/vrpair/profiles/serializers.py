from rest_framework import serializers

from vrpair.profiles.models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = [
            "id",
            "gender",
            "other_gender",
            "attracted_gender",
            "role",
            "setup",
            "feminine_avatar",
            "furry",
            "username",
            "description",
            "start_hour",
            "end_hour",
            "week_days",
            "verified",
        ]

    # age todo
