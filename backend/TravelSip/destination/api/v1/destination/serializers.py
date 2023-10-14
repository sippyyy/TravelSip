from rest_framework import serializers
from ....models import Destination
from hotel.models import Hotel
import googlemaps
from django.conf import settings
from review.api.v1.destination_review.serializers import DestinationReviewSerializer
from ..city.serializers import CitySerializer
from hotel.api.v1.hotel.serializers import HotelSerializer


class DestinationSerializer(serializers.ModelSerializer):
    rating = serializers.SerializerMethodField(read_only=True)
    city = CitySerializer()
    reviews = serializers.SerializerMethodField(read_only=True)
    location = serializers.CharField(source="address")

    class Meta:
        model = Destination
        fields = ["id", "title", "imageUrl", "city", "rating", "reviews", "location"]

    def get_rating(self, obj):
        all_reviews = DestinationReviewSerializer(obj.reviews, many=True).data
        reviews_length = len(all_reviews)
        total = 0
        for review in all_reviews:
            total += review.get("rating")
        if total > 0:
            return total / reviews_length
        return 0

    def get_reviews(self, obj):
        return obj.reviews.count()


class DestinationCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Destination
        fields = "__all__"


class DestinationDetailsSerializer(serializers.ModelSerializer):
    reviews = DestinationReviewSerializer(many=True, read_only=True)
    # coordinates = serializers.SerializerMethodField(read_only=True)
    popular = serializers.SerializerMethodField(read_only=True)

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
            "reviews",
            # "coordinates",
            "popular",
        ]

    # def get_coordinates(self, obj):
    #     location = f"{obj.address}, {obj.city}, {obj.city.country}"
    #     google_api_key = settings.GOOGLE_API_KEY
    #     gmaps = googlemaps.Client(google_api_key)

    #     try:
    #         loca_detail = gmaps.geocode(location)[0]
    #         location_longlat = loca_detail["geometry"]["location"]
    #         return {
    #             "longitude": location_longlat["lng"],
    #             "latitude": location_longlat["lat"],
    #         }
    #     except Exception as e:
    #         return {"error": "Unable to fetch coordinates", "detail": str(e)}

    def get_popular(self, obj):
        qs = Hotel.objects.filter(city=obj.city)
        serialized_data = HotelSerializer(qs, many=True).data
        return serialized_data
