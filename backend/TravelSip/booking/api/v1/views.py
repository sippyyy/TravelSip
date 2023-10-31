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
    BookingHotelSerializer,
)

from authentication.permissions.owner import IsOwnerHotelOrReadOnly
from rest_framework.permissions import IsAuthenticated


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
    permission_classes = [IsAuthenticated, IsOwnerHotelOrReadOnly]

    def get_serializer_class(self):
        if self.action == "retrieve":
            return BookingDetailSerializer
        if self.action == "create" or self.action == "update":
            return BookingClientSerializer
        if self.action == "list":
            return BookingHotelSerializer
        return super().get_serializer_class()

    def retrieve(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            instance.update_status()
            data = self.get_serializer(instance).data
            return Response(data)
        except Exception as er:
            return Response({"Error": str(er)})

    def list(self, request, *args, **kwargs):
        my_booking_list = request.query_params.get("my_booking")
        user_request = request.user.profile.id
        my_booking_request = request.query_params.get("my_booking_request")
        bookings = self.get_queryset()
        for booking in bookings:
            booking.update_status()
        if my_booking_list:
            qs = Booking.objects.filter(user=user_request).all()
            serialized_data = self.get_serializer(qs, many=True).data
            return Response(serialized_data, status=200)
        if my_booking_request:
            qs = (
                self.get_queryset()
                .filter(room__hotel__user=request.user.organization)
                .all()
            )
            serialized_data = self.get_serializer(qs, many=True).data
            return Response(serialized_data, status=200)
        elif request.user.is_staff:
            return super().list(request, *args, **kwargs)
        return Response(status=403)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user.profile)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        start = request.data.get("check_in")
        end = request.data.get("check_out")
        checkin = datetime.strptime(start, "%Y-%m-%d")
        checkout = datetime.strptime(end, "%Y-%m-%d")
        room_id = request.data.get("room")
        room_qs = Booking.objects.filter(
            Q(check_in__lte=checkin, check_out__gte=checkin)
            | Q(check_in__lte=checkout, check_out__gte=checkout),
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
        if serializer.is_valid():
            self.perform_create(serializer)
            response_serializer = BookingDetailSerializer(instance=serializer.instance)
            return Response(response_serializer.data, status=201)

    def destroy(self, request, *args, **kwargs):
        super().destroy(request, *args, **kwargs)
        return Response({"message": "Cancel Booking Successfully!"}, status=200)


class BookingApproveView(UpdateModelMixin, GenericViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingApproveSerializer
    permission_classes = [IsAuthenticated]

    def update(self, request, *args, **kwargs):
        obj = self.get_object()
        start = obj.check_in
        end = obj.check_out
        room_id = obj.room.id
        status = request.data.get("status")
        if status == "approved":
            room_qs = Booking.objects.filter(
                Q(check_in__lte=start, check_out__gte=start)
                | Q(check_in__lte=end, check_out__gte=end),
                room=room_id,
                status="approved",
            )
            if room_qs.exists():
                message = "This room is not available, please check again"
                status = 404
        else:
            if obj.room.hotel.user.user == request.user:
                decision_handler = BookingDecisionHandler()
                option_resp = decision_handler.option_decision_message(
                    request.data.get("status").lower(), obj
                )
                message = option_resp[0]
                status = option_resp[1]
                super().update(request, *args, **kwargs)
            else:
                message = "You are not authorized to approve/reject this booking."
                status = 403
        return Response({"message": message, "status": status}, status=status)


class BookingDecisionHandler:
    def option_decision_message(self, option, obj):
        if option == "approved":
            return [self.approve_message(obj), self.update_status()]
        elif option == "rejected":
            return [self.reject_message(obj), self.update_status()]
        else:
            return [self.invalid_message(), self.invalid_status()]

    def approve_message(self, obj):
        return f"Approved booking ID #{obj.id} successfully"

    def invalid_message(self):
        return "invalid"  # Add an approve status if needed

    def reject_message(self, obj):
        return f"Rejected booking ID #{obj.id} successfully"

    def update_status(self):
        return 200  # Add a reject status if needed

    def reject_status(self):
        return 404

    def invalid_status(self):
        return 403  # Add an invalid status if needed
