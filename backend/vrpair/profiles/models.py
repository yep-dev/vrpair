from django.db import models
from django.contrib.postgres.fields import ArrayField
from vrpair.utils.enums import SetupEnum, RoleEnum, GenderEnum, BoolEnum


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
