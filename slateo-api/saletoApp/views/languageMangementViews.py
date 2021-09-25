from django.http import HttpResponse, JsonResponse
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.decorators import api_view,permission_classes,authentication_classes,parser_classes
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from knox.auth import TokenAuthentication
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from django.db import IntegrityError

# Custom Import
from ..serializers.languageMangementSerializers import *

@api_view(['GET', 'POST'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def language_list(request, format=None):
    if request.method == 'GET':
        paginator = PageNumberPagination()
        snippets = LanguageManagement.objects.all()
        serializer = LanguageSerializer(snippets, many=True)
        return Response(serializer.data)