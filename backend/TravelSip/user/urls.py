from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api.v1.views import UserProfileView, UserView

route = DefaultRouter()
route.register("user_profiles", UserProfileView, basename="user_profile")
route.register("register", UserView, basename="register")

urlpatterns = [path("v1/", include(route.urls))]
