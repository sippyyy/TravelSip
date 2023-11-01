from django.urls import path
from .v1.views import search_view

urlpatterns = [
    path("v1/search/", search_view),
]
