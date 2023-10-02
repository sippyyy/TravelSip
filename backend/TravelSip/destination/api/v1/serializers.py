from rest_framework import serializers
from ...models import Destination
import googlemaps
from django.conf import settings


class DestinationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Destination
        fields = ["id", "title", "imageUrl", "country"]


class DestinationCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Destination
        fields = "__all__"


class DestinationDetailsSerializer(serializers.ModelSerializer):
    coordinates = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Destination
        fields = [
            "title",
            "description",
            "country",
            "imageUrl",
            "address",
            "created_at",
            "edited_at",
            "coordinates",
        ]

    def get_coordinates(self, obj):
        map_api_key = settings.GOOGLE_API_KEY
        location = f"{obj.address}, {obj.country}"
        gmaps = googlemaps.Client(map_api_key)
        loca_detail = gmaps.geocode(location)[0]
        location_longlat = loca_detail["geometry"]["location"]
        return {
            "longtitude": location_longlat["lng"],
            "latitude": location_longlat["lat"],
        }
