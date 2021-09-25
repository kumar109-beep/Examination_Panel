
from rest_framework import serializers
from django.contrib.auth.models import User


# Custom Imports
from ..models.languageMangementModel import *


class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = LanguageManagement
        fields = '__all__'
  