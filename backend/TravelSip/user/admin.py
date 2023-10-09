from django.contrib import admin
from .models import UserProfile, UserOrganization

# Register your models here.

admin.site.register(UserProfile)
admin.site.register(UserOrganization)


