from rest_framework import permissions
from rest_framework.exceptions import PermissionDenied

class IsOwnerHotelOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        if request.user.username == obj.user.user.username:
            return True

        # If the permission check fails, raise a PermissionDenied exception
        raise PermissionDenied("You do not have permission to perform this action.")
