from rest_framework import serializers
from ....models import UserOrganization
from hotel.api.v1.hotel.serializers import HotelSerializer
from destination.api.v1.destination.serializers import DestinationSerializer


class UserOrganizationSerializer(serializers.ModelSerializer):
    user_hotel = HotelSerializer(read_only=True, many=True)
    user_destination = DestinationSerializer(read_only=True, many=True)

    class Meta:
        model = UserOrganization
        fields = "__all__"


class UserOrganizationRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserOrganization
        exclude = ["is_verified", "user"]
        
