from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api.v1.hotel.views import HotelView, RoomView, FacilityView

router = DefaultRouter()
router.register(r"hotels", HotelView, basename="hotel")
router.register(r"rooms", RoomView, basename="room")
router.register(r"facilities", FacilityView, basename="facility")


urlpatterns = [
    path("v1/", include(router.urls)),
]
