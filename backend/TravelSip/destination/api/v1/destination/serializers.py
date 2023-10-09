from rest_framework import serializers
from ....models import Destination
import googlemaps
from django.conf import settings
from review.api.v1.destination_review.serializers import DestinationReviewSerializer
from ..city.serializers import CitySerializer


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
        if total > 0:
            return total / reviews_length
        return 0


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
