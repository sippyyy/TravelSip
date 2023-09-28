from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api.v1.views import RegionView, CountryView

# Create a router
router = DefaultRouter()
router.register(r"regions", RegionView, basename="region")
router.register(r"country", CountryView, basename="country")

urlpatterns = [
    path("", include(router.urls)),
]
