from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from hotel.models import Hotel
from destination.models import Destination
from user.models import UserProfile


# Create your models here.
class HotelReview(models.Model):
    review = models.CharField(max_length=200)
    rating = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)],
    )
    hotel = models.ForeignKey(Hotel, related_name="reviews", on_delete=models.CASCADE)
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)


class DestinationReview(models.Model):
    review = models.CharField(max_length=200)
    rating = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)],
    )
    destination = models.ForeignKey(
        Destination, related_name="reviews", on_delete=models.CASCADE
    )
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
