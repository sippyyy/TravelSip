from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api.v1.destination.views import DestinationView
from .api.v1.city.views import CityView

router = DefaultRouter()
router.register(r"destinations", DestinationView, basename="destination")
router.register(r"city", CityView, basename="city")
urlpatterns = [
    path("v1/", include(router.urls)),
]
