from rest_framework import serializers
from .rolesManagementSerializers import *

# Custom Imports
from ..models.reourceManagementModel import *
from .credentialSerializers import *


class GetResourceManagementSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResourceManagement
        fields = '__all__'
        depth = 1

class ResourceManagementSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResourceManagement
        fields = '__all__'
