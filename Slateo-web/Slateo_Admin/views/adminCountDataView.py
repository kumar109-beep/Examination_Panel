from django.http import HttpResponse, JsonResponse
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.decorators import api_view, permission_classes, authentication_classes, parser_classes
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from knox.auth import TokenAuthentication
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination

from ..serializers.studentManagementSerializers import *
from ..serializers.resourceManagementSerializers import *
from ..serializers.batchManagementSerializers import *


@api_view(['GET'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
# @permission_classes([IsAuthenticated])
def dashStudentCount(request):
    if request.method == 'GET':
        student = StudentManagement.objects.all()
        resource = ResourceManagement.objects.all()
        batch = BatchtManagement.objects.all()
        return Response(
            {
                'student_count':len(student),
                'resource_count':len(resource),
                'batch_count':len(batch)
             }, status=200)
