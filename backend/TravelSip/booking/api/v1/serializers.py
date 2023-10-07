from rest_framework import serializers
from ...models import Booking
from hotel.api.v1.room.serializers import RoomDetailsSerializer


class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = "__all__"


class BookingClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        exclude = ["status"]


class BookingApproveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ["status"]


class BookingDetailSerializer(serializers.ModelSerializer):
    room = RoomDetailsSerializer()
    booking_duration = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Booking
        fields = "__all__"

    def get_booking_duration(self, obj):
        return (obj.check_out - obj.check_in).days
