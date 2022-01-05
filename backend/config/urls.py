from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.urls import include, path
from django.views import defaults as default_views
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

from vrpair.likes.views import (
    LikeProfile,
    LikedProfileList,
    PairList,
    LikeList,
    SkipProfile,
)
from vrpair.profiles.views import ProfileList, CurrentProfile
from vrpair.users.views import DiscordLogin, ForceToken, CurrentUser

urlpatterns = [
    path(settings.ADMIN_URL, admin.site.urls),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if settings.DEBUG:
    # Static file serving when using Gunicorn + Uvicorn for local web socket development
    urlpatterns += staticfiles_urlpatterns()

api_paths = [
    # likes
    path("likes/like-profile", LikeProfile.as_view(), name="like_profile"),
    path("likes/skip-profile", SkipProfile.as_view(), name="skip_profile"),
    path(
        "likes/liked-profile-list",
        LikedProfileList.as_view(),
        name="liked_profile_list",
    ),
    path(
        "likes/like-list",
        LikeList.as_view(),
        name="like_list",
    ),
    path(
        "likes/pair-list",
        PairList.as_view(),
        name="pair_list",
    ),
    # profiles
    path("profiles/profile-list", ProfileList.as_view(), name="profile_list"),
    path("profiles/current-profile", CurrentProfile.as_view(), name="current_profile"),
    # users
    path("users/discord-login", DiscordLogin.as_view(), name="discord_login"),
    path(
        "users/force-token/<int:profile_id>", ForceToken.as_view(), name="force_token"
    ),
    path("users/refresh-token", TokenRefreshView.as_view(), name="refresh_refresh"),
    path("users/current-user", CurrentUser.as_view(), name="current_user"),
]


@api_view(["GET"])
def api_root(request, format=None):
    print(api_paths)
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
