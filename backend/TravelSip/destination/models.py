from django.db import models
from country.models import Country


class City(models.Model):
    name = models.CharField(unique=True, max_length=100)
    country = models.ForeignKey(Country, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Destination(models.Model):
    title = models.CharField(max_length=150, unique=True)
    description = models.TextField(max_length=500)
    city = models.ForeignKey(City, null=True, on_delete=models.CASCADE)
    imageUrl = models.ImageField(upload_to="destination_images/", null=True)
    address = models.CharField(max_length=150)
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    edited_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
