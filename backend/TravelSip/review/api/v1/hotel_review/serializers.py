from rest_framework import serializers
from ....models import HotelReview
from user.api.v1.user_profile.serializers import UserProfileBasicSerializer


class HotelReviewSerializer(serializers.ModelSerializer):
    user = UserProfileBasicSerializer(read_only=True)

    class Meta:
        model = HotelReview
        fields = "__all__"


class HotelReviewCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = HotelReview
        exclude = ["user"]


class HotelReviewDetailSerializer(serializers.ModelSerializer):
    user = UserProfileBasicSerializer(read_only=True)

    class Meta:
        model = HotelReview
        fields = "__all__"
