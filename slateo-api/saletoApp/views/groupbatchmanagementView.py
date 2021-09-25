from django.http import HttpResponse, JsonResponse
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.decorators import api_view,permission_classes,authentication_classes,parser_classes
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from knox.auth import TokenAuthentication
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination


# Custome Import
from ..serializers.groupbatchserializers import *


@api_view(['GET', 'POST'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def group_list(request, format=None):
    if request.method == 'POST':
        serializer = GrouptManagementSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    elif request.method == 'GET':
        paginator = PageNumberPagination()
        snippets = GroupBatchtManagement.objects.all()
        snippets = paginator.paginate_queryset(snippets, request)
        serializer = GrouptManagementSerializer(snippets, many=True)
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET','PUT','DELETE'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def group_detail(request, pk, format=None):
    try:
        groupDetail = GroupBatchtManagement.objects.get(pk=pk)
    except GroupBatchtManagement.DoesNotExist:
        return Response({'message': 'Batch Not Found! '},status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = GrouptManagementSerializer(groupDetail)
        print(serializer.data)
        return JsonResponse(serializer.data, status=200, safe=False)

    if request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = GrouptManagementSerializer(groupDetail, data=data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        groupDetail.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


'''
{
    "id": 1,
    "groupID": "85",
    "groupName": "AAS",
    "groupDescription": "A",
    "groupPressor": "A",
    "groupSuccessor": "B",
    "groupSuperVisorID": "Aone",
    "groupSuperVisorName": "Betch",
    "groupStudentFK": []
}

'''