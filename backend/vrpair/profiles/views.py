from rest_framework import generics

from vrpair.profiles.models import Profile
from vrpair.profiles.serializers import ProfileSerializer


class ProfileList(generics.ListAPIView):
    queryset = Profile.objects.filter(visible=True)
    serializer_class = ProfileSerializer
