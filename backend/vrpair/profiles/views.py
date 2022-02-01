from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView

from vrpair.profiles.models import Profile
from vrpair.profiles.serializers import (
    ProfileSerializer,
    ProfileFormSerializer,
    CurrentProfileSerializer,
)
from vrpair.utils.models import get_or_none


class ProfileList(generics.ListAPIView):
    queryset = Profile.objects.filter(visible=True).order_by("?")
    serializer_class = ProfileSerializer


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
