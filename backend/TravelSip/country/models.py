from django.db import models


# Create your models here.
from django.db import models


class Region(models.Model):
    name = models.CharField(unique=True, max_length=100)

    def __str__(self):
        return self.name


class Country(models.Model):
    name = models.CharField(unique=True, max_length=150)
    region = models.ForeignKey(Region, on_delete=models.CASCADE)
    imageUrl = models.ImageField(upload_to="country_images/", null=True)
    description = models.TextField(null=True, max_length=600)

    def __str__(self):
        return self.name
