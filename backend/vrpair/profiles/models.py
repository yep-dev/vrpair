from django.db import models
from django.contrib.postgres.fields import ArrayField

from vrpair.utils.enums import SetupEnum, RoleEnum, GenderEnum, BoolEnum, WeekDayEnum
from datetime import date


class Preferences(models.Model):
    # 3
    gender = ArrayField(models.CharField(max_length=12, choices=GenderEnum.choices))
    fem_avatar = models.CharField(max_length=8, choices=BoolEnum.choices)
    age_min = models.PositiveSmallIntegerField()
    age_max = models.PositiveSmallIntegerField()

    # 4
    setup = ArrayField(
        models.CharField(max_length=8, choices=SetupEnum.choices),
    )
    role = ArrayField(models.CharField(max_length=8, choices=RoleEnum.choices))
    mute = models.CharField(max_length=8, choices=BoolEnum.choices)
    furry = models.CharField(max_length=8, choices=BoolEnum.choices)


class Profile(models.Model):
    # 1
    username = models.CharField(max_length=32)
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
    thumbnail = models.ImageField(null=True)

    @property
    def age(self):
        return int((date.today() - self.birth_date).days / 365.2425)


class ProfileImage(models.Model):
    image = models.ImageField()
    order = models.PositiveSmallIntegerField(default=0)
    profile = models.ForeignKey(
        Profile, related_name="images", on_delete=models.CASCADE
    )

    def save(self, *args, **kwargs):
        if not self.pk:
            last_image = (
                ProfileImage.objects.filter(profile=self.profile)
                .order_by("order")
                .last()
            )
            self.order = last_image.order + 1 if last_image else 0
        super().save(*args, **kwargs)

        if self.order == 0:
            self.profile.thumbnail = self.image
            self.profile.save()
