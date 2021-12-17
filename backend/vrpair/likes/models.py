from django.db import models

from vrpair.profiles.models import Profile


class LikedProfile(models.Model):
    author = models.ForeignKey(
        Profile, on_delete=models.CASCADE, related_name="liked_profiles"
    )
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="likes")
    date = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ["author", "profile"]


class SkippedProfile(models.Model):
    author = models.ForeignKey(
        Profile, on_delete=models.CASCADE, related_name="skipped_profiles"
    )
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="skips")
    date = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ["author", "profile"]


class Pair(models.Model):
    profile1 = models.ForeignKey(
        Profile, on_delete=models.CASCADE, related_name="pair1"
    )
    profile2 = models.ForeignKey(
        Profile, on_delete=models.CASCADE, related_name="pair2"
    )
    date = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ["profile1", "profile2"]
