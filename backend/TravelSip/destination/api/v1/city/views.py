from rest_framework.viewsets import GenericViewSet
from google.cloud import storage
from rest_framework.mixins import (
    CreateModelMixin,
    ListModelMixin,
    RetrieveModelMixin,
    DestroyModelMixin,
    UpdateModelMixin,
)
from ....models import City
from .serializers import (
    CitySerializer,
    CityCreateSerializer,
)
from rest_framework.response import Response


class CityView(
    CreateModelMixin,
    ListModelMixin,
    RetrieveModelMixin,
    DestroyModelMixin,
    UpdateModelMixin,
    GenericViewSet,
):
    queryset = City.objects.all()
    serializer_class = CitySerializer

    def get_serializer_class(self):
        if self.action == "create":
            return CityCreateSerializer
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

    def destroy(self, request, *args, **kwargs):
        obj = self.get_object()
        images = obj.destination_set.filter(imageUrl__isnull=False)
        hotels = obj.hotel_set.filter(imageUrl__isnull=False)
        client = storage.Client()
        bucket = client.bucket("travelsipapp")
        for image in images:
            if image.imageUrl:
                blob = bucket.blob(image.imageUrl.name)
                blob.delete()
        for hotel in hotels:
            if hotel.imageUrl:
                blob = bucket.blob(hotel.imageUrl.name)
                blob.delete()

        obj.destination_set.all().delete()
        obj.hotel_set.all().delete()
        return super().destroy(request, *args, **kwargs)
