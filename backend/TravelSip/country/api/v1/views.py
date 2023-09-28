from rest_framework.viewsets import GenericViewSet
from rest_framework import mixins
from rest_framework.response import Response
from ...models import Region, Country
from .serializers import (
    RegionSerializer,
    CountrySerializer,
)  # Replace with your actual serializer


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

    def retrieve(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            data = self.serializer_class(instance).data
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
