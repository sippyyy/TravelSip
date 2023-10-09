from rest_framework import serializers
from ....models import DestinationReview
from user.api.v1.user_profile.serializers import UserProfileBasicSerializer


class DestinationReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = DestinationReview
        fields = "__all__"


class DestinationDetailReviewSerializer(serializers.ModelSerializer):
    user = UserProfileBasicSerializer(read_only=True)

    class Meta:
        model = DestinationReview
        fields = "__all__"
