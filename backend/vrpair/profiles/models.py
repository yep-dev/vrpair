from django.db import models
from django.contrib.postgres.fields import ArrayField
from vrpair.utils.enums import SetupEnum, RoleEnum, GenderEnum, BoolEnum, WeekDayEnum


class Profile(models.Model):
    # Step 1
    birth_date = models.DateField()
    gender = models.PositiveSmallIntegerField(choices=GenderEnum.choices)
    other_gender = models.CharField(max_length=32, null=True)

    # Step 2
    attracted_gender = ArrayField(
        models.PositiveSmallIntegerField(choices=GenderEnum.choices),
        size=len(GenderEnum),
    )
    role = models.PositiveSmallIntegerField(choices=RoleEnum.choices)

    # Step 3
    setup = models.PositiveSmallIntegerField(choices=SetupEnum.choices)
    feminine_avatar = models.BooleanField()
    furry = models.BooleanField()

    # Step 4
    username = models.CharField(max_length=32, null=True)
    description = models.CharField(max_length=512, null=True)

    # Step 5
    start_hour = models.PositiveIntegerField()
    end_hour = models.PositiveIntegerField()
    week_days = ArrayField(
        models.PositiveSmallIntegerField(choices=WeekDayEnum.choices),
        size=len(WeekDayEnum),
    )

    verified = models.BooleanField(default=False)
    visible = models.BooleanField(default=True)


class Preferences(models.Model):
    gender = ArrayField(models.PositiveSmallIntegerField(choices=GenderEnum.choices))
    role = ArrayField(
        models.PositiveSmallIntegerField(choices=RoleEnum.choices), size=len(RoleEnum)
    )
    setup = ArrayField(
        models.PositiveSmallIntegerField(choices=SetupEnum.choices),
        size=len(SetupEnum),
    )
    feminine_avatar = models.PositiveSmallIntegerField(choices=BoolEnum.choices)
    furry = models.PositiveSmallIntegerField(choices=BoolEnum.choices)
    age_min = models.PositiveSmallIntegerField()
    age_max = models.PositiveSmallIntegerField(null=True)
