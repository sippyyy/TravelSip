# Generated by Django 4.2.6 on 2023-10-25 15:47

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('hotel', '0007_alter_facility_room'),
    ]

    operations = [
        migrations.AlterField(
            model_name='facility',
            name='room',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='facilities', to='hotel.room'),
        ),
    ]
