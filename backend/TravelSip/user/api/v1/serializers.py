from rest_framework import serializers
from ...models import UserProfile
from django.contrib.auth.models import User


class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "username",
            "password",
            "email",
            "first_name",
            "last_name",
        ]

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "date_joined"]


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
