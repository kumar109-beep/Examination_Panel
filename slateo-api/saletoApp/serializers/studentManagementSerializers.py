from rest_framework import serializers

# Custom Imports
from ..models.studentManagementModel import *
from .credentialSerializers import *
from .courseManagementSerializers import *

class StudentManagementSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentManagement
        fields = '__all__'

class GETStudentManagementSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentManagement
        fields = '__all__'
        depth = 1




  