# Generated by Django 4.2.5 on 2023-10-05 09:57

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("booking", "0001_initial"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="booking",
            name="approved",
        ),
    ]