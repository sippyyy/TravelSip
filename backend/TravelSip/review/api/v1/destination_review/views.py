from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import (
    CreateModelMixin,
    DestroyModelMixin,
    UpdateModelMixin,
    RetrieveModelMixin,
    ListModelMixin,
)
from rest_framework.response import Response

from ....models import DestinationReview
from .serializers import DestinationReviewSerializer
from authentication.permissions.owner import IsOwnerHotelOrReadOnly
from rest_framework.permissions import IsAuthenticated


class DestinationReviewView(
    CreateModelMixin,
    DestroyModelMixin,
    UpdateModelMixin,
    RetrieveModelMixin,
    ListModelMixin,
    GenericViewSet,
):
    queryset = DestinationReview.objects.all()
    serializer_class = DestinationReviewSerializer
    permission_classes = [IsOwnerHotelOrReadOnly]

    def get_permissions(self):
        if (
            self.action == "create"
            or self.action == "update"
            or self.action == "destroy"
        ):
            return [IsAuthenticated(), IsOwnerHotelOrReadOnly()]
        return super().get_permissions()

    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    def retrieve(self, request, *args, **kwargs):
        try:
            obj = self.get_object()
            serialize_data = self.get_serializer(obj).data
            return Response(serialize_data)
        except Exception as err:
            return Response({"Error": str(err)})
