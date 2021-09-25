from django.http import HttpResponse, JsonResponse
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.decorators import api_view,permission_classes,authentication_classes,parser_classes
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from knox.auth import TokenAuthentication
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from django.db import IntegrityError
import json

# Custom Import
from ..serializers.paperManagementSerializers import *
from ..serializers.questionBankManagementSerializers import *

@api_view(['GET', 'POST'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def paper_list(request, format=None):
    if request.method == 'GET':
        paginator = PageNumberPagination()
        snippets = PaperManagement.objects.all().order_by('-updated_at')
        snippets = paginator.paginate_queryset(snippets, request)
        serializer = PaperManagementSerializer(snippets, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        data = request.data
        print(data)
        # exit()
        serializer = PaperManagementSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'message':'Question Created Successfully'}, status=status.HTTP_201_CREATED)
        else:
            return Response({'message':'Already Paper Exist'}, status=status.HTTP_404_NOT_FOUND)
      


@api_view(['GET','PUT','DELETE'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def paper_detail(request, pk, format=None):
    try:
        studentDetail = PaperManagement.objects.get(pk=pk)
    except PaperManagement.DoesNotExist:
        return Response({'data':{},'status':False,'message': 'Paper Not Found! '},status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = PaperManagementSerializer(studentDetail)
        print(serializer.data)
        return JsonResponse({'data':serializer.data,'status':True,'message': 'success'}, status=200, safe=False)

    if request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = PaperManagementSerializer(studentDetail, data=data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return JsonResponse({'data':serializer.data,'status':True,'message': 'success'}, status=200)
        return JsonResponse({'data':serializer.errors,'status':True,'message': 'Some thing went worng'}, status=400)

    elif request.method == 'DELETE':
        studentDetail.delete()
        return Response({'data':{},'status':True,'message':'Deleted'},status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def getPaperAccordingToCourse(request,pk, format=None):
    if request.method == 'GET':
        paginator = PageNumberPagination()
        snippets = PaperManagement.objects.filter(paperAssociateCourse__id=pk,paperStatus="Approved")
        print('HJKJHKJGKJGK',snippets)
        if len(snippets) != 0:
            # snippets = PaperManagement.objects.all()
            serializer = GETPaperManagementSerializer(snippets, many=True)
            return Response({'data':serializer.data,"status":True,"message":"success"}, status=200)
        else:
            return Response({'data':{},"status":False,"message":"fail"}, status=400)





@api_view(['PUT'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def paper_aprove(request, pk, format=None):
    try:
        studentDetail = PaperManagement.objects.get(pk=pk)
    except PaperManagement.DoesNotExist:
        return Response({'data':{},'status':False,'message': 'Paper Not Found! '},status=status.HTTP_404_NOT_FOUND)
    if request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = PaperManagementSerializer(studentDetail, data=data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return JsonResponse({'data':serializer.data,'status':True,'message': 'success'}, status=200)
        return JsonResponse({'data':serializer.errors,'status':True,'message': 'Some thing went worng'}, status=400)


@api_view(['GET', 'POST'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def getQuestionPaperWise(request,pk, format=None):
    try:
        paperDetail = PaperManagement.objects.get(pk=pk)
    except PaperManagement.DoesNotExist:
        return Response({'data':{},'status':False,'message': 'Paper Not Found! '},status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        paperDetail = paperDetail.__dict__
        questionData = eval(paperDetail['SectionWiseQuestionList'])
        count = 1
        quesList = []
        quesDict = {}
        quList = []
        quDict = {}
        for i in questionData:
            quesData = QuestionBank_Question.objects.filter(pk__in=i['Section_' + str(count)])
            for j in quesData:
                quDict['id'] = j.id
                quDict['question'] = j.question
                quDict['optionList'] = j.optionList
                quList.append(quDict)
                quDict = {}
            quesDict['Section_' + str(count)] = quList
            quesList.append(quesDict)
            quesDict = {}
            count = count + 1
            quList = []
        paperDetail['questionData'] = quesList
        print(quesList)
        # exit()
        # serializer = PaperManagementSerializer(paperDetail)
        return JsonResponse({'data': quesList,'status':True,'message': 'success'}, status=200, safe=False)



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