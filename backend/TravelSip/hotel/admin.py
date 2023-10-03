from django.contrib import admin
from .models import Hotel, Room, Facility

# Register your models here.

admin.site.register(Room)
admin.site.register(Hotel)
admin.site.register(Facility)

