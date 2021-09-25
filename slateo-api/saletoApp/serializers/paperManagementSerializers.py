from rest_framework import serializers

# Custom Imports
from ..models.papermanagementModel import *

class PaperManagementSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaperManagement
        fields = '__all__'

class GETPaperManagementSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaperManagement
        fields = '__all__'
        depth = 1







  