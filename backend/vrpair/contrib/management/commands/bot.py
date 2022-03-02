import io

import discord
from django.conf import settings
from django.core.files.images import ImageFile
from django.core.management import BaseCommand
from channels.db import database_sync_to_async as sa

from vrpair.profiles.models import ProfileImage
from vrpair.users.models import User
from vrpair.utils.models import get_or_none

bot = discord.Bot()


@sa
def is_valid(message):
    user = get_or_none(User, discord_id=message.author.id)
    return user and user.profile


@bot.event
async def on_message(message):
    profile = await is_valid(message)
    if not profile:
        pass  # todo: handle no user or profile
    else:
        for attachment in message.attachments:
            if attachment.filename[-4:] in [".png", "jpeg", ".jpg"]:
                file = io.BytesIO()
                await attachment.save(file)
                file = ImageFile(file, name=attachment.filename)
                await sa(ProfileImage.objects.create)(profile=profile, image=file)


class Command(BaseCommand):
    def handle(self, *args, **options):
        bot.run(settings.DISCORD_BOT_TOKEN)
