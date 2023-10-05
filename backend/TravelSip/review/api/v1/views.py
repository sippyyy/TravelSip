from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import (
    CreateModelMixin,
    DestroyModelMixin,
    UpdateModelMixin,
    RetrieveModelMixin,
    ListModelMixin,
)
from rest_framework.response import Response

from ...models import HotelReview, DestinationReview
from .serializers import HotelReviewSerializer, DestinationReviewSerializer


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
