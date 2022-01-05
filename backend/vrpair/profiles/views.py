from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView

from vrpair.profiles.models import Profile
from vrpair.profiles.serializers import ProfileSerializer


class ProfileList(generics.ListAPIView):
    queryset = Profile.objects.filter(visible=True).order_by("?")
    serializer_class = ProfileSerializer


class CurrentProfile(APIView):
    def get(self, request):
        serializer = ProfileSerializer(request.user.profile)
        return Response(serializer.data)
