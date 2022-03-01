# Register your models here.
from django.contrib import admin

from vrpair.profiles.models import ProfileImage


@admin.register(ProfileImage)
class ProfileImageAdmin(admin.ModelAdmin):
    pass
