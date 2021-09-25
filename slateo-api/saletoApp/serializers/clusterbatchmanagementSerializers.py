from rest_framework import serializers

# Custom Imports
from ..models.clusterbatchmanagementModel import *
from .batchManagementSerializers import *



class ClusterManagementSerializer(serializers.ModelSerializer):
    batch = BatchtManagementSerializer(many=True, read_only=True)
    class Meta:
        model = ClusterBatchtManagement
        fields = '__all__'



# Notes ###
# -->>  extra_kwargs = {'authors': {'required': False}}
# -->>  ordering = ['-id']
