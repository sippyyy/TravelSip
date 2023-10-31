from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class UserProfile(models.Model):
    SEX_CHOICES = (("male", "male"), ("female", "female"), ("none", "no mention"))
    user = models.OneToOneField(User, related_name="profile", on_delete=models.CASCADE)
    imageUrl = models.ImageField(upload_to="user_images/", null=True)
    backgroundUrl = models.ImageField(upload_to="user_background_images/", null=True)
    bio = models.CharField(max_length=120)
    nickname = models.CharField(max_length=20)
    dob = models.DateField(null=True)
    mobile = models.CharField(max_length=12, null=True)
    gender = models.CharField(
        max_length=10, choices=SEX_CHOICES, default="none", null=True
    )

    def __str__(self):
        return self.user.username


class UserOrganization(models.Model):
    user = models.OneToOneField(
        User, related_name="organization", on_delete=models.CASCADE
    )
    imageUrl = models.ImageField(upload_to="user_organization_images/", null=True)
    backgroundUrl = models.ImageField(
        upload_to="user_organization_bgimages/", null=True
    )
    bio = models.CharField(max_length=250, null=True)
    name = models.CharField(max_length=100)
    is_verified = models.BooleanField(default=False)
    email = models.EmailField(null=True)
    phone = models.CharField(max_length=12, null=True)
    tax = models.CharField(max_length=12, null=True)

    def __str__(self):
        return self.name
