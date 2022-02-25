from rest_framework import generics, serializers
from rest_framework.response import Response
from rest_framework.views import APIView

from vrpair.likes.models import RatedProfile
from vrpair.likes.serializers import RatedProfileSerializer
from vrpair.profiles.models import Profile
from vrpair.profiles.serializers import (
    ProfileSerializer,
    ProfileFormSerializer,
    CurrentProfileSerializer,
    ProfileDetailsSerializer,
)
from vrpair.utils.models import get_or_none


class ProfileList(generics.ListAPIView):
    serializer_class = ProfileSerializer

    def get_queryset(self):
        profile = self.request.user.profile
        likes = RatedProfile.objects.filter(profile=profile).values_list(
            "author_id", flat=True
        )
        liked = RatedProfile.objects.filter(author=profile).values_list(
            "profile_id", flat=True
        )
        qs = (
            Profile.objects.filter(visible=True)
            .exclude(id__in=list(likes) + list(liked))
            .order_by("?")
        )
        return qs


class ProfileFeed(generics.ListAPIView):
    class ProfileFeed(serializers.Serializer):
        profile = ProfileDetailsSerializer()
        ratedProfile = RatedProfileSerializer()

    serializer_class = ProfileFeed

    def get_queryset(self):
        profile = self.request.user.profile
        likes = RatedProfile.objects.filter(profile=profile)

        profiles = Profile.objects.filter(visible=True).order_by("?")
        return [
            {"profile": rated_profile.profile, "ratedProfile": rated_profile}
            for rated_profile in likes
        ] + [{"profile": profile, "ratedProfile": None} for profile in profiles]


class CurrentProfile(generics.RetrieveAPIView):
    serializer_class = CurrentProfileSerializer

    def get_object(self):
        return self.request.user.profile


class CreateProfile(APIView):
    serializer_class = CurrentProfileSerializer

    def post(self, request):
        instance = get_or_none(Profile, user=request.user)
        data = request.data
        if instance:
            data["preferences"]["id"] = instance.preferences.id
        profile = ProfileFormSerializer(instance, data=data)
        profile.is_valid(raise_exception=True)
        profile = profile.save()
        if not instance:
            request.user.profile = profile
            request.user.save()
        return Response(CurrentProfileSerializer(profile).data)


class ProfileDetails(generics.RetrieveAPIView):
    serializer_class = ProfileDetailsSerializer
    queryset = Profile.objects.all()
