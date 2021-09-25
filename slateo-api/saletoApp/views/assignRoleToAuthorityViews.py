from django.http import HttpResponse, JsonResponse
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.decorators import api_view, permission_classes, authentication_classes, parser_classes
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from knox.auth import TokenAuthentication
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination


# Custome Import
from ..serializers.assignRoleToAuthoritySerializers import *
from ..serializers.requestHeadingSerializers import *


@api_view(['GET', 'POST'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def assignRoleToAuthority_list(request, format=None):
    if request.method == 'POST':
        serializer = AssignRolesToAuthoritySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            print('student data >>>>',request.data)
            # current_user = request.user
            # autherName = current_user.username
            # data1 = RequestHeading(requestID='Authority',request_author=autherName,
            # request_action_description='Authority setting of "'+request.data['fullName']+'" has been updated by '+autherName+'',request_action_url='role_list',
            # request_view_status=False)
            # data1.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'GET':
        paginator = PageNumberPagination()
        snippets = Role_Assign_Authority.objects.all().order_by('-updated_at')
        snippets = paginator.paginate_queryset(snippets, request)
        serializer = AssignRolesToAuthoritySerializer(snippets, many=True)
        return Response(serializer.data)


@api_view(['GET', 'PUT', 'DELETE'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def assignRoleToAuthority_detail(request, pk, format=None):
    try:
        roleDetail = Role_Assign_Authority.objects.get(pk=pk)
    except Role_Assign_Authority.DoesNotExist:
        return Response({'message': 'Assign Role Not Found! '}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = AssignRolesToAuthoritySerializer(roleDetail)
        print(serializer.data)
        return JsonResponse(serializer.data, status=200, safe=False)

    if request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = AssignRolesToAuthoritySerializer(roleDetail, data=data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            print('student data >>>>',request.data)
            # current_user = request.user
            # autherName = current_user.username
            # data1 = RequestHeading(requestID='Authority',request_author=autherName,
            # request_action_description='Authority setting of "'+request.data['fullName']+'" has been updated by '+autherName+'',request_action_url='role_list',
            # request_view_status=False)
            # data1.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        roleDetail.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
