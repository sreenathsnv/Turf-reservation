# Generated by Django 5.0.6 on 2024-08-02 05:10

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('turfapp', '0013_slot'),
    ]

    operations = [
        migrations.AlterField(
            model_name='turf',
            name='turf_manager',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
