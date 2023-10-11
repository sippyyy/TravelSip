from rest_framework import serializers
from ...models import Region, Country
from destination.models import Destination
from destination.api.v1.city.serializers import CitySerializer
from review.api.v1.destination_review.serializers import DestinationReviewSerializer


class RegionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Region
        fields = "__all__"

# <------------ IN SENSITIVE CASE(CHANGE ASAP) ------------------>
# ---------------(CIRCULAR IMPORT ERROR)---------------------->
class DestinationSerializer(serializers.ModelSerializer):
    rating = serializers.SerializerMethodField(read_only=True)
    city = CitySerializer()
    review = serializers.SerializerMethodField(read_only=True)
    location = serializers.CharField(source="address")

    class Meta:
        model = Destination
        fields = ["id", "title", "imageUrl", "city", "rating", "review", "location"]

    def get_rating(self, obj):
        all_reviews = DestinationReviewSerializer(obj.reviews, many=True).data
        reviews_length = len(all_reviews)
        total = 0
        for review in all_reviews:
            total += review.get("rating")
        if total > 0:
            return total / reviews_length
        return 0

    def get_review(self, obj):
        return obj.reviews.count()
    
# <------------ IN SENSITIVE CASE(CHANGE ASAP) ------------------>
#---------------------END---------------------------------------


class CountrySerializer(serializers.ModelSerializer):
    country = serializers.SerializerMethodField(read_only=True)
    region = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Country
        fields = ["id", "country", "description", "imageUrl", "region"]

    def get_country(self, obj):
        return obj.name

    def get_region(self, obj):
        return obj.region.name


class CountryDetailsSerializer(serializers.ModelSerializer):
    country = serializers.SerializerMethodField(read_only=True)
    region = serializers.SerializerMethodField(read_only=True)
    popular = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Country
        fields = ["id", "country", "description", "imageUrl", "region", "popular"]

    def get_country(self, obj):
        return obj.name

    def get_region(self, obj):
        return obj.region.name
    
    def get_popular(self, obj):
        qs = Destination.objects.filter(city__country=obj.id)
        serialized_data = DestinationSerializer(qs, many=True)
        return serialized_data.data


class CountryCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = "__all__"
