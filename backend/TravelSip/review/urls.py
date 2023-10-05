from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api.v1.views import HotelReviewView, DestinationReviewView

route = DefaultRouter()
route.register(r"hotel_reviews", 
               HotelReviewView, 
               basename="hotel_review")
route.register(
    r"destination_reviews", 
    DestinationReviewView, 
    basename="destination_review"
)

urlpatterns = [path("v1/", include(route.urls))]
