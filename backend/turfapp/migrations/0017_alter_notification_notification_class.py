# Generated by Django 5.0.6 on 2024-08-08 09:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('turfapp', '0016_remove_slot_is_booked_booking_date_booking_time_slot_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='notification',
            name='notification_class',
            field=models.CharField(choices=[('group', 'group'), ('payment', 'payment'), ('booking', 'booking'), ('Refunded', 'Refunded')], max_length=20),
        ),
    ]
