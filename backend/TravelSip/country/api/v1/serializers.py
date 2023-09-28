from rest_framework import serializers
from ...models import Region, Country


class RegionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Region
        fields = "__all__"


class CountrySerializer(serializers.ModelSerializer):
    country = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Country
        fields = ["id", "country", "description", "imageUrl", "region"]

    def get_country(self, obj):
        return obj.name
