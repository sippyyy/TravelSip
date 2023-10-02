from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api.v1.views import DestinationView

router = DefaultRouter()
router.register(r"destinations", DestinationView, basename="destination")
urlpatterns = [
    path("v1/", include(router.urls)),
]
