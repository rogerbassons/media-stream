# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-04-12 20:38
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('mediastream', '0008_comment'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comment',
            name='video',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comments', to='mediastream.Video'),
        ),
    ]