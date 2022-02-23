from django.conf import settings
from django.http import HttpResponseRedirect
from drf_spectacular.utils import extend_schema
from environ import environ
from rest_framework import serializers, permissions, generics
from rest_framework.exceptions import ValidationError
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response

from django.shortcuts import redirect
from rest_framework_simplejwt.serializers import TokenRefreshSerializer
from rest_framework_simplejwt.tokens import RefreshToken

from vrpair.contrib.views import SerializeGetMixin
from vrpair.profiles.factories import ProfileFactory
from vrpair.profiles.models import Profile
from vrpair.users.mixins import ApiErrorsMixin, PublicApiMixin

from vrpair.users.models import User
from vrpair.users.serializers import UserSerializer

from vrpair.users.utils import discord_get_access_token, discord_get_user_info

env = environ.Env()
HttpResponseRedirect.allowed_schemes.append("vrpair")  # todo: possible cleanup


@extend_schema(exclude=True)
class DiscordLogin(
    PublicApiMixin, ApiErrorsMixin, SerializeGetMixin, generics.GenericAPIView
):
    class DiscordLogin(serializers.Serializer):
        code = serializers.CharField(required=False)
        error = serializers.CharField(required=False)

    serializer_get = DiscordLogin

    def get(self, request, *args, **kwargs):
        params = self.get_params()
        # login_url = f'{settings.BASE_FRONTEND_URL}/login'
        #
        # if params["error"] or not params["code"]:
        #     error = urlencode({'error': error})
        #     return redirect(f'{login_url}?{error}')

        access_token = discord_get_access_token(code=params["code"])

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
            if user.profile_id is None:
                user.profile = ProfileFactory(user=user)
            user.save()

        refresh_token = RefreshToken.for_user(user)
        return redirect(
            f"vrpair://oauth?accessToken={refresh_token.access_token}&refreshToken={refresh_token}"
        )


class ForceToken(SerializeGetMixin, generics.GenericAPIView):
    class ForceToken(serializers.Serializer):
        profileId = serializers.IntegerField(required=False)
        userId = serializers.IntegerField(required=False)

    permission_classes = [permissions.IsAdminUser]
    serializer_class = TokenRefreshSerializer
    serializer_get = ForceToken

    @extend_schema(parameters=[ForceToken])
    def get(self, request):
        params = self.get_params()
        if profile_id := params.get("profileId"):
            profile = get_object_or_404(Profile, id=profile_id)
            user = profile.user
        elif user_id := params.get("userId"):
            user = get_object_or_404(User, id=user_id)
        else:
            raise ValidationError("Missing profileId or userId param")

        refresh = RefreshToken.for_user(user)
        return Response(
            {
                "refresh": str(refresh),
                "access": str(refresh.access_token),
            }
        )


class CurrentUser(generics.RetrieveAPIView):
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


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
