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
from ..serializers.requestHeadingSerializers import *
from .helper.dataRenderFunction import *



@api_view(['GET'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def request_heading(request, format=None):
    if request.method == 'GET':
        paginator = PageNumberPagination()
        snippets = RequestHeading.objects.filter(request_view_status='False').order_by('-updated_at')
        snippets = paginator.paginate_queryset(snippets, request)
        data = RequestHeadingSerializer(snippets,many=True)
        return Response({'data':data.data,'status':True,'message':'success'}, status=200)


@api_view(['GET'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def request_heading_all(request, format=None):
    if request.method == 'GET':
        paginator = PageNumberPagination()
        snippets = RequestHeading.objects.all().order_by('-updated_at')
        snippets = paginator.paginate_queryset(snippets, request)
        data = RequestHeadingSerializer(snippets,many=True)
        return Response({'data':data.data,'status':True,'message':'success'}, status=200)


@api_view(['PUT'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def status_read_all(request, format=None):
    if request.method == 'PUT':
        paginator = PageNumberPagination()
        snippets = RequestHeading.objects.filter(request_view_status='False').update(request_view_status="True")
        snippets = RequestHeading.objects.all().order_by('-updated_at')
        snippets = paginator.paginate_queryset(snippets, request)
        data = RequestHeadingSerializer(snippets,many=True)
        return Response({'data':data.data,'status':True,'message':'success'}, status=200)









@api_view(['GET', 'PUT', 'DELETE'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def request_heading_status(request, pk, format=None):
    try:
        roleDetail = RequestHeading.objects.get(pk=pk)
    except RequestHeading.DoesNotExist:
        return Response({'message': 'Resource Not Found! '}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = RequestHeadingSerializer(roleDetail)
        print(serializer.data)
        return JsonResponse(serializer.data, status=200, safe=False)

    elif request.method == 'PUT':
        serializer = RequestHeadingSerializer(roleDetail, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        try:
            roleDetail.delete()
            return Response({'data':{},'status':True,'message':"Notification Deleted"},status=200)
        except:
            return Response({'data':{},'status':False,'message':"Something Went Wrong"},status=403)




@api_view(['GET', 'PUT', 'DELETE'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def remove_all_notification(request, format=None):
    if request.method == 'DELETE':
        dataDelete = RequestHeading.objects.all().delete()
        return Response({'data':{},'status':True,'message':"Notification Deleted"},status=200)
    else:
        return Response({'data':{},'status':True,'message':"Method Not Allow"},status=200)

