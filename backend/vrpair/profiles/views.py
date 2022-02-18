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
        likes = RatedProfile.objects.filter(profile=profile).values(
            "author_id",
            "liked",
        )
        likes = {like["author_id"]: like["liked"] for like in likes}
        queryset = Profile.objects.filter(visible=True).order_by("?")
        for item in queryset:
            item.likes = likes.get(item.id)
        return queryset


class ProfileFeed(generics.ListAPIView):
    serializer_class = ProfileSerializer

    def get_queryset(self):
        profile = self.request.user.profile
        return RatedProfile.objects.filter(profile=profile, liked=True)


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
