from rest_framework import serializers
from ....models import Hotel
from destination.api.v1.destination.serializers import CitySerializer
import googlemaps
from django.conf import settings
from review.api.v1.hotel_review.serializers import HotelReviewSerializer
from ..room.serializers import RoomSerializer


class HotelCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hotel
        exclude = ["user"]


class HotelUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hotel
        exclude = ["user", "city"]


class HotelSerializer(serializers.ModelSerializer):
    location = serializers.SerializerMethodField(read_only=True)
    rating = serializers.SerializerMethodField(read_only=True)
    reviews = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Hotel
        fields = ["id", "title", "imageUrl", "location", "rating", "reviews"]

    def get_location(self, obj):
        return obj.address

    def get_rating(self, obj):
        all_reviews = HotelReviewSerializer(obj.reviews, many=True).data
        ratings = [review.get("rating", 0) for review in all_reviews]
        total = sum(ratings)
        if total > 0:
            return total / len(all_reviews)
        return 0

    def get_reviews(self, obj):
        return obj.reviews.count()


class HotelDetailSerializer(serializers.ModelSerializer):
    country_id = serializers.SerializerMethodField(read_only=True)
    location = serializers.SerializerMethodField(read_only=True)
    rooms = serializers.SerializerMethodField(read_only=True)
    reviews = HotelReviewSerializer(many=True, read_only=True)
    review = serializers.SerializerMethodField(read_only=True)
    price = serializers.SerializerMethodField(read_only=True)
    rating = serializers.SerializerMethodField(read_only=True)
    # coordinates = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Hotel
        fields = [
            "user",
            "id",
            "title",
            "imageUrl",
            "country_id",
            "location",
            "rooms",
            "description",
            "reviews",
            "review",
            "price",
            "rating",
            "contact"
            # "coordinates",
        ]

    def get_country_id(self, obj):
        data_serializer = CitySerializer(obj.city).data
        return data_serializer["id"]

    def get_location(self, obj):
        return obj.address

    def get_rooms(self, obj):
        serializer_data = RoomSerializer(obj.rooms, many=True).data
        return serializer_data

    def get_review(self, obj):
        return obj.reviews.count()

    def get_price(self, obj):
        first_room = obj.rooms.first()
        serialized_data = RoomSerializer(first_room).data
        return serialized_data.get("price")

    def get_rating(self, obj):
        all_reviews = HotelReviewSerializer(obj.reviews, many=True).data
        ratings = [review.get("rating", 0) for review in all_reviews]
        total = sum(ratings)
        if total > 0:
            return total / len(all_reviews)
        return 0

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
    #         # Handle the exception, log it, and return a default value or an error message.
    #         return {"error": "Unable to fetch coordinates", "detail": str(e)}
