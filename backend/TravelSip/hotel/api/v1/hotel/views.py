from rest_framework.viewsets import GenericViewSet
from google.cloud import storage
from rest_framework.mixins import (
    CreateModelMixin,
    ListModelMixin,
    RetrieveModelMixin,
    DestroyModelMixin,
    UpdateModelMixin,
)
from ....models import Hotel
from .serializers import (
    HotelSerializer,
    HotelCreateSerializer,
    HotelDetailSerializer,
    HotelUpdateSerializer,
)
from rest_framework.response import Response
from user.models import UserOrganization
from authentication.permissions.owner import IsOwnerHotelOrReadOnly
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q


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
    permission_classes = [IsOwnerHotelOrReadOnly]

    def get_serializer_class(self):
        if self.action == "create":
            return HotelCreateSerializer

        if self.action == "update":
            return HotelUpdateSerializer

        if self.action == "retrieve":
            return HotelDetailSerializer
        return super().get_serializer_class()

    def get_permissions(self):
        if (
            self.action == "create"
            or self.action == "update"
            or self.action == "destroy"
        ):
            return [IsAuthenticated(), IsOwnerHotelOrReadOnly()]
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

    def perform_create(self, serializer):
        serializer.save(user=self.request.user.organization)

    def create(self, request, *args, **kwargs):
        user_request = request.user
        or_group = request.user.organization.id
        serializer = self.get_serializer(data=request.data)
        owner = UserOrganization.objects.filter(
            Q(user=user_request.id) & Q(id=or_group)
        )
        if owner.exists() & serializer.is_valid():
            owner_obj = owner.first()
            if owner_obj.is_verified:
                self.perform_create(serializer)
                qs = self.queryset
                serializer_data = self.serializer_class(qs, many=True).data
                return Response(serializer_data)
            else:
                return Response(
                    {
                        "message": "Your organization account is not verified, please contact to support center of TravelSip to activate your Organization account!"
                    },
                    status=403,
                )
        else:
            return Response(
                {"message": "You are not the owner of this organization"}, status=403
            )

    def destroy(self, request, *args, **kwargs):
        obj = self.get_object()
        if obj.imageUrl:
            client = storage.Client()
            bucket = client.bucket("travelsipapp")
            blob = bucket.blob(obj.imageUrl.name)
            blob.delete()
        super().destroy(request, *args, **kwargs)
        return Response({"message": "Deleted successfully!"}, status=200)

    def update(self, request, *args, **kwargs):
        kwargs["partial"] = True
        return super().update(request, *args, **kwargs)
