from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class UserProfile(models.Model):
    user = models.OneToOneField(User, related_name="profile", on_delete=models.CASCADE)
    imageUrl = models.ImageField(upload_to="user_images/")
    bio = models.CharField(max_length=120)
    nickname = models.CharField(max_length=20)
    
    def __str__(self):
        return self.user.username


class UserOrganization(models.Model):
    user = models.OneToOneField(
        User, related_name="organization", on_delete=models.CASCADE
    )
    imageUrl = models.ImageField(upload_to="user_organization_images/")
    bio = models.CharField(max_length=250)
    name = models.CharField(max_length=100)
    is_verified = models.BooleanField(default=False)

    def __str__(self):
        return self.name
