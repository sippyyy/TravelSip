from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import (
    CreateModelMixin,
    ListModelMixin,
    RetrieveModelMixin,
    DestroyModelMixin,
    UpdateModelMixin,
)
from ...models import Hotel, Room, Facility
from .serializers import (
    HotelSerializer,
    HotelCreateSerializer,
    RoomSerializer,
    RoomDetailsSerializer,
    HotelDetailSerializer,
    FacilitySerializer,
)
from rest_framework.response import Response


class HotelView(
    CreateModelMixin,
    ListModelMixin,
    RetrieveModelMixin,
    DestroyModelMixin,
    UpdateModelMixin,
    GenericViewSet,
):
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer

    def get_serializer_class(self):
        if self.action == "create":
            return HotelCreateSerializer

        if self.action == "retrieve":
            return HotelDetailSerializer
        return super().get_serializer_class()

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


class RoomView(
    CreateModelMixin,
    ListModelMixin,
    RetrieveModelMixin,
    DestroyModelMixin,
    UpdateModelMixin,
    GenericViewSet,
):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

    def get_serializer_class(self):
        if self.action == "retrieve":
            return RoomDetailsSerializer
        return super().get_serializer_class()

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


class FacilityView(
    CreateModelMixin,
    ListModelMixin,
    RetrieveModelMixin,
    DestroyModelMixin,
    UpdateModelMixin,
    GenericViewSet,
):
    queryset = Facility.objects.all()
    serializer_class = FacilitySerializer

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
