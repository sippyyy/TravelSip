from rest_framework import serializers
from hotel.models import Room
from ..facility.serializers import FacilitySerializer


class RoomSerializer(serializers.ModelSerializer):
    facilities = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Room
        fields = "__all__"

    def get_facilities(self, obj):
        return obj.facilities.count()


class RoomDetailsSerializer(serializers.ModelSerializer):
    facilities = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Room
        fields = "__all__"

    def get_facilities(self, obj):
        data_serializer = FacilitySerializer(obj.facilities, many=True).data
        return data_serializer
