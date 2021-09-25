from django.http import HttpResponse, JsonResponse
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.decorators import api_view,permission_classes,authentication_classes,parser_classes
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from knox.auth import TokenAuthentication
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from django.db import IntegrityError
from django.db.models import Q

# Custom Import
from ..serializers.examManagementSerializers import *
from .helper.dataRenderFunction import *
from ..serializers.requestHeadingSerializers import *



@api_view(['GET', 'POST'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def getSpecificExamPaper(request, format=None):
    if request.method == 'POST':
        data = Eaxm_Paper.objects.get(examID=request.POST['exam_id'])
        return Response(serializer.data)






@api_view(['GET', 'POST'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def examManagement_list(request, format=None):
    if request.method == 'GET':
        paginator = PageNumberPagination()
        snippets = ExamManagement.objects.all().order_by('-updated_at')
        snippets = paginator.paginate_queryset(snippets, request)
        dataL = []
        data = examMangementRenderData(snippets,dataL)
        return Response({'data':data,'status':True,'message':'success'})
    elif request.method == 'POST':
        paperDetail = eval(request.data['examPaperTimeTable'])
        serializer = ExamManagementSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            examID = serializer.data['id']
            dataExam = ExamManagement.objects.get(id=examID)
            try:
                for j in paperDetail:
                    resInstance = ResourceManagement.objects.get(id=j['proctor'][0])
                    paerInstance = PaperManagement.objects.get(id=j['paperID'])
                    data = Eaxm_Paper(exam_management_fk=dataExam,
                                examPapers=paerInstance,
                                paperStartDate=j['paperStartDate'],
                                paper_time_start=j['paperStartTime'],
                                paper_procter=resInstance)
                    data.save()
            except:
                data = ExamManagement.objects.get(id=dataExam.id).delete()
                return Response({'data':'Some thing went worng','message': 'fail', 'status':200},status=200)
            current_user = request.user
            autherName = current_user.username
            data1 = RequestHeading(requestID='Exam Management',request_author=autherName,
            request_action_description='New Exam "'+request.data['examName']+'" has been added by '+autherName+'',request_action_url='examlist',
            request_view_status=False)
            data1.save()
            return Response({'data':{},'message': 'sucess', 'status':200})
        else:
            return Response({'data':'Some thing went worng','message': 'fail', 'status':200},status=200)
    


@api_view(['GET','PUT','DELETE'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def examManagement_detail(request, pk, format=None):
    try:
        courseIDDatat = ExamManagement.objects.get(pk=pk)
    except ExamManagement.DoesNotExist:
        return Response({'data':{},'status':False,'message': 'Exam Not Found!'},status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        dataL = ExamManagement.objects.filter(pk=pk).values_list('batchManagement_mtwom', flat=True)
        data = examMangementRenderData(courseIDDatat,dataL)
        return JsonResponse({'data':data,'status':True,'message':'sucess'})
    if request.method == 'PUT':
        paperDetail = eval(request.data['examPaperTimeTable'])
        serializer = ExamManagementSerializer(courseIDDatat, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            for j in paperDetail:
                resInstance = ResourceManagement.objects.get(id=j['proctor'][0])
                paerInstance = PaperManagement.objects.get(id=j['paperID'])
                dataExam = Eaxm_Paper.objects.get(exam_management_fk=courseIDDatat)
                dataExam.paperStartDate = paperStartDate=j['paperStartDate']
                dataExam.paper_time_start = paper_time_start=j['paperStartTime']
                dataExam.paper_procter = resInstance
                dataExam.save()
            current_user = request.user
            autherName = current_user.username
            data1 = RequestHeading(requestID='Exam Management',request_author=autherName,
            request_action_description='Exam "'+request.data['examName']+'" has been updated by '+autherName+'',request_action_url='examlist',
            request_view_status=False)
            data1.save()
            return Response({'data':{},'message': 'Exam Management Data Updated', 'status':200})
        else:
            return Response({'data':'Some thing went worng','message': 'fail', 'status':200},status=200)


    elif request.method == 'DELETE':
        try:
            courseIDDatat.delete()
            return Response({'data':{},'status':True,'message':"Course Type Delted"},status=200)
        except:
            return Response({'data':{},'status':False,'message':"Course Type Attched with Someone"},status=403)
      




@api_view(['GET'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def checkexistinExamName(request, format=None):
    keyData = request.query_params.get('q')
    if keyData != None:
        paginator = PageNumberPagination()
        snippets = ExamManagement.objects.filter(
            Q(examName=keyData))
        snippets = paginator.paginate_queryset(snippets, request)
        data = GETExamManagementSerializer(snippets,many=True)
        return Response(data.data)
    else:
        return Response("Please Provide Correct key Parameter")


@api_view(['GET'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def checkexistinExamNameCode(request, format=None):
    keyData = request.query_params.get('q')
    if keyData != None:
        paginator = PageNumberPagination()
        snippets = ExamManagement.objects.filter(
            Q(examID=keyData))
        snippets = paginator.paginate_queryset(snippets, request)
        data = GETExamManagementSerializer(snippets,many=True)
        return Response(data.data)
    else:
        return Response("Please Provide Correct key Parameter")



@api_view(['GET'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def check_exam_coming_status(request, format=None):
    start_date = request.query_params.get('start_date')
    last_date = request.query_params.get('last_date')
    if start_date != None and last_date != None :
        paginator = PageNumberPagination()
        snippets = ExamManagement.objects.filter(Q(examStartDate=start_date) | Q(examEndDate=last_date))
        snippets = paginator.paginate_queryset(snippets, request)
        data = GETExamManagementSerializer(snippets,many=True)
        return Response(data.data)
    else:
        return Response("Please Provide Correct key Parameter")