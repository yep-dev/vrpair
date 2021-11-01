from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.contrib.postgres.fields import ArrayField
from django.db import models
from django.core.management.utils import get_random_secret_key
from django.utils import timezone

from vrpair.users.enums import SetupEnum, RoleEnum, GenderEnum, BoolEnum


class UserManager(models.Manager):
    def get_by_natural_key(self, username):
        return self.get(**{self.model.USERNAME_FIELD: username})


class Preferences(models.Model):
    gender = ArrayField(models.CharField(max_length=1, choices=GenderEnum.choices))
    setup = ArrayField(
        models.CharField(max_length=1, choices=SetupEnum.choices), size=8
    )
    furry = ArrayField(models.CharField(max_length=1, choices=BoolEnum.choices), size=8)
    feminine_avatar = ArrayField(
        models.CharField(max_length=1, choices=BoolEnum.choices), size=8
    )
    role = ArrayField(models.CharField(max_length=1, choices=RoleEnum.choices), size=8)

    visible = models.BooleanField(default=True)
    age_min = models.PositiveSmallIntegerField()
    age_max = models.PositiveSmallIntegerField(null=True)


class Profile(models.Model):
    gender = models.CharField(max_length=1, choices=GenderEnum.choices)
    other_gender = models.CharField(max_length=32, null=True)
    attracted_gender = ArrayField(
        models.CharField(max_length=1, choices=GenderEnum.choices), size=8
    )
    description = models.CharField(max_length=512, null=True)
    setup = models.CharField(max_length=1, choices=SetupEnum.choices)

    furry = models.BooleanField()
    feminine_avatar = models.BooleanField()
    role = models.CharField(max_length=1, choices=RoleEnum.choices)


class User(AbstractBaseUser, PermissionsMixin):
    secret_key = models.CharField(max_length=255, default=get_random_secret_key)
    is_staff = models.BooleanField(default=False)
    password = models.CharField(max_length=128, null=True)
    last_login = models.DateTimeField(default=timezone.now)

    discord_id = models.CharField(max_length=32)
    discord_username = models.CharField(max_length=32)
    discord_discriminator = models.CharField(max_length=4, unique=True)

    birth_date = models.DateField(null=True)
    name = models.CharField(max_length=32, null=True)

    REQUIRED_FIELDS = []
    USERNAME_FIELD = "id"
    is_anonymous = False
    is_authenticated = True

    profile = models.OneToOneField(Profile, null=True, on_delete=models.SET_NULL)
    preferences = models.OneToOneField(
        Preferences, null=True, on_delete=models.SET_NULL
    )

    objects = UserManager()

    def __str__(self):
        return self.discord_id
