from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.urls import include, path
from django.views import defaults as default_views
from drf_spectacular.utils import extend_schema
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

from vrpair.likes.views import (
    PairList,
    RateProfile,
    LikesList,
    LikedList,
)
from vrpair.profiles.views import (
    ProfileList,
    CurrentProfile,
    CreateProfile,
    ProfileDetails,
    ProfileFeed,
    EditProfile,
    EditPreferences,
)
from vrpair.users.views import DiscordLogin, ForceToken, CurrentUser

urlpatterns = [
    path(settings.ADMIN_URL, admin.site.urls),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if settings.DEBUG:
    # Static file serving when using Gunicorn + Uvicorn for local web socket development
    urlpatterns += staticfiles_urlpatterns()

api_paths = [
    # likes
    path("likes/rate-profile", RateProfile.as_view(), name="rate_profile"),
    path(
        "likes/liked-list",
        LikedList.as_view(),
        name="liked_list",
    ),
    path(
        "likes/likes-list",
        LikesList.as_view(),
        name="likes_list",
    ),
    path(
        "likes/pair-list",
        PairList.as_view(),
        name="pair_list",
    ),
    # profiles
    path("profiles/profile-list", ProfileList.as_view(), name="profile_list"),
    path("profiles/profile-feed", ProfileFeed.as_view(), name="profile_feed"),
    path("profiles/current-profile", CurrentProfile.as_view(), name="current_profile"),
    path("profiles/create-profile", CreateProfile.as_view(), name="create_profile"),
    path(
        "profiles/profile-details/<int:pk>",
        ProfileDetails.as_view(),
        name="profile_details",
    ),
    path("profiles/edit-profile", EditProfile.as_view(), name="edit_profile"),
    path(
        "profiles/edit-preferences", EditPreferences.as_view(), name="edit_preferences"
    ),
    # users
    path("users/discord-login", DiscordLogin.as_view(), name="discord_login"),
    path("users/force-token", ForceToken.as_view(), name="force_token"),
    path("users/refresh-token", TokenRefreshView.as_view(), name="refresh_refresh"),
    path("users/current-user", CurrentUser.as_view(), name="current_user"),
]


@extend_schema(exclude=True)
@api_view(["GET"])
def api_root(request, format=None):
    return Response(
        {
            path.name: reverse(path.name, request=request, format=format)
            for path in api_paths
        }
    )


if settings.DEBUG:
    # This allows the error pages to be debugged during development, just visit
    # these url in browser to see how these error pages look like.
    urlpatterns += api_paths + [
        path("", api_root),
        path(
            "400/",
            default_views.bad_request,
            kwargs={"exception": Exception("Bad Request!")},
        ),
        path(
            "403/",
            default_views.permission_denied,
            kwargs={"exception": Exception("Permission Denied")},
        ),
        path(
            "404/",
            default_views.page_not_found,
            kwargs={"exception": Exception("Page not Found")},
        ),
        path("500/", default_views.server_error),
    ]
    if "debug_toolbar" in settings.INSTALLED_APPS:
        import debug_toolbar

        urlpatterns = [path("__debug__/", include(debug_toolbar.urls))] + urlpatterns
