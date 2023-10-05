from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    imageUrl = models.ImageField(upload_to="user_images/")
    bio = models.CharField(max_length=120)
    nickname = models.CharField(max_length=20)
