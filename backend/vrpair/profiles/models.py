from django.db import models
from django.contrib.postgres.fields import ArrayField

from vrpair.utils.enums import SetupEnum, RoleEnum, GenderEnum, BoolEnum, WeekDayEnum
from datetime import date


class Preferences(models.Model):
    # 3
    gender = ArrayField(models.CharField(max_length=12, choices=GenderEnum.choices))
    fem_avatar = models.CharField(max_length=8, choices=BoolEnum.choices)
    age_min = models.PositiveSmallIntegerField()
    age_max = models.PositiveSmallIntegerField(null=True)

    # 4
    setup = ArrayField(
        models.CharField(max_length=8, choices=SetupEnum.choices),
    )
    role = ArrayField(models.CharField(max_length=8, choices=RoleEnum.choices))
    mute = models.CharField(max_length=8, choices=BoolEnum.choices)
    furry = models.CharField(max_length=8, choices=BoolEnum.choices)


class Profile(models.Model):
    # 1
    username = models.CharField(max_length=32, null=True)
    birth_date = models.DateField()
    gender = models.CharField(max_length=12, choices=GenderEnum.choices)
    fem_avatar = models.BooleanField()

    # 2
    setup = models.CharField(max_length=8, choices=SetupEnum.choices)
    role = models.CharField(max_length=8, choices=RoleEnum.choices)
    mute = models.BooleanField()
    furry = models.BooleanField()

    # other
    start_hour = models.PositiveIntegerField(null=True)
    end_hour = models.PositiveIntegerField(null=True)
    week_days = ArrayField(
        models.PositiveSmallIntegerField(choices=WeekDayEnum.choices),
        null=True,
    )

    description = models.CharField(max_length=512, null=True)

    # verification
    vrc_username = models.CharField(max_length=32, null=True)
    verified = models.BooleanField(default=False)

    # internal
    visible = models.BooleanField(default=True)
    preferences = models.OneToOneField(Preferences, on_delete=models.CASCADE)

    @property
    def age(self):
        return int((date.today() - self.birth_date).days / 365.2425)
