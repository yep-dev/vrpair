from django.conf import settings
from django.http import HttpResponseRedirect
from environ import environ
from rest_framework import serializers
from rest_framework.views import APIView

from django.shortcuts import redirect
from rest_framework_simplejwt.tokens import RefreshToken

from vrpair.profiles.models import Profile
from vrpair.users.mixins import ApiErrorsMixin, PublicApiMixin

from vrpair.users.models import User

from vrpair.users.utils import discord_get_access_token, discord_get_user_info

env = environ.Env()
HttpResponseRedirect.allowed_schemes.append("vrpair")  # todo: possible cleanup


class DiscordLogin(PublicApiMixin, ApiErrorsMixin, APIView):
    class InputSerializer(serializers.Serializer):
        code = serializers.CharField(required=False)
        error = serializers.CharField(required=False)

    def get(self, request, *args, **kwargs):
        input_serializer = self.InputSerializer(data=request.GET)
        input_serializer.is_valid(raise_exception=True)

        validated_data = input_serializer.validated_data

        code = validated_data.get("code")
        error = validated_data.get("error")

        # login_url = f'{settings.BASE_FRONTEND_URL}/login'
        #
        # if error or not code:
        #     params = urlencode({'error': error})
        #     return redirect(f'{login_url}?{params}')

        access_token = discord_get_access_token(code=code)

        user_data = discord_get_user_info(access_token=access_token)["user"]
        # todo: allow only users with verified email - "verified" flag

        user, _ = User.objects.get_or_create(
            discord_id=user_data["id"],
            defaults={
                "discord_username": user_data["username"],
                "discord_discriminator": user_data["discriminator"],
            },
        )

        if settings.DEBUG and user_data["id"] in env.list("STAFF_DISCORD_IDS"):
            user.is_staff = True
            profile = Profile.objects.first()
            if profile and not user.profile:
                user.profile = profile
            user.save()

        refresh_token = RefreshToken.for_user(user)
        return redirect(
            f"vrpair://oauth?accessToken={refresh_token.access_token}&refreshToken={refresh_token}"
        )


# class LogoutApi(ApiAuthMixin, ApiErrorsMixin, APIView):
#     def post(self, request):
#         """
#         Logs out user by removing JWT cookie header.
#         """
#         user_change_secret_key(user=request.user)
#
#         response = Response(status=status.HTTP_202_ACCEPTED)
#         response.delete_cookie(settings.JWT_AUTH['JWT_AUTH_COOKIE'])
#
#         return response
