from django.db import IntegrityError
from django.db.models import Q
from rest_framework import status, generics
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework.views import APIView

from vrpair.likes.models import LikedProfile, Pair, SkippedProfile
from vrpair.likes.serializers import LikedProfileSerializer, PairSerializer


class LikeProfile(APIView):
    def post(self, request):
        try:
            LikedProfile.objects.create(
                author=request.user.profile, profile_id=request.data["profile_id"]
            )
        except IntegrityError:
            raise ValidationError
        return Response(status=status.HTTP_201_CREATED)


class SkipProfile(APIView):
    def post(self, request):
        try:
            SkippedProfile.objects.create(
                author=request.user.profile, profile_id=request.data["profile_id"]
            )
        except IntegrityError:
            raise ValidationError
        return Response(status=status.HTTP_201_CREATED)


class LikedProfileList(generics.ListAPIView):
    serializer_class = LikedProfileSerializer

    def get_queryset(self):
        return LikedProfile.objects.filter(author=self.request.user.profile)


class LikesList(generics.ListAPIView):
    serializer_class = LikedProfileSerializer

    def get_queryset(self):
        return LikedProfile.objects.filter(profile=self.request.user.profile)


class PairList(generics.ListAPIView):
    serializer_class = PairSerializer

    def get_queryset(self):
        pairs = Pair.objects.filter(
            Q(profile1=self.request.user) | Q(profile2=self.request.user.profile)
        )
        for pair in pairs:
            if pair.profile1 == self.request.user:
                pair.profile = pair.profile1
            else:
                pair.profile = pair.profile2
        return pairs
