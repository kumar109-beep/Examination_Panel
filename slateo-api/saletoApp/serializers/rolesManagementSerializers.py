from rest_framework import serializers

# Custom Imports
from ..models.rolesMangementModel import *


class RolesManagementSerializer(serializers.ModelSerializer):
    class Meta:
        model = RolesManagement
        fields = '__all__'


class RolesManagementSerializer(serializers.ModelSerializer):
    class Meta:
        model = RolesManagement
        fields = '__all__'
