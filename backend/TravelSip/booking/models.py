from django.db import models
from hotel.models import Room
from user.models import UserProfile
from django.utils import timezone


class Booking(models.Model):
    STATUS_CHOICES = (
        ("pending", "Pending Approval"),
        ("approved", "Approved"),
        ("rejected", "Rejected"),
    )
    user = models.ForeignKey(
        UserProfile, related_name="bookings", on_delete=models.CASCADE
    )
    room = models.ForeignKey(Room, related_name="reserved", on_delete=models.CASCADE)
    check_in = models.DateField()
    check_out = models.DateField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default="pending")

    def __str__(self):
        return str(self.id)

    def update_status(self):
        current_date = timezone.now().date()
        if current_date > self.check_in:
            if self.status == "approved":
                self.status = "completed"
            elif self.status == "pending":
                self.status = "expired"
            self.save()
