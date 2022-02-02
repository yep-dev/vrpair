from django.db import models
from django.utils import timezone

from vrpair.profiles.models import Profile


class RatedProfile(models.Model):
    author = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="rated")
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="rates")
    liked = models.BooleanField()
    date = models.DateTimeField(default=timezone.now)

    class Meta:
        unique_together = ["author", "profile"]


class Pair(models.Model):
    profile1 = models.ForeignKey(
        Profile, on_delete=models.CASCADE, related_name="pair1"
    )
    profile2 = models.ForeignKey(
        Profile, on_delete=models.CASCADE, related_name="pair2"
    )
    contacted1 = models.BooleanField(default=False)
    contacted2 = models.BooleanField(default=False)
    date = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ["profile1", "profile2"]

    def save(self, *args, **kwargs):
        if self.profile1_id > self.profile2_id:
            profile1_id = self.profile1_id
            self.profile1_id = self.profile2_id
            self.profile2_id = profile1_id

            contacted1 = self.contacted1
            self.contacted1 = self.contacted2
            self.contacted2 = contacted1
        super().save(*args, **kwargs)
