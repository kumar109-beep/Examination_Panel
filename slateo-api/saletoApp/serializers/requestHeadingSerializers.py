from rest_framework import serializers

# Custom Imports
from ..models.requestHeadingModel import *



class RequestHeadingSerializer(serializers.ModelSerializer):
    class Meta:
        model = RequestHeading
        fields = '__all__'