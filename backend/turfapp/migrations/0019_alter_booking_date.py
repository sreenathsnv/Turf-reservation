# Generated by Django 5.0.6 on 2024-08-13 06:21

import turfapp.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('turfapp', '0018_payment_currency'),
    ]

    operations = [
        migrations.AlterField(
            model_name='booking',
            name='date',
            field=models.DateField(default=turfapp.models.get_current_date),
        ),
    ]
