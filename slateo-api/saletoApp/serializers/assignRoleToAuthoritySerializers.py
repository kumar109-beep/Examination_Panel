from rest_framework import serializers

# Custom Imports
from ..models.authorityManagementModel import *
from .rolesManagementSerializers import *
from .authorityManagementSerializers import *



class AssignRolesToAuthoritySerializer(serializers.ModelSerializer):
    resource = AuthorManagementSerializer(many=True, read_only=True)
    roles = RolesManagementSerializer(many=True, read_only=True)
    class Meta:
        model = Role_Assign_Authority
        fields = '__all__'



# Notes ###
# -->>  extra_kwargs = {'authors': {'required': False}}
# -->>  ordering = ['-id']
