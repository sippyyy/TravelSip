from rest_framework import serializers
from hotel.models import Facility


class FacilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Facility
        fields = "__all__"


class FacilityIdSerializer(serializers.ModelSerializer):
    class Meta:
        model = Facility
        fields = ["id"]
