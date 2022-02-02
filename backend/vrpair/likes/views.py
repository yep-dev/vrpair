from django.db import IntegrityError
from django.db.models import Q
from rest_framework import status, generics
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework.views import APIView

from vrpair.likes.models import Pair, RatedProfile
from vrpair.likes.serializers import (
    PairSerializer,
    RatedProfileSerializer,
)


class RateProfile(APIView):
    def post(self, request):
        try:
            RatedProfile.objects.create(
                author=request.user.profile,
                profile_id=request.data["profile_id"],
                liked=request.data["liked"],
            )
        except IntegrityError:
            raise ValidationError
        return Response(status=status.HTTP_201_CREATED)


class LikedList(generics.ListAPIView):
    serializer_class = RatedProfileSerializer

    def get_queryset(self):
        return RatedProfile.objects.filter(author=self.request.user.profile, liked=True)


class LikesList(generics.GenericAPIView):
    def get(self, request):
        likes = RatedProfile.objects.filter(
            profile=self.request.user.profile, liked=True
        )
        for like in likes:
            like.profile = like.author
            like.profile.likes = True
        data = RatedProfileSerializer(likes, many=True).data

        return Response(
            {
                "results": data,
                "likes_badge": likes.count(),
            }
        )


class PairList(generics.GenericAPIView):
    def get(self, request):
        pairs = Pair.objects.filter(
            Q(profile1=request.user.profile) | Q(profile2=request.user.profile)
        )
        pairs_badge = 0
        for pair in pairs:
            if pair.profile1 == request.user.profile:
                pair.profile = pair.profile2
                if not pair.contacted1:
                    pairs_badge += 1
            else:
                if not pair.contacted2:
                    pairs_badge += 1
                pair.profile = pair.profile1

        data = PairSerializer(pairs, many=True).data

        return Response(
            {
                "results": data,
                "pairs_badge": pairs_badge,
            }
        )
