from rest_framework import serializers
from hotel.models import Room
from ..facility.serializers import FacilitySerializer, FacilityIdSerializer


class RoomSerializer(serializers.ModelSerializer):
    facilities = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Room
        fields = "__all__"

    def get_facilities(self, obj):
        data_serializer = FacilityIdSerializer(obj.facilities, many=True).data
        if len(data_serializer) > 0:
            return data_serializer[0].get("id")
        return ""


class RoomUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        exclude = ["hotel"]


class RoomDetailsSerializer(serializers.ModelSerializer):
    facilities = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Room
        fields = "__all__"

    def get_facilities(self, obj):
        data_serializer = FacilitySerializer(obj.facilities, many=True).data
        return data_serializer
