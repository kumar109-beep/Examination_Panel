from django.http import HttpResponse, JsonResponse
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.decorators import api_view, permission_classes, authentication_classes, parser_classes
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from knox.auth import TokenAuthentication
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from django.contrib.auth.hashers import make_password,check_password
from django.http import QueryDict


# Custome Import
from ..serializers.resourceManagementSerializers import *
from .helper.dataRenderFunction import *
from ..serializers.requestHeadingSerializers import *



@api_view(['GET', 'POST'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def resource_list(request, format=None):
    if request.method == 'POST':
        data = request.data
        if isinstance(request.data, QueryDict):
            data = dict(zip(request.data.keys(), request.data.values()))
        
        registraNo = data['employeeCode']
        contactNo = data['mobileNumber']
        email = data['emailID']
        dictData = {
            'username':data['employeeCode'],
            'password':data['mobileNumber'],
            'email':data['emailID']
        }
        serializer = RegisterSerializer(data=dictData)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        userID = User.objects.get(username=data['employeeCode'])
        try:
            if type(data['role_designation']) != list:
                data['role_designation'] = [int(i) for i in eval(data['role_designation'])]
            else:
                data['role_designation'] = data['role_designation']
            data['referUser'] = userID.id
            data['subject_speciality'] = int(data['subject_speciality'])
            data['state'] = int(data['state'])
            data['country'] = int(data['country'])
            # print(data)
            # exit()
            try:
                serializer = ResourceManagementSerializer(data=data)
                if serializer.is_valid():
                    print('AS')
                    serializer.save()
                    print('Resource data >>>>',request.data)
                    print('data >>>>',data)
                    current_user = request.user
                    autherName = current_user.username
                    data1 = RequestHeading(requestID='Resource',request_author=autherName,
                    request_action_description='New Resource "'+data['fullName']+'" has been added by '+autherName+'',request_action_url='resource_list',
                    request_view_status=False)
                    data1.save()
                    return Response({'data':serializer.data,'status':True,'message':'success'},status=status.HTTP_201_CREATED)
                else:
                    print('A')
                    User.objects.get(id=userID.id).delete()
                    return Response({'data':serializer.errors,'status':False,'message':'fail'}, status=status.HTTP_400_BAD_REQUEST)
            except:
                User.objects.get(id=userID.id).delete()
                return Response({'data':serializer.errors,'status':False,'message':'fail'}, status=status.HTTP_400_BAD_REQUEST)
        except:
                User.objects.get(id=userID.id).delete()
                return Response({'data':serializer.errors,'status':False,'message':'fail'}, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'GET':
        paginator = PageNumberPagination()
        snippets = ResourceManagement.objects.all().order_by('-updated_at')
        snippets = paginator.paginate_queryset(snippets, request)
        data = GetResourceManagementSerializer(snippets,many=True)
        return Response({'data':data.data,'status':True,'message':'success'}, status=200)


@api_view(['GET', 'PUT', 'DELETE'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def resource_detail(request, pk, format=None):
    try:
        roleDetail = ResourceManagement.objects.get(pk=pk)
    except ResourceManagement.DoesNotExist:
        return Response({'data':{}, 'status':False, 'message': 'Resource Not Found! '}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = GetResourceManagementSerializer(roleDetail)
        return Response({'data':serializer.data,'status':True,'message':'success'}, status=200)

    if request.method == 'PUT':
        data = request.data
        if isinstance(request.data, QueryDict):
            data = dict(zip(request.data.keys(), request.data.values()))
        userID = User.objects.get(username=data['employeeCode'])
        userID.email = data['emailID']
        userID.save()
        del data['employeeCode']
        del data['emailID']
        if type(data['role_designation']) != list:
            data['role_designation'] = [int(i) for i in eval(data['role_designation'])]
        else:
            data['role_designation'] = data['role_designation']
        data['referUser'] = userID.id
        data['subject_speciality'] = int(data['subject_speciality'])
        data['state'] = int(data['state'])
        data['country'] = int(data['country'])
        serializer = ResourceManagementSerializer(roleDetail, data=data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            print('Resource data >>>>',request.data)
            print('data >>>>',data)
            current_user = request.user
            autherName = current_user.username
            data1 = RequestHeading(requestID='Resource',request_author=autherName,
            request_action_description='Resource "'+data['fullName']+'" has been updated by '+autherName+'',request_action_url='resource_list',
            request_view_status=False)
            data1.save()
            return JsonResponse({'data':serializer.data,'status':True,'message':'success'}, status=200)
        return JsonResponse({'data':serializer.errors,'status':False,'message':'fail'}, status=400)

    elif request.method == 'DELETE':

        roleDetail.delete()
        return Response({'data':{},'status':True,'message':'Deleted'},status=status.HTTP_204_NO_CONTENT)


# @api_view(['GET', 'PUT', 'DELETE'])
# @parser_classes([MultiPartParser, FormParser, JSONParser])
# @permission_classes([IsAuthenticated])
# def getOnlyProcter(request, pk, format=None):
#     try:
#         roleDetail = ResourceManagement.objects.get(pk=pk)
#     except ResourceManagement.DoesNotExist:
#         return Response({'data':{}, 'status':False, 'message': 'Resource Not Found! '}, status=status.HTTP_404_NOT_FOUND)
