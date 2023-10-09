from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import (
    CreateModelMixin,
)
from rest_framework.response import Response

from django.contrib.auth.models import User
from .serializers import UserCreateSerializer, UserSerializer


class UserView(CreateModelMixin, GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserCreateSerializer

    def create(self, request, *args, **kwargs):
        super().create(request, *args, **kwargs)
        qs = self.queryset
        serializer_data = UserSerializer(qs, many=True).data
        return Response(serializer_data)
