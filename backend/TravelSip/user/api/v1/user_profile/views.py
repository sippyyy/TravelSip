from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import (
    CreateModelMixin,
    ListModelMixin,
    RetrieveModelMixin,
    DestroyModelMixin,
    UpdateModelMixin,
)
from rest_framework.response import Response

from ....models import UserProfile
from .serializers import UserProfileSerializer, UserProfileCreateSerializer


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

    def get_serializer_class(self):
        if self.action == "create" or self.action == "update":
            return UserProfileCreateSerializer
        return super().get_serializer_class()

    def retrieve(self, request, *args, **kwargs):
        try:
            user_id = self.kwargs.get(self.lookup_field)
            instance = self.get_queryset().get(user=user_id)
            data = self.get_serializer(instance).data
            return Response(data)
        except Exception as er:
            return Response({"message": str(er)}, status=404)

    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        super().create(request, *args, **kwargs)
        qs = self.queryset
        serializer_data = self.serializer_class(qs, many=True).data
        return Response(serializer_data)

    def update(self, request, *args, **kwargs):
        kwargs["partial"] = True
        return super().update(request, *args, **kwargs)
