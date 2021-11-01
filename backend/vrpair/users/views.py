from urllib.parse import urlencode

from django.http import HttpResponseRedirect
from rest_framework import status, serializers
from rest_framework.views import APIView
from rest_framework.response import Response

# from rest_framework_jwt.views import ObtainJSONWebTokenView

from django.urls import reverse
from django.conf import settings
from django.shortcuts import redirect

from vrpair.users.mixins import ApiErrorsMixin, PublicApiMixin

# from users.services import user_record_login, user_change_secret_key, user_get_or_create
from vrpair.users.models import User

from vrpair.users.utils import discord_get_access_token, discord_get_user_info


# class LoginApi(ApiErrorsMixin, ObtainJSONWebTokenView):
#     def post(self, request, *args, **kwargs):
#         Reference: https://github.com/Styria-Digital/django-rest-framework-jwt/blob/master/src/rest_framework_jwt/views.py#L44
# serializer = self.get_serializer(data=request.data)
#
# serializer.is_valid(raise_exception=True)
#
# user = serializer.object.get('user') or request.user
# user_record_login(user=user)
#
# return super().post(request, *args, **kwargs)


HttpResponseRedirect.allowed_schemes.append("com.vrpair")  # todo: possible cleanup


class DiscordLoginApi(PublicApiMixin, ApiErrorsMixin, APIView):
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

        domain = settings.BASE_URL
        api_uri = reverse("discord")
        redirect_uri = f"{domain}{api_uri}"

        access_token = discord_get_access_token(code=code, redirect_uri=redirect_uri)

        user_data = discord_get_user_info(access_token=access_token)["user"]
        # todo: allow only users with verified email - "verified" flag

        user, _ = User.objects.get_or_create(
            discord_id=user_data["id"],
            defaults={
                "discord_username": user_data["username"],
                "discord_discriminator": user_data["discriminator"],
            },
        )

        # response = redirect(settings.BASE_FRONTEND_URL)
        # response = jwt_login(response=response, user=user)
        return redirect("com.vrpair:/oauthredirect")


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
