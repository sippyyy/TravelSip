from rest_framework import serializers
from ....models import City
from country.api.v1.serializers import CountrySerializer


class CitySerializer(serializers.ModelSerializer):
    country_name = serializers.SerializerMethodField(read_only=True)
    country_id = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = City
        fields = ["id", "name", "country_name", "country_id"]

    def get_country_name(self, obj):
        serializer_data = CountrySerializer(obj.country).data
        return serializer_data["country"]

    def get_country_id(self, obj):
        return obj.country.id


class CityCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = "__all__"
