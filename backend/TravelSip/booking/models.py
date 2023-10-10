from django.db import models
from hotel.models import Room
from user.models import UserProfile


class Booking(models.Model):
    STATUS_CHOICES = (
        ("pending", "Pending Approval"),
        ("approved", "Approved"),
        ("rejected", "Rejected"),
    )
    user = models.ForeignKey(UserProfile, related_name="bookings", on_delete=models.CASCADE)
    room = models.ForeignKey(Room, related_name="reserved", on_delete=models.CASCADE)
    check_in = models.DateField()
    check_out = models.DateField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default="pending")

    def __str__(self):
        return str(self.id)
