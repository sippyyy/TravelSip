# Generated by Django 4.2.6 on 2023-10-16 12:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0003_alter_userorganization_user_alter_userprofile_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='dob',
            field=models.DateTimeField(null=True),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='gender',
            field=models.CharField(choices=[('male', 'male'), ('female', 'female'), ('none', 'no mention')], default='none', max_length=10, null=True),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='mobile',
            field=models.CharField(max_length=12, null=True),
        ),
    ]
