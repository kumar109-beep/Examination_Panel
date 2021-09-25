from rest_framework import serializers

# Custom Imports
from ..models.batchmanagementModel import *
from .studentManagementSerializers import *



class BatchtManagementSerializer(serializers.ModelSerializer):
    class Meta:
        model = BatchtManagement
        fields = '__all__'


class GETBatchtManagementSerializer(serializers.ModelSerializer):
    class Meta:
        model = BatchtManagement
        fields = '__all__'
        depth = 1

class GETDepBatchtManagementSerializer(serializers.ModelSerializer):
    class Meta:
        model = BatchtManagement
        fields = '__all__'
        depth = 2


# Notes ###
# -->>  extra_kwargs = {'authors': {'required': False}}
# -->>  ordering = ['-id']
