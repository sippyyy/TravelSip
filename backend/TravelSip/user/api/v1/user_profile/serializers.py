from rest_framework import serializers
from ....models import UserProfile
from ..user.serializers import UserSerializer


class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = UserProfile
        fields = "__all__"


class UserProfileBasicSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = UserProfile
        fields = ["id", "user", "nickname", "imageUrl"]
        