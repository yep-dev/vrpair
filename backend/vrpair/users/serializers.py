from rest_framework import serializers

from vrpair.users.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["is_staff", "discord_username", "discord_discriminator"]
