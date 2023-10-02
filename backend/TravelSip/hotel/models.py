from django.db import models
from destination.models import City

# from phonenumber_field.modelfields import PhoneNumberField


class Hotel(models.Model):
    title = models.CharField(max_length=120)
    description = models.CharField(max_length=300)
    contact = models.CharField(max_length=12)
    imageUrl = models.ImageField(upload_to="hotel_images/")
    address = models.CharField(max_length=150)
    city = models.ForeignKey(City, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.title


class Room(models.Model):
    name = models.CharField(max_length=70)
    person = models.IntegerField(min=1)
    price = models.DecimalField(max_digits=2)
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.title


class Facility(models.Model):
    air_conditioner = models.BooleanField(default=False)
    wifi = models.BooleanField(default=False)
    balcony = models.BooleanField(default=False)
    window = models.BooleanField(default=False)
    private_bathroom = models.BooleanField(default=False)
    breakfast = models.BooleanField(default=False)
    view = models.BooleanField(default=False)
    laundry = models.BooleanField(default=False)
    cleaning_room = models.BooleanField(default=False)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
