from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.db import models
from django.core.management.utils import get_random_secret_key
from django.utils import timezone

from vrpair.profiles.models import Profile


class UserManager(models.Manager):
    def get_by_natural_key(self, username):
        return self.get(**{self.model.USERNAME_FIELD: username})


class User(AbstractBaseUser, PermissionsMixin):
    secret_key = models.CharField(max_length=255, default=get_random_secret_key)
    is_staff = models.BooleanField(default=False)
    password = models.CharField(max_length=128, null=True)
    last_login = models.DateTimeField(default=timezone.now)

    discord_id = models.CharField(max_length=32, unique=True)
    discord_username = models.CharField(max_length=32)
    discord_discriminator = models.CharField(max_length=4)

    REQUIRED_FIELDS = []
    USERNAME_FIELD = "discord_id"
    is_anonymous = False
    is_authenticated = True

    profile = models.OneToOneField(Profile, null=True, on_delete=models.SET_NULL)

    objects = UserManager()

    def __str__(self):
        return self.discord_id
