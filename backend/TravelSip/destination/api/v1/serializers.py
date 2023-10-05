from rest_framework import serializers
from ...models import Destination, City
import googlemaps
from django.conf import settings
from country.api.v1.serializers import CountrySerializer


class CitySerializer(serializers.ModelSerializer):
    country_name = serializers.SerializerMethodField(read_only=True)
    country_id = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = City
        fields = ["id", "name", "country_name", "country_id"]

    def get_country_name(self, obj):
        serializer_data = CountrySerializer(obj.country).data
        return serializer_data['country']

    def get_country_id(self, obj):
        return obj.country.id


class CityCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = "__all__"


class DestinationSerializer(serializers.ModelSerializer):
    city = CitySerializer()

    class Meta:
        model = Destination
        fields = ["id", "title", "imageUrl", "city"]


class DestinationCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Destination
        fields = "__all__"


class DestinationDetailsSerializer(serializers.ModelSerializer):
    # coordinates = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Destination
        fields = [
            "title",
            "description",
            "city",
            "imageUrl",
            "address",
            "created_at",
            "edited_at",
            # "coordinates",
        ]

    # def get_coordinates(self, obj):
    #     map_api_key = settings.GOOGLE_API_KEY
    #     location = f"{obj.address}, {obj.city}, {obj.city.country}"
    #     gmaps = googlemaps.Client(map_api_key)
    #     loca_detail = gmaps.geocode(location)[0]
    #     location_longlat = loca_detail["geometry"]["location"]
    #     return {
    #         "longtitude": location_longlat["lng"],
    #         "latitude": location_longlat["lat"],
    #     }
