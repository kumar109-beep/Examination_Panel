from rest_framework import serializers
# Custom Imports
from ..models.country_state_districtModel import *

# User Serializer
class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = '__all__'

class StateSerializer(serializers.ModelSerializer):
    class Meta:
        model = State
        fields = '__all__'
        depth = 1