import django.contrib.postgres.fields
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Preferences",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "gender",
                    django.contrib.postgres.fields.ArrayField(
                        base_field=models.CharField(
                            choices=[
                                ("male", "Male"),
                                ("maleTrans", "Maletrans"),
                                ("female", "Female"),
                                ("femaleTrans", "Femaletrans"),
                                ("nonBinary", "Nonbinary"),
                            ],
                            max_length=12,
                        ),
                        size=None,
                    ),
                ),
                (
                    "fem_avatar",
                    models.CharField(
                        choices=[("true", "True"), ("false", "False"), ("any", "Any")],
                        max_length=8,
                    ),
                ),
                ("age_min", models.PositiveSmallIntegerField()),
                ("age_max", models.PositiveSmallIntegerField()),
                (
                    "setup",
                    django.contrib.postgres.fields.ArrayField(
                        base_field=models.CharField(
                            choices=[
                                ("quest", "Quest"),
                                ("pcvr", "Pcvr"),
                                ("fbt", "Fbt"),
                            ],
                            max_length=8,
                        ),
                        size=None,
                    ),
                ),
                (
                    "role",
                    django.contrib.postgres.fields.ArrayField(
                        base_field=models.CharField(
                            choices=[
                                ("sub", "Sub"),
                                ("dom", "Dom"),
                                ("switch", "Switch"),
                            ],
                            max_length=8,
                        ),
                        size=None,
                    ),
                ),
                (
                    "mute",
                    models.CharField(
                        choices=[("true", "True"), ("false", "False"), ("any", "Any")],
                        max_length=8,
                    ),
                ),
                (
                    "furry",
                    models.CharField(
                        choices=[("true", "True"), ("false", "False"), ("any", "Any")],
                        max_length=8,
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Profile",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("username", models.CharField(max_length=32)),
                ("birth_date", models.DateField()),
                (
                    "gender",
                    models.CharField(
                        choices=[
                            ("male", "Male"),
                            ("maleTrans", "Maletrans"),
                            ("female", "Female"),
                            ("femaleTrans", "Femaletrans"),
                            ("nonBinary", "Nonbinary"),
                        ],
                        max_length=12,
                    ),
                ),
                ("fem_avatar", models.BooleanField()),
                (
                    "setup",
                    models.CharField(
                        choices=[("quest", "Quest"), ("pcvr", "Pcvr"), ("fbt", "Fbt")],
                        max_length=8,
                    ),
                ),
                (
                    "role",
                    models.CharField(
                        choices=[("sub", "Sub"), ("dom", "Dom"), ("switch", "Switch")],
                        max_length=8,
                    ),
                ),
                ("mute", models.BooleanField()),
                ("furry", models.BooleanField()),
                ("start_hour", models.PositiveIntegerField(null=True)),
                ("end_hour", models.PositiveIntegerField(null=True)),
                (
                    "week_days",
                    django.contrib.postgres.fields.ArrayField(
                        base_field=models.PositiveSmallIntegerField(
                            choices=[
                                (1, "Monday"),
                                (2, "Tuesday"),
                                (3, "Wednesday"),
                                (4, "Thursday"),
                                (5, "Friday"),
                                (6, "Saturday"),
                                (7, "Sunday"),
                            ]
                        ),
                        null=True,
                        size=None,
                    ),
                ),
                ("description", models.CharField(max_length=512, null=True)),
                ("vrc_username", models.CharField(max_length=32, null=True)),
                ("verified", models.BooleanField(default=False)),
                ("visible", models.BooleanField(default=True)),
                ("thumbnail", models.ImageField(null=True, upload_to="")),
                (
                    "preferences",
                    models.OneToOneField(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="profiles.preferences",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="ProfileImage",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("image", models.ImageField(upload_to="")),
                ("order", models.PositiveSmallIntegerField(default=0)),
                (
                    "profile",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="images",
                        to="profiles.profile",
                    ),
                ),
            ],
        ),
    ]
