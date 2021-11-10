from django.db import models


class SetupEnum(models.TextChoices):
    desktop = "d"
    quest = "q"
    pcvr = "p"
    fbt = "f"


class RoleEnum(models.TextChoices):
    sub = "s"
    dom = "d"
    switch = "x"


class GenderEnum(models.TextChoices):
    male = "m"
    male_trans = "n"
    female = "f"
    female_trans = "g"
    other = "o"


class BoolEnum(models.TextChoices):
    yes = "y"
    no = "n"
    both = "b"
