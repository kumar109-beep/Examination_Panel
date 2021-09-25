from django.http import HttpResponse, JsonResponse
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.decorators import api_view,permission_classes,authentication_classes,parser_classes
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from knox.auth import TokenAuthentication
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination

# Custom Import
from ..serializers.authorityManagementSerializers import *
from ..serializers.requestHeadingSerializers import *



@api_view(['GET', 'POST'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def authorityrole_list(request, format=None):
    if request.method == 'GET':
        paginator = PageNumberPagination()
        snippets = RolesAlocateAuthority.objects.all().order_by('-updated_at')
        # for i in snippets:
        #     print(i.authorityName)
        # snippets = paginator.paginate_queryset(snippets, request)
        serializer = AuthorManagementSerializer(snippets, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = AuthorManagementSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)








@api_view(['GET', 'POST'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def authority_list(request, format=None):
    if request.method == 'GET':
        paginator = PageNumberPagination()
        snippets = AuthorityManagement.objects.all().order_by('-updated_at')
        # for i in snippets:
        #     print(i.authorityName)
        snippets = paginator.paginate_queryset(snippets, request)
        serializer = AuthorManagementSerializer(snippets, many=True)
        print(serializer.data)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = AuthorManagementSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    


@api_view(['GET','PUT','DELETE'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def authority_detail(request, pk, format=None):
    try:
        authorityDetail = AuthorityManagement.objects.get(pk=pk)
    except authorityManagement.DoesNotExist:
        return Response({'message': 'authority Not Found! '},status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = AuthorManagementSerializer(authorityDetail)
        print(serializer.data)
        return JsonResponse(serializer.data, status=200, safe=False)
    if request.method == 'PUT':
        serializer = AuthorManagementSerializer(authorityDetail, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            print('Role data >>>>',request.data)
            # current_user = request.user
            # autherName = current_user.username
            # data = RequestHeading(requestID='Role/Designation',request_author=autherName,
            # request_action_description='Authority setting of '+request.data['roleName']+' has been updated added by '+autherName+'',request_action_url='role_list',
            # request_view_status=False)
            # data.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        authorityDetail.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# Request Parameter ----->>>>
'''
{
"registrationNumber":"gddkjhgjhgs",
"fullName":"lncdkj",
"mobileNumber":"hgfddkjgys",
"emailID":"scdfsfsdddhvjs",
"dateOfBirth":"jkl",
"gender":"jhghj",
"address":"jhbhj",
"country":"jkl",
"state":"hkjk",
"district":"jhkj",
"pincode":"kbkj",
"guardianName":"fdsfd",
"relationwithGuardian":"jhhj",
"guardianEmail":"jhg" ,
"guardianMobile":"hbghj",
"course":"jk",
"branch":"hkjl",
"year":"ghj",
"handy":"True"
}
'''