from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import (
    CreateModelMixin,
    ListModelMixin,
    RetrieveModelMixin,
    DestroyModelMixin,
    UpdateModelMixin,
)
from rest_framework.response import Response

from ...models import UserProfile
from django.contrib.auth.models import User
from .serializers import UserCreateSerializer, UserSerializer, UserProfileSerializer


class UserProfileView(
    CreateModelMixin,
    RetrieveModelMixin,
    DestroyModelMixin,
    UpdateModelMixin,
    ListModelMixin,
    GenericViewSet,
):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

    def retrieve(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            data = self.get_serializer(instance).data
            return Response(data)
        except Exception as er:
            return Response({"Error": str(er)})

    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        super().create(request, *args, **kwargs)
        qs = self.queryset
        serializer_data = self.serializer_class(qs, many=True).data
        return Response(serializer_data)


class UserView(CreateModelMixin, GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserCreateSerializer

    def create(self, request, *args, **kwargs):
        super().create(request, *args, **kwargs)
        qs = self.queryset
        serializer_data = UserSerializer(qs, many=True).data
        return Response(serializer_data)
