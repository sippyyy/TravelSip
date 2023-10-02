from django.db import models
from country.models import Country


class Destination(models.Model):
    title = models.CharField(max_length=150, unique=True)
    description = models.TextField(max_length=500)
    country = models.ForeignKey(Country, null=True, on_delete=models.CASCADE)
    imageUrl = models.ImageField(upload_to="destination_images/", null=True)
    address = models.CharField(max_length=150)
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    edited_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
