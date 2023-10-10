from rest_framework import permissions
from rest_framework.exceptions import PermissionDenied

class IsOwnerHotelOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        if request.user.username == obj.user.user.username:
            return True

        raise PermissionDenied("You do not have permission to perform this action.")

class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        if request.user.username == obj.user.username:
            return True

        raise PermissionDenied("You do not have permission to perform this action.")
    

class IsSuperuserOrReadOnly(permissions.BasePermission):
    """
    Custom permission to allow superusers to have full access,
    while allowing read-only access to other users.
    """

    def has_permission(self, request, view):
        if request.method in ['GET', 'HEAD', 'OPTIONS']:
            return True
        return request.user.is_superuser