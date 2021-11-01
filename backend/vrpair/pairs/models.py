from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()


class LikedUser(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="liked_users")
    target = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="liked_targets"
    )
    date = models.DateTimeField(auto_now_add=True)


class SkippedUser(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="skipped_users"
    )
    target = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="skipped_targets"
    )
    date = models.DateTimeField(auto_now_add=True)


class Pair(models.Model):
    user1 = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user1")
    user2 = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user2")
    date = models.DateTimeField(auto_now_add=True)
