# Generated by Django 3.2.7 on 2023-09-27 14:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('country', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='country',
            name='imageUrl',
            field=models.ImageField(null=True, upload_to='country_images/'),
        ),
    ]
