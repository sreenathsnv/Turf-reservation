# Generated by Django 5.0.6 on 2024-08-03 04:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('turfapp', '0014_alter_turf_turf_manager'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='slot',
            name='booked_by',
        ),
    ]
