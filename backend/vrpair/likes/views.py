from django.db.models import Q
from drf_spectacular.utils import extend_schema
from rest_framework import generics, serializers

from vrpair.contrib.views import UpdateOrCreateAPIView
from vrpair.likes.models import Pair, RatedProfile
from vrpair.likes.serializers import (
    PairSerializer,
    RatedProfileSerializer,
    RateProfileSerializer,
)


@extend_schema(responses=RateProfileSerializer)
class RateProfile(UpdateOrCreateAPIView):
    serializer_class = RateProfileSerializer

    def perform_create(self, serializer):
        return RatedProfile.objects.update_or_create(
            author=self.request.user.profile,
            profile_id=serializer.data["profile_id"],
            defaults={"liked": serializer.data["liked"]},
        )


class LikedList(generics.ListAPIView):
    serializer_class = RatedProfileSerializer

    def get_queryset(self):
        return RatedProfile.objects.filter(author=self.request.user.profile, liked=True)


class LikesList(generics.RetrieveAPIView):
    class LikesList(serializers.Serializer):
        results = RatedProfileSerializer(many=True)
        likes_badge = serializers.IntegerField()

    serializer_class = LikesList

    def get_object(self):
        likes = RatedProfile.objects.filter(
            profile=self.request.user.profile, liked=True
        )
        for like in likes:
            like.profile = like.author

        return {
            "results": likes,
            "likes_badge": likes.count(),
        }


class PairList(generics.RetrieveAPIView):
    class PairList(serializers.Serializer):
        results = PairSerializer(many=True)
        pairs_badge = serializers.IntegerField()

    serializer_class = PairList

    def get_object(self):
        pairs = Pair.objects.filter(
            Q(profile1=self.request.user.profile)
            | Q(profile2=self.request.user.profile)
        )
        pairs_badge = 0
        for pair in pairs:
            if pair.profile1 == self.request.user.profile:
                pair.profile = pair.profile2
                if not pair.contacted1:
                    pairs_badge += 1
            else:
                if not pair.contacted2:
                    pairs_badge += 1
                pair.profile = pair.profile1

        return {
            "results": pairs,
            "pairs_badge": pairs_badge,
        }
