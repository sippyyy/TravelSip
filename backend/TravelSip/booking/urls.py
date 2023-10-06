from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api.v1.views import BookingView, BookingApproveView

router = DefaultRouter()
router.register(r"bookings", BookingView, basename="booking")
router.register(r"booking_approve", BookingApproveView, basename="booking_approve")


urlpatterns = [
    path("v1/", include(router.urls)),
]
