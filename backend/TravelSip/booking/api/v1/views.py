from rest_framework.viewsets import GenericViewSet
from rest_framework.response import Response
from rest_framework.mixins import (
    CreateModelMixin,
    ListModelMixin,
    RetrieveModelMixin,
    DestroyModelMixin,
    UpdateModelMixin,
)
from django.db.models import Q

from django.utils import timezone
from datetime import datetime

from ...models import Booking
from .serializers import (
    BookingSerializer,
    BookingApproveSerializer,
    BookingClientSerializer,
    BookingDetailSerializer,
)


class BookingView(
    CreateModelMixin,
    ListModelMixin,
    RetrieveModelMixin,
    DestroyModelMixin,
    UpdateModelMixin,
    GenericViewSet,
):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer

    def get_serializer_class(self):
        if self.action == "retrieve":
            return BookingDetailSerializer
        if self.action == "create" or self.action == "update":
            return BookingClientSerializer
        return super().get_serializer_class()

    def retrieve(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            data = self.get_serializer(instance).data
            return Response(data)
        except Exception as er:
            return Response({"Error": str(er)})

    def create(self, request, *args, **kwargs):
        start = request.data.get("check_in")
        end = request.data.get("check_out")
        room_id = request.data.get("room")
        room_qs = Booking.objects.filter(
            Q(check_in__lte=start, check_out__gte=start)
            | Q(check_in__lte=end, check_out__gte=end),
            room=room_id,
            status="approved",
        )

        if room_qs.exists():
            return Response(
                {
                    "message": "Room is not available, please select other days/ room that could match your vacation time"
                },
                status=404,
            )
        start_date = datetime.strptime(start, "%Y-%m-%d").date()

        if start_date < timezone.now().date():
            return Response({"message": "Invalid date"}, status=404)
        super().create(request, *args, **kwargs)
        return Response(status=201)


class BookingApproveView(UpdateModelMixin, GenericViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingApproveSerializer

    def update(self, request, *args, **kwargs):
        obj = self.get_object()
        option = (request.data.get("status")).lower()
        message = ""
        if option == "rejected":
            message = f"Reject booking id #{obj.id} successfully!"
            status = 200
        if option == "approved":
            message = f"Approve booking id #{obj.id} successfully"
            status = 200
        else:
            message = "Invalid action"
            status = 404
        super().update(request, *args, **kwargs)
        return Response({"message": message}, status=status)
