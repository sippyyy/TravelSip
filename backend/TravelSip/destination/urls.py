from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api.v1.views import DestinationView, CityView

router = DefaultRouter()
router.register(r"destinations", DestinationView, basename="destination")
router.register(r"city", CityView, basename="city")
urlpatterns = [
    path("v1/", include(router.urls)),
]
