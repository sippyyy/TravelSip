from rest_framework import permissions
from rest_framework.exceptions import PermissionDenied


class IsRoomHotelOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        hotel_owner = obj.hotel.user
        if request.user.organization == hotel_owner:
            return True
        raise PermissionDenied("Only the owner of this hotel can do this action.")
