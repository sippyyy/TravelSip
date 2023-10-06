from rest_framework import serializers
from ...models import Destination, City
import googlemaps
from django.conf import settings
from country.api.v1.serializers import CountrySerializer
from review.api.v1.serializers import DestinationReviewSerializer


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


class DestinationSerializer(serializers.ModelSerializer):
    rating = serializers.SerializerMethodField(read_only=True)
    city = CitySerializer()

    class Meta:
        model = Destination
        fields = ["id", "title", "imageUrl", "city", "rating"]

    def get_rating(self, obj):
        all_reviews = DestinationReviewSerializer(obj.reviews, many=True).data
        reviews_length = len(all_reviews)
        total = 0
        for review in all_reviews:
            total += review.get("rating")
        result = total / reviews_length
        return result


class DestinationCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Destination
        fields = "__all__"


class DestinationDetailsSerializer(serializers.ModelSerializer):
    reviews = DestinationReviewSerializer(many=True, read_only=True)

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
            "reviews"
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
