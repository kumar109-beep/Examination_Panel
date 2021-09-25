from django.http import HttpResponse, JsonResponse
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.decorators import api_view, permission_classes, authentication_classes, parser_classes
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from knox.auth import TokenAuthentication
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from django.conf import settings
from pathlib import Path
from email.mime.image import MIMEImage
from django.core.mail import EmailMultiAlternatives



# Custome Import
from ..serializers.resultManagementSerializers import *
from ..serializers.studentManagementSerializers import *
from ..serializers.examManagementSerializers import *




@api_view(['GET', 'POST'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def resource_according_to_subject(request,pk, format=None):
    if request.method == 'GET':
        paginator = PageNumberPagination()
        snippets = ResourceManagement.objects.filter(subject_speciality=pk)
        snippets = paginator.paginate_queryset(snippets, request)
        serializer = GET_ResourceManagement(snippets, many=True)
        return Response(serializer.data)





@api_view(['GET', 'POST'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def complete_exam_list(request, format=None):
    if request.method == 'GET':
        paginator = PageNumberPagination()
        snippets = Eaxm_Paper.objects.filter(paperStatus="Completed").order_by('-updated_at')
        snippets = paginator.paginate_queryset(snippets, request)
        serializer = GET_Eaxm_PaperSerializer(snippets, many=True)
        return Response(serializer.data)


@api_view(['GET', 'PUT', 'DELETE'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def complete_exam_detail(request, pk, format=None):
    try:
        roleDetail = Eaxm_Paper.objects.get(pk=pk)
    except Eaxm_Paper.DoesNotExist:
        return Response({'message': 'Eaxm_Paper  Not Found! '}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = GET_Eaxm_PaperSerializer(roleDetail)
        return JsonResponse({'data':serializer.data,'status':True,'message':'success'},status=200, safe=False)

    if request.method == 'PUT':
        serializer = Eaxm_PaperSerializer(roleDetail, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return JsonResponse({'data':serializer.data,'status':True,'message':'success'},status=200)
        return JsonResponse({'data':serializer.errors,'status':False,'message':'success'},status=400)




@api_view(['GET'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def student_list_paper_wise(request, format=None):
    if request.method == 'GET':
        course = request.query_params.get('course')
        subject = request.query_params.get('subject')
        if course != '' and subject != '':
            paginator = PageNumberPagination()
            snippets = StudentManagement.objects.filter(courseFK=course,suject=subject)
            snippets = paginator.paginate_queryset(snippets, request)
            serializer = GETStudentManagementSerializer(snippets, many=True)
            return Response(serializer.data)


@api_view(['GET', 'POST'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def complete_examList(request, format=None):
    if request.method == 'GET':
        paginator = PageNumberPagination()
        snippets = ExamManagement.objects.all().order_by('-updated_at')
        snippets = paginator.paginate_queryset(snippets, request)
        serializer = GETExamManagementSerializer(snippets, many=True)
        return Response(serializer.data)


@api_view(['GET', 'POST'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def getPaperExamList(request, pk, format=None):
    if request.method == 'GET':
        paginator = PageNumberPagination()
        snippets = ExamManagement.objects.get(id=pk)
        data = Eaxm_Paper.objects.filter(exam_management_fk=snippets)
        snippets = paginator.paginate_queryset(data, request)
        serializer = GETExamPaperSerializer(snippets, many=True)
        return Response(serializer.data)


@api_view(['GET', 'POST'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def sendReportCardToStudent(request, format=None):
    if request.method == 'POST':
        flag = sendingEmail('registrationNo','contactNo','adityashukla727@gmail.com')
        if flag == 'Mail_Send':
            return Response({'data':{},'message':'Credentail Send Successfully','status':True})
        else:
            return Response({'data':{},'message':'fail','status':False})



def sendingEmail(registrationNo,contactNo,email):
    subject, from_email, to = 'hello', settings.EMAIL_HOST_USER, email.strip()
    text_content = 'This is an important message.'
    html_content = '<!DOCTYPE html>\
        <html lang="en">\
        <head>\
        <title>Bootstrap Example</title>\
        <meta charset="utf-8">\
        <meta name="viewport" content="width=device-width, initial-scale=1">\
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">\
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>\
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>\
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>\
        </head>\
        <body>\
        <div class="container" style="background-color:white;">\
        <div class="jumbotron" style="background-color:white;">\
            <h1><img src="http://13.233.247.133:8000/static/adminModule/images/logo.png" /></h1>\
            <p>Hello, Welcome to Slateo, your username '+ str(registrationNo) +'  and '+ str(contactNo) +' </p>\
        </div>\
        </div>\
        </body>\
        </html>'
    
    msg = EmailMultiAlternatives(subject, text_content, from_email, [to])
    msg.attach_alternative(html_content, "text/html")
    try:
        msg.send()
        return "Mail_Send"
    except:
        return "Mail_Not_Send"



