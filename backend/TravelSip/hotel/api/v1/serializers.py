from rest_framework import serializers
from ...models import Hotel, Room, Facility
from destination.api.v1.serializers import CitySerializer
import googlemaps
from django.conf import settings


class HotelCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hotel
        fields = "__all__"


class HotelSerializer(serializers.ModelSerializer):
    location = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Hotel
        fields = ["id", "title", "imageUrl", "location"]

    def get_location(self, obj):
        return obj.address


class HotelDetailSerializer(serializers.ModelSerializer):
    country_id = serializers.SerializerMethodField(read_only=True)
    location = serializers.SerializerMethodField(read_only=True)
    rooms = serializers.SerializerMethodField(read_only=True)
    coordinates = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Hotel
        fields = [
            "id",
            "title",
            "imageUrl",
            "country_id",
            "location",
            "rooms",
            "description",
            "coordinates",
        ]

    def get_country_id(self, obj):
        data_serializer = CitySerializer(obj.city).data
        return data_serializer["id"]

    def get_location(self, obj):
        return obj.address

    def get_rooms(self, obj):
        serializer_data = RoomSerializer(obj.rooms, many=True).data
        return serializer_data

    def get_coordinates(self, obj):
        location = f"{obj.address}, {obj.city}, {obj.city.country}"
        google_api_key = settings.GOOGLE_API_KEY
        gmaps = googlemaps.Client(google_api_key)
        loca_detail = gmaps.geocode(location)[0]
        location_longlat = loca_detail["geometry"]["location"]
        return {
            "longtitude": location_longlat["lng"],
            "latitude": location_longlat["lat"],
        }


class RoomSerializer(serializers.ModelSerializer):
    facilities = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Room
        fields = "__all__"

    def get_facilities(self, obj):
        return obj.facilities.count()


class FacilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Facility
        fields = "__all__"


class RoomDetailsSerializer(serializers.ModelSerializer):
    facilities = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Room
        fields = "__all__"

    def get_facilities(self, obj):
        data_serializer = FacilitySerializer(obj.facilities, many=True).data
        return data_serializer
