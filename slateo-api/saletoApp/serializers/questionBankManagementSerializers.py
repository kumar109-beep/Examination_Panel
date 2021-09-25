from rest_framework import serializers

# Custom Imports
from ..models.questionBankManagementModel import *
from .courseManagementSerializers import *
from .credentialSerializers import *


class QuestionBank_FiltersSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionBank_Filters
        fields = '__all__'


class QuestionBank_QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionBank_Question
        fields = '__all__'

class GetQuestionBank_QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionBank_Question
        fields = '__all__'
        depth = 2


class Questions_TypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Questions_Type
        fields = '__all__'


class Questions_Sub_TypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Questions_Sub_Type
        fields = '__all__'


class Questions_Level_TypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Questions_Level_Type
        fields = '__all__'
