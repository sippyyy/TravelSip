# Generated by Django 4.2.6 on 2023-10-10 08:56

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0003_alter_userorganization_user_alter_userprofile_user'),
        ('destination', '0003_destination_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='destination',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='user_destination', to='user.userorganization'),
        ),
    ]
