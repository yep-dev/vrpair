from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView

from vrpair.likes.models import RatedProfile
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
        queryset = Profile.objects.filter(visible=True).order_by("?")
        for item in queryset:
            if item.id in likes:
                item.likes = True
        return queryset


class ProfileFeed(generics.ListAPIView):
    serializer_class = ProfileSerializer

    def get_queryset(self):
        profile = self.request.user.profile
        return RatedProfile.objects.filter(profile=profile, liked=True)


class CurrentProfile(APIView):
    def get(self, request):
        serializer = CurrentProfileSerializer(request.user.profile)
        return Response(serializer.data)


class CreateProfile(APIView):
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
