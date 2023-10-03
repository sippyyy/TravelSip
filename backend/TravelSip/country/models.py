from django.db import models
from google.cloud import storage


class Region(models.Model):
    name = models.CharField(unique=True, max_length=100)

    def __str__(self):
        return self.name


class Country(models.Model):
    name = models.CharField(unique=True, max_length=150)
    region = models.ForeignKey(Region, on_delete=models.CASCADE)
    imageUrl = models.ImageField(upload_to="country_images/")
    description = models.CharField(max_length=600, null=True)

    def __str__(self):
        return self.name

    def delete(self, *args, **kwargs):
        if self.imageUrl:
            client = storage.Client()
            bucket = client.bucket("travelsipapp")
            blob = bucket.blob(self.imageUrl.name)
            blob.delete()
        super(Country, self).delete(*args, **kwargs)
