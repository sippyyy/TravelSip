from rest_framework import serializers
from ...models import HotelReview, DestinationReview
from user.api.v1.serializers import UserProfileBasicSerializer


class HotelReviewSerializer(serializers.ModelSerializer):
    user = UserProfileBasicSerializer()

    class Meta:
        model = HotelReview
        fields = "__all__"


class DestinationReviewSerializer(serializers.ModelSerializer):
    user = UserProfileBasicSerializer()

    class Meta:
        model = DestinationReview
        fields = "__all__"
