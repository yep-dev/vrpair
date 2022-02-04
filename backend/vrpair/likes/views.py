from django.db.models import Q
from rest_framework import status, generics
from rest_framework.response import Response

from vrpair.likes.models import Pair, RatedProfile
from vrpair.likes.serializers import (
    PairSerializer,
    RatedProfileSerializer,
    RatedProfileDetailsSerializer,
    RateProfileSerializer,
)


class RateProfile(generics.GenericAPIView):
    def post(self, request):
        serializer = RateProfileSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        rated_profile, _ = RatedProfile.objects.update_or_create(
            author=request.user.profile,
            profile_id=serializer.data["profile_id"],
            defaults={"liked": serializer.data["liked"]},
        )
        return Response(
            RatedProfileDetailsSerializer(
                rated_profile,
                context=self.get_serializer_context(),
            ).data,
            status=status.HTTP_201_CREATED,
        )


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
