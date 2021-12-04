from django.db import models


class GenderEnum(models.TextChoices):
    male = "male"
    maleTrans = "maleTrans"
    female = "female"
    femaleTrans = "femaleTrans"
    nonBinary = "nonBinary"


class BoolEnum(models.TextChoices):
    true = "true"
    false = "false"
    any = "any"


class SetupEnum(models.TextChoices):
    quest = "quest"
    pcvr = "pcvr"
    fbt = "fbt"


class RoleEnum(models.TextChoices):
    sub = "sub"
    dom = "dom"
    switch = "switch"


class WeekDayEnum(models.IntegerChoices):
    monday = 1
    tuesday = 2
    wednesday = 3
    thursday = 4
    friday = 5
    saturday = 6
    sunday = 7
