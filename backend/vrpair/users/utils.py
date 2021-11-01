import requests
from typing import Dict, Any

from django.conf import settings
from django.http import HttpResponse
from django.core.exceptions import ValidationError

# from rest_framework_jwt.settings import api_settings
# from rest_framework_jwt.compat import set_cookie_with_token

from vrpair.users.models import User

# from vrpair.users.utils import user_record_login


TOKEN_URL = "https://discord.com/api/v8/oauth2/token"
AUTHORIZE_URL = "https://discord.com/api/oauth2/authorize"
DETAILS_URL = "https://discord.com/api/oauth2/@me"


# def jwt_login(*, response: HttpResponse, user: User) -> HttpResponse:
#     jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
#     jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
#
#     payload = jwt_payload_handler(user)
#     token = jwt_encode_handler(payload)
#
#     if api_settings.JWT_AUTH_COOKIE:
#         Reference: https://github.com/Styria-Digital/django-rest-framework-jwt/blob/master/src/rest_framework_jwt/compat.py#L43
# set_cookie_with_token(response, api_settings.JWT_AUTH_COOKIE, token)
#
# user_record_login(user=user)
#
# return response
#


def discord_validate_id_token(*, id_token: str) -> bool:
    response = requests.get(TOKEN_URL, params={"id_token": id_token})

    if not response.ok:
        raise ValidationError("id_token is invalid.")

    audience = response.json()["aud"]

    if audience != settings.OAUTH_DISCORD_CLIENT_ID:
        raise ValidationError("Invalid audience.")

    return True


def discord_get_access_token(*, code: str, redirect_uri: str) -> str:
    data = {
        "code": code,
        "client_id": settings.OAUTH_DISCORD_CLIENT_ID,
        "client_secret": settings.OAUTH_DISCORD_CLIENT_SECRET,
        "redirect_uri": "http://127.0.0.1:8000/discord",
        "grant_type": "authorization_code",
    }
    response = requests.post(TOKEN_URL, data=data)
    response.raise_for_status()

    access_token = response.json()["access_token"]

    return access_token


def discord_get_user_info(*, access_token: str) -> Dict[str, Any]:
    response = requests.get(
        DETAILS_URL, headers={"Authorization": f"Bearer {access_token}"}
    )

    if not response.ok:
        raise ValidationError("Failed to obtain user info from Discord.")

    return response.json()
