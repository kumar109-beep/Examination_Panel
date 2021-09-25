from django.http import HttpResponse, JsonResponse
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.decorators import api_view, permission_classes, authentication_classes, parser_classes
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from knox.auth import TokenAuthentication
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination


# Custome Import
from ..serializers.rolesManagementSerializers import *
from ..serializers.resourceManagementSerializers import *
from ..serializers.requestHeadingSerializers import *



@api_view(['GET', 'POST'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def role_list(request, format=None):
    if request.method == 'POST':
        try:
            data = RolesManagement.objects.get(roleID=request.data['roleID'],roleName=request.data['roleName'])
            return Response({'data':{'Role ID && Role Name Already Exist'},'message': 'fail','status':False}, status=status.HTTP_404_NOT_FOUND)
        except RolesManagement.DoesNotExist:
            serializer = RolesManagementSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                print('Role data >>>>',request.data['roleName'])
                current_user = request.user
                autherName = current_user.username
                data1 = RequestHeading(requestID='Role/Designation',request_author=autherName,
                request_action_description='New role "'+request.data['roleName']+'" has been added by '+autherName+'',request_action_url='role_list',
                request_view_status=False)
                data1.save()
                return Response({'data':serializer.data,'message': 'Role Sucessfully Created','status':True},status=status.HTTP_201_CREATED)
            return Response({'data':serializer.errors,'message': 'fail','status':False}, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'GET':
        paginator = PageNumberPagination()
        snippets = RolesManagement.objects.all().order_by('-updated_at')
        snippets = paginator.paginate_queryset(snippets, request)
        serializer = RolesManagementSerializer(snippets, many=True)
        return Response(serializer.data)


@api_view(['GET', 'PUT', 'DELETE'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def role_detail(request, pk, format=None):
    try:
        roleDetail = RolesManagement.objects.get(pk=pk)
    except RolesManagement.DoesNotExist:
        return Response({'data':{},'message': 'Role Designation Not Found', 'status':200}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        resource_count = ResourceManagement.objects.filter(role_designation__in=[roleDetail.id]).count()
        resources = ResourceManagement.objects.filter(role_designation__in=[roleDetail.id])
        resource_data = ResourceManagementSerializer(resources, many=True)
        serializer = RolesManagementSerializer(roleDetail)
        return Response({'data':serializer.data,'resource_count':resource_count,'resources':resource_data.data,'message': 'success', 'status':200}, status=200)

    if request.method == 'PUT':
        serializer = RolesManagementSerializer(roleDetail, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            print('Role data >>>>',request.data['roleName'])
            current_user = request.user
            autherName = current_user.username
            data1 = RequestHeading(requestID='Role/Designation',request_author=autherName,
            request_action_description='Role "'+request.data['roleName']+'" has been updated by '+autherName+'',request_action_url='role_list',
            request_view_status=False)
            data1.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)
    elif request.method == 'DELETE':
        try:
            roleDetail.delete()
            return Response({'data':{},'status':True,'message':"Role Deleted"},status=200)
        except:
            return Response({'data':{},'status':False,'message':"Role Deleted"},status=403)
       
