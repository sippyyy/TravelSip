from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import (
    CreateModelMixin,
    ListModelMixin,
    RetrieveModelMixin,
    DestroyModelMixin,
    UpdateModelMixin,
)
from ....models import Room
from .serializers import RoomSerializer, RoomDetailsSerializer, RoomUpdateSerializer
from google.cloud import storage
from rest_framework.permissions import IsAuthenticated

from hotel.permissions.room import IsRoomHotelOwner

from rest_framework.response import Response


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
        if self.action == "update":
            return RoomUpdateSerializer
        return super().get_serializer_class()

    def get_permissions(self):
        if (
            self.action == "create"
            or self.action == "update"
            or self.action == "destroy"
        ):
            return [IsAuthenticated(), IsRoomHotelOwner()]
        return super().get_permissions()

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
        return super().create(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        obj = self.get_object()
        if obj.imageUrl:
            client = storage.Client()
            bucket = client.bucket("travelsipapp")
            blob = bucket.blob(obj.imageUrl.name)
            if blob.exists():
                blob.delete()
        super().destroy(request, *args, **kwargs)
        return Response({"message": "Deleted successfully!"}, status=200)

    def update(self, request, *args, **kwargs):
        # id = kwargs.get("pk")
        kwargs["partial"] = True
        # room_qs = self.get_queryset().get(id=id)
        # hotel_owner = room_qs.hotel.user
        # organization_sending = request.user.organization

        # if organization_sending != hotel_owner:
        #     return Response({"message": "You are not allowed"}, status=403)

        super().update(request, *args, **kwargs)
        return Response({"message": "Update room successfully!"}, status=200)
