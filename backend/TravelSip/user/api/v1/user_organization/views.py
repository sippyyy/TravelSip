from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import (
    CreateModelMixin,
    ListModelMixin,
    RetrieveModelMixin,
    DestroyModelMixin,
    UpdateModelMixin,
)
from rest_framework.response import Response

from ....models import UserOrganization
from .serializers import (UserOrganizationSerializer, 
                          UserOrganizationRegisterSerializer)
from rest_framework.permissions import IsAuthenticated
from user.permissions.owner import IsOwnerOrganization


class UserOrganizationView(
    CreateModelMixin,
    RetrieveModelMixin,
    DestroyModelMixin,
    UpdateModelMixin,
    ListModelMixin,
    GenericViewSet,
):
    queryset = UserOrganization.objects.all()
    serializer_class = UserOrganizationSerializer

    def get_serializer_class(self):
        if self.action == "create" or self.action == "update":
            return UserOrganizationRegisterSerializer
        return super().get_serializer_class()

    def get_permissions(self):
        if (
            self.action == "create"
            or self.action == "update"
            or self.action == "destroy"
        ):
            return [IsAuthenticated(), IsOwnerOrganization()]
        return super().get_permissions()

    def retrieve(self, request, *args, **kwargs):
        try:
            user_id = self.kwargs.get(self.lookup_field)
            instance = self.get_queryset().get(user=user_id)
            data = self.get_serializer(instance).data
            return Response(data)
        except Exception as er:
            return Response({"Error": str(er)}, status=404)

    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid()
        self.perform_create(serializer)
        qs = self.queryset
        serializer_data = self.serializer_class(qs, many=True).data
        return Response(serializer_data)

    def update(self, request, *args, **kwargs):
        kwargs["partial"] = True
        return super().update(request, *args, **kwargs)
