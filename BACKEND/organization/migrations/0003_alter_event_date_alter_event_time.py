# Generated by Django 5.0 on 2024-05-06 18:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('organization', '0002_event_volunteer_event_volunteers'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='date',
            field=models.TextField(default=''),
        ),
        migrations.AlterField(
            model_name='event',
            name='time',
            field=models.TextField(default=''),
        ),
    ]