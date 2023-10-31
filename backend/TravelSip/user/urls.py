from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .api.v1.user.views import UserView, UserViewLogin
from .api.v1.user_organization.views import UserOrganizationView
from .api.v1.user_profile.views import UserProfileView

route = DefaultRouter()
route.register("user_profiles", UserProfileView, basename="user_profile")
route.register(
    "user_organizations", UserOrganizationView, basename="user_organizations"
)
route.register("register", UserViewLogin, basename="register")
route.register("user", UserView, basename="register")


urlpatterns = [path("v1/", include(route.urls))]
