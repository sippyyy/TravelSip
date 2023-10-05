from django.db import models
from django.contrib.auth.models import User
from hotel.models import Room


class Booking(models.Model):
    client = models.ForeignKey(User, on_delete=models.CASCADE)
    room = models.ForeignKey(Room, related_name="reserved", on_delete=models.CASCADE)
    check_in = models.DateField()
    check_out = models.DateField()

    def __str__(self):
        return str(self.id)
