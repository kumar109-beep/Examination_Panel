from django.http import HttpResponse, JsonResponse
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.decorators import api_view,permission_classes,authentication_classes,parser_classes
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from knox.auth import TokenAuthentication
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination


# Custome Import
from ..serializers.country_state_districtSerializers import *


@api_view(['GET', 'POST'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def country_list(request, format=None):
    if request.method == 'GET':
        paginator = PageNumberPagination()
        snippets = Country.objects.all().order_by('-updated_at')
        snippets = paginator.paginate_queryset(snippets, request)
        serializer = CountrySerializer(snippets, many=True)
        return Response(serializer.data)

@api_view(['GET', 'POST'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def state_list(request, format=None):
    if request.method == 'GET':
        paginator = PageNumberPagination()
        snippets = State.objects.all()
        snippets = paginator.paginate_queryset(snippets, request)
        serializer = StateSerializer(snippets, many=True)
        return Response(serializer.data)