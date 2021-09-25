from django.http import HttpResponse, JsonResponse
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.decorators import api_view, permission_classes, authentication_classes, parser_classes
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from knox.auth import TokenAuthentication
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination


# Custome Import
from ..serializers.resourceManagementSerializers import *


@api_view(['GET', 'POST'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def resource_list(request, format=None):
    if request.method == 'POST':
        serializer = ResourceManagementSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'GET':
        paginator = PageNumberPagination()
        snippets = ResourceManagement.objects.all().order_by('-updated_at')
        snippets = paginator.paginate_queryset(snippets, request)
        serializer = ResourceManagementSerializer(snippets, many=True)
        return Response(serializer.data)


@api_view(['GET', 'PUT', 'DELETE'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def resource_detail(request, pk, format=None):
    try:
        roleDetail = ResourceManagement.objects.get(pk=pk)
    except ResourceManagement.DoesNotExist:
        return Response({'message': 'Resource Not Found! '}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ResourceManagementSerializer(roleDetail)
        print(serializer.data)
        return JsonResponse(serializer.data, status=200, safe=False)

    if request.method == 'PUT':
        # data = JSONParser().parse(request)
        serializer = ResourceManagementSerializer(roleDetail, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        roleDetail.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
