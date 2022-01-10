from rest_framework import serializers

from vrpair.users.models import User


class UserSerializer(serializers.ModelSerializer):
    has_profile = serializers.BooleanField(source="profile")

    class Meta:
        model = User
        fields = [
            "id",
            "is_staff",
            "discord_username",
            "discord_discriminator",
            "has_profile",
        ]
