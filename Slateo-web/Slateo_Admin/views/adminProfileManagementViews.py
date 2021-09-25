from django.http import HttpResponse, JsonResponse
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.decorators import api_view, permission_classes, authentication_classes, parser_classes
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from knox.auth import TokenAuthentication
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from django.contrib.auth.models import User


# Custome Import
from ..serializers.adminProfileManagementSerializers import *
from .helper.dataRenderFunction import *





@api_view(['GET', 'PUT', 'DELETE'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def adminProfile_detail(request, pk, format=None):
    try:
        adminUser = Profile.objects.get(pk=pk)
    except User.DoesNotExist:
        return Response({'message': 'User Not Found! '}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        dataStudent = AdminProfileUser(adminUser)
        return JsonResponse(dataStudent, status=200, safe=False)

    if request.method == 'PUT':
        serializer = AdminProfileManagementSerializer(adminUser, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        roleDetail.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
