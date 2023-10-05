from django.contrib import admin
from django.urls import path, include
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView


urlpatterns = [
        path("admin/", admin.site.urls),
        path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
        path("api/schema/docs/", SpectacularSwaggerView.as_view(url_name="schema")),
        path("api/", include("country.urls")),
        path("api/", include("destination.urls")),
        path("api/", include("hotel.urls")),
        path("api/", include("booking.urls")),
        path("api/", include("user.urls")),
        path("api/", include("review.urls")),
        
    ]
