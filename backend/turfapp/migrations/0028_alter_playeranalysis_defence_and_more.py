# Generated by Django 5.0.6 on 2024-08-28 18:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('turfapp', '0027_playeranalysis_diving_playeranalysis_positioning_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='playeranalysis',
            name='defence',
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
        migrations.AlterField(
            model_name='playeranalysis',
            name='diving',
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
        migrations.AlterField(
            model_name='playeranalysis',
            name='dribble',
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
        migrations.AlterField(
            model_name='playeranalysis',
            name='pass_acuracy',
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
        migrations.AlterField(
            model_name='playeranalysis',
            name='positioning',
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
        migrations.AlterField(
            model_name='playeranalysis',
            name='reflexes',
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
        migrations.AlterField(
            model_name='playeranalysis',
            name='shoot',
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
    ]
