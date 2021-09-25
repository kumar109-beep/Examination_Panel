from rest_framework import serializers

# Custom Imports
from ..models.examManagementModel import *

from .courseManagementSerializers import *
from .paperManagementSerializers import *

class ExamManagementSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExamManagement
        fields = '__all__'

class GETExamManagementSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExamManagement
        fields = '__all__'
        depth = 1


class GETExamPaperSerializer(serializers.ModelSerializer):
    class Meta:
        model = Eaxm_Paper
        fields = '__all__'
        depth = 1
