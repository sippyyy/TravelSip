from rest_framework.viewsets import GenericViewSet
from google.cloud import storage
from rest_framework import mixins
from rest_framework.response import Response
from ...models import Region, Country
from .serializers import (
    RegionSerializer,
    CountrySerializer,
    CountryCreateSerializer,
    CountryDetailsSerializer,
)
from authentication.permissions.owner import IsSuperuserOrReadOnly


class RegionView(
    mixins.RetrieveModelMixin,
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    GenericViewSet,
):
    queryset = Region.objects.all()
    serializer_class = RegionSerializer
    permission_classes = [IsSuperuserOrReadOnly]

    def retrieve(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            data = self.serializer_class(instance).data
            return Response({"region": data})
        except Exception as ex:
            return Response({"Error": str(ex)})

    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        super().create(request, *args, **kwargs)
        qs = Region.objects.all()
        serializer_data = self.serializer_class(qs, many=True).data
        return Response(serializer_data)

    def destroy(self, request, *args, **kwargs):
        obj = self.get_object()
        images = obj.country_set.filter(imageUrl__isnull=False)
        client = storage.Client()
        bucket = client.bucket("travelsipapp")
        for image in images:
            if image.imageUrl:
                blob = bucket.blob(image.imageUrl.name)
                blob.delete()

        obj.country_set.all().delete()

        return super().destroy(request, *args, **kwargs)


class CountryView(
    mixins.RetrieveModelMixin,
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    GenericViewSet,
):
    queryset = Country.objects.all()
    serializer_class = CountrySerializer
    permission_classes = [IsSuperuserOrReadOnly]

    def get_serializer_class(self):
        if self.action == "create":
            return CountryCreateSerializer
        if self.action == "retrieve":
            return CountryDetailsSerializer
        return super().get_serializer_class()

    def retrieve(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            data = CountryDetailsSerializer(instance).data
            return Response(data)
        except Exception as ex:
            return Response({"Error": str(ex)})

    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        super().create(request, *args, **kwargs)
        qs = Country.objects.all()
        serializer_data = self.serializer_class(qs, many=True).data
        return Response(serializer_data)

    def destroy(self, request, *args, **kwargs):
        obj = self.get_object()
        if obj.imageUrl:
            client = storage.Client()
            bucket = client.bucket("travelsipapp")
            blob = bucket.blob(obj.imageUrl.name)
            blob.delete()
        return super().destroy(request, *args, **kwargs)
