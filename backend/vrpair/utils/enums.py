from django.db import models


class SetupEnum(models.IntegerChoices):
    quest = 1  # not supported ently
    pcvr = 2
    fbt = 3


class RoleEnum(models.IntegerChoices):
    sub = 1
    dom = 2
    switch = 3


class GenderEnum(models.IntegerChoices):
    male = 1
    male_trans = 2
    female = 5
    female_trans = 6
    other = 9


class BoolEnum(models.IntegerChoices):
    yes = 1
    no = 2
    both = 3


class WeekDayEnum(models.IntegerChoices):
    monday = 1
    tuesday = 2
    wednesday = 3
    thursday = 4
    friday = 5
    saturday = 6
    sunday = 7
