from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import HotelView

router = DefaultRouter()
router.register(r"hotels", HotelView, basename="hotel")
urlpatterns = [
    path("v1/", include(router.urls)),
]
