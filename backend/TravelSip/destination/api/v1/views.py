from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import (
    CreateModelMixin,
    ListModelMixin,
    RetrieveModelMixin,
    DestroyModelMixin,
    UpdateModelMixin,
)
from ...models import Destination
from .serializers import (
    DestinationSerializer,
    DestinationCreateSerializer,
    DestinationDetailsSerializer,
)
from rest_framework.response import Response


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

    def get_serializer_class(self):
        if self.action == "create":
            return DestinationCreateSerializer

        if self.action == "retrieve":
            return DestinationDetailsSerializer
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
        # serializer = DestinationCreateSerializer(data=request.data)
        # serializer.is_valid(raise_exception=True)
        # self.perform_create(serializer)
        # serializer_data = DestinationCreateSerializer(serializer.instance).data
        # return Response(serializer_data)
        super().create(request, *args, **kwargs)
        qs = self.queryset
        serializer_data = self.serializer_class(qs, many=True).data
        return Response(serializer_data)
