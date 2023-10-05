from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api.v1.views import BookingView

router = DefaultRouter()
router.register(r"bookings", BookingView, basename="booking")


urlpatterns = [
    path("v1/", include(router.urls)),
]
