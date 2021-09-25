from rest_framework import serializers

# Custom Imports
from ..models.authorityManagementModel import *



class AuthorManagementSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuthorityManagement
        fields = '__all__'





class MainAuthoritySerializer(serializers.ModelSerializer):
    class Meta:
        model = MainAuthority
        fields = '__all__'
        # depth = 2


class AuthorityRolesSerializer(serializers.ModelSerializer):
    class Meta:
        model = RolesAlocateAuthority
        fields = '__all__'
        # depth = 3



# Notes ###
# -->>  extra_kwargs = {'authors': {'required': False}}
# -->>  ordering = ['-id']
