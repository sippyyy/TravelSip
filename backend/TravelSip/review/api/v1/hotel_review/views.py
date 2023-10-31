from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import (
    CreateModelMixin,
    DestroyModelMixin,
    UpdateModelMixin,
    RetrieveModelMixin,
    ListModelMixin,
)
from rest_framework.response import Response

from ....models import HotelReview
from .serializers import HotelReviewSerializer, HotelReviewCreateSerializer
from authentication.permissions.owner import IsOwnerHotelOrReadOnly
from rest_framework.permissions import IsAuthenticated


class HotelReviewView(
    CreateModelMixin,
    DestroyModelMixin,
    UpdateModelMixin,
    RetrieveModelMixin,
    ListModelMixin,
    GenericViewSet,
):
    queryset = HotelReview.objects.all()
    serializer_class = HotelReviewSerializer
    permission_classes = [IsOwnerHotelOrReadOnly]

    def get_permissions(self):
        if (
            self.action == "create"
            or self.action == "update"
            or self.action == "destroy"
        ):
            return [IsAuthenticated(), IsOwnerHotelOrReadOnly()]
        return super().get_permissions()

    def get_serializer_class(self):
        if self.action == "create" or self.action == "update":
            return HotelReviewCreateSerializer
        return super().get_serializer_class()

    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    def perform_create(self, serializer):
        user_request = self.request.user.profile
        return serializer.save(user=user_request)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            print(request.data)
            self.perform_create(serializer)
            return Response({"message": "review sent"}, status=200)
        return Response({"message": "error!"}, status=400)

    def retrieve(self, request, *args, **kwargs):
        try:
            obj = self.get_object()
            serialize_data = self.get_serializer(obj).data
            return Response(serialize_data)
        except Exception as err:
            return Response({"Error": str(err)})
