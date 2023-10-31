from rest_framework import serializers
from ...models import Booking
from hotel.api.v1.room.serializers import RoomDetailsSerializer
from hotel.api.v1.hotel.serializers import HotelSerializer


class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = "__all__"


class BookingClientSerializer(serializers.ModelSerializer):
    booking_duration = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Booking
        exclude = ["status", "user"]

    def get_booking_duration(self, obj):
        return (obj.check_out - obj.check_in).days


class BookingApproveSerializer(serializers.ModelSerializer):
    status = serializers.ChoiceField(choices=Booking.STATUS_CHOICES, required=True)
     
    class Meta:
        model = Booking
        fields = ["status"]


class BookingDetailSerializer(serializers.ModelSerializer):
    room = RoomDetailsSerializer()
    booking_duration = serializers.SerializerMethodField(read_only=True)
    client = serializers.CharField(source="user")

    class Meta:
        model = Booking
        exclude = ["user"]

    def get_booking_duration(self, obj):
        return (obj.check_out - obj.check_in).days


class BookingHotelSerializer(serializers.ModelSerializer):
    hotel = serializers.SerializerMethodField(read_only=True)
    room = RoomDetailsSerializer()
    booking_duration = serializers.SerializerMethodField(read_only=True)
    client = serializers.CharField(source="user")

    class Meta:
        model = Booking
        exclude = ["user"]

    def get_booking_duration(self, obj):
        return (obj.check_out - obj.check_in).days

    def get_hotel(self, obj):
        hotel_obj = obj.room.hotel
        hotel_serialized = HotelSerializer(hotel_obj).data
        return hotel_serialized
