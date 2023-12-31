from rest_framework.viewsets import GenericViewSet
from google.cloud import storage
from rest_framework.mixins import (
    CreateModelMixin,
    ListModelMixin,
    RetrieveModelMixin,
    DestroyModelMixin,
    UpdateModelMixin,
)
from ....models import Destination
from .serializers import (
    DestinationSerializer,
    DestinationCreateSerializer,
    DestinationDetailsSerializer,
    UpdateDestinationSerializer,
)

from user.models import UserOrganization

from rest_framework.response import Response
from authentication.permissions.owner import IsOwnerHotelOrReadOnly
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q


class DestinationView(
    CreateModelMixin,
    ListModelMixin,
    RetrieveModelMixin,
    DestroyModelMixin,
    UpdateModelMixin,
    GenericViewSet,
):
    queryset = Destination.objects.all()
    serializer_class = DestinationSerializer
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
        if self.action == "create":
            return DestinationCreateSerializer

        if self.action == "retrieve":
            return DestinationDetailsSerializer
        if self.action == "update":
            return UpdateDestinationSerializer
        return super().get_serializer_class()

    def retrieve(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            data = self.get_serializer(instance).data
            return Response(data)
        except Exception as er:
            return Response({"Error": str(er)})

    def list(self, request, *args, **kwargs):
        my_accommodations = request.query_params.get("my_destinations")
        if my_accommodations:
            user = request.user.id
            obj = self.queryset.filter(user__user_id=user).all()
            serialized_data = self.get_serializer(obj, many=True).data
            return Response(serialized_data, status=200)
        return super().list(request, *args, **kwargs)

    def perform_create(self, serializer):
        return serializer.save(user=self.request.user.organization)

    def create(self, request, *args, **kwargs):
        user_request = request.user
        or_group = request.user.organization.id
        owner = UserOrganization.objects.filter(
            Q(user_id=user_request) & Q(id=or_group)
        )
        serializer = self.get_serializer(data=request.data)
        if owner.exists():
            if serializer.is_valid():
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
            return Response(serializer.errors, status=400)
        else:
            return Response(
                {"message": "You are not the owner of this organization"}, status=403
            )

    def update(self, request, *args, **kwargs):
        kwargs["partial"] = True
        return super().update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        obj = self.get_object()
        if obj.imageUrl:
            client = storage.Client()
            bucket = client.bucket("travelsipapp")
            blob = bucket.blob(obj.imageUrl.name)
            blob.delete()
        super().destroy(request, *args, **kwargs)
        return Response({"message": "Deleted successfully!"}, status=200)
