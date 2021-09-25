from rest_framework import serializers

# Custom Imports
from ..models.resultManagementModel import *
from ..models.examManagementModel import *


class GET_ResourceManagement(serializers.ModelSerializer):
    class Meta:
        model = ResourceManagement
        fields = '__all__'
        depth = 1



class GET_Eaxm_PaperSerializer(serializers.ModelSerializer):
    class Meta:
        model = Eaxm_Paper
        fields = '__all__'
        depth = 2


class Eaxm_PaperSerializer(serializers.ModelSerializer):
    class Meta:
        model = Eaxm_Paper
        fields = '__all__'



class GetAssignEvaluatorSerializer(serializers.ModelSerializer):
    class Meta:
        model = AssignEvaluator
        fields = '__all__'
        depth = 1

class AssignEvaluatorSerializer(serializers.ModelSerializer):
    class Meta:
        model = AssignEvaluator
        fields = '__all__'
