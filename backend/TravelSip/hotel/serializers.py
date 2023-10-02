from rest_framework import serializers
from .models import Hotel, Room, Facility
from destination.api.v1.serializers import CitySerializer


class HotelSerializer(serializers.ModelSerializer):
    country_id = serializers.SerializerMethodField(read_only=True)
    location = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Hotel
        fields = ["id", "title", "imageUrl", "country_id", "location"]

    def get_country_id(self, obj):
        data_serializer = CitySerializer(obj.city).data
        return data_serializer["country_id"]
    
    def get_location(self,obj):
        return self.address
