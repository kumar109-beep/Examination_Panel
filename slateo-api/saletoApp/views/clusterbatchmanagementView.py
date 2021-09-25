from django.http import HttpResponse, JsonResponse
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.decorators import api_view,permission_classes,authentication_classes,parser_classes
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from knox.auth import TokenAuthentication
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination


# Custome Import
from ..serializers.clusterbatchmanagementSerializers import *


@api_view(['GET', 'POST'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def cluster_list(request, format=None):
    if request.method == 'POST':
        serializer = ClusterManagementSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'GET':
        paginator = PageNumberPagination()
        snippets = ClusterBatchtManagement.objects.all()
        snippets = paginator.paginate_queryset(snippets, request)
        serializer = ClusterManagementSerializer(snippets, many=True)
        return Response(serializer.data)


@api_view(['GET','PUT','DELETE'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def cluster_detail(request, pk, format=None):
    try:
        clusterDetail = ClusterBatchtManagement.objects.get(pk=pk)
    except ClusterBatchtManagement.DoesNotExist:
        return Response({'message': 'cluster Not Found! '},status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ClusterManagementSerializer(clusterDetail)
        print(serializer.data)
        return JsonResponse(serializer.data, status=200, safe=False)

    if request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = ClusterManagementSerializer(clusterDetail, data=data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        clusterDetail.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)





'''
{
"clusterID":1,
"clusterName":"AAS",
"clusterDescription":"A",
"clusterPressor":"A",
"clusterSuccessor":"B",
"clusterSuperVisorID":"Aone",
"clusterSuperVisorName":"Betch",
"clusterStudentFK":[]
}

'''
      






































