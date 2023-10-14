from django.db import models
from destination.models import City
from django.core.validators import MaxValueValidator, MinValueValidator
from user.models import UserOrganization
from google.cloud import storage

# from phonenumber_field.modelfields import PhoneNumberField


class Hotel(models.Model):
    user = models.ForeignKey(
        UserOrganization, related_name="user_hotel", on_delete=models.CASCADE, null=True
    )
    title = models.CharField(max_length=120)
    description = models.CharField(max_length=300)
    contact = models.CharField(max_length=12)
    imageUrl = models.ImageField(upload_to="hotel_images/")
    address = models.CharField(max_length=150)
    city = models.ForeignKey(City, on_delete=models.CASCADE)

    def __str__(self):
        return self.title

    def delete(self, *args, **kwargs):
        if self.imageUrl:
            client = storage.Client()
            bucket = client.bucket("travelsipapp")
            blob = bucket.blob(self.imageUrl.name)
            blob.delete()
        super(Hotel, self).delete(*args, **kwargs)


class Room(models.Model):
    name = models.CharField(max_length=70)
    person = models.PositiveIntegerField(
        default=1, validators=[MinValueValidator(1), MaxValueValidator(10)]
    )
    bed = models.PositiveIntegerField(
        default=1, validators=[MinValueValidator(1), MaxValueValidator(10)]
    )
    price = models.DecimalField(decimal_places=2, max_digits=9)
    hotel = models.ForeignKey(Hotel, related_name="rooms", on_delete=models.CASCADE)
    imageUrl = models.ImageField(upload_to="room_images/", null=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["price"]


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
    room = models.ForeignKey(Room, on_delete=models.CASCADE, related_name="facilities")
