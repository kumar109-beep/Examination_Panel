from rest_framework import serializers

# Custom Imports
from ..models.groupbatchmanagementModel import *



class GrouptManagementSerializer(serializers.ModelSerializer):
    class Meta:
        model = GroupBatchtManagement
        fields = '__all__'



# Notes ###
# -->>  extra_kwargs = {'authors': {'required': False}}
# -->>  ordering = ['-id']
