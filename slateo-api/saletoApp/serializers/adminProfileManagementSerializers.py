from rest_framework import serializers

# Custom Imports
from ..models.adminProfileManagementModel import *
from .credentialSerializers import *



class AdminProfileManagementSerializer(serializers.ModelSerializer):
    roles = UserSerializer(many=True, read_only=True)
    class Meta:
        model = Profile
        fields = '__all__'

class GETAdminProfileManagementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'
        depth = 1



# Notes ###
# -->>  extra_kwargs = {'authors': {'required': False}}
# -->>  ordering = ['-id']
