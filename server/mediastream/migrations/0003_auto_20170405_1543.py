# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-04-05 15:43
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('mediastream', '0002_auto_20170404_2040'),
    ]

    operations = [
        migrations.RenameField(
            model_name='video',
            old_name='url',
            new_name='videoId',
        ),
    ]