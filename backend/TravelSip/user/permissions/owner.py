from rest_framework import permissions
from rest_framework.exceptions import PermissionDenied


class IsOwnerOrganization(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        if request.user == obj.user:
            return True
        raise PermissionDenied("Only the owner of this organization can do this action.")