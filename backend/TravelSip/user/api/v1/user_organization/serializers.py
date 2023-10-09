from rest_framework import serializers
from ....models import UserOrganization


class UserOrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserOrganization
        fields = "__all__"


class UserOrganizationRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserOrganization
        exclude = ["is_verified"]
