from django.http import HttpResponse, JsonResponse
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.decorators import api_view, permission_classes, authentication_classes, parser_classes
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from knox.auth import TokenAuthentication
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password,check_password
from django.http import QueryDict
from django.http import HttpResponse  
from django.core.mail import send_mail
from django.conf import settings
from pathlib import Path
from email.mime.image import MIMEImage
from django.core.mail import EmailMultiAlternatives
from rest_framework.pagination import PageNumberPagination

# Custom Import
from ..serializers.studentManagementSerializers import *
from .helper.dataRenderFunction import *
from ..serializers.examManagementSerializers import *
from django.core import mail
from ..serializers.requestHeadingSerializers import *



@api_view(['GET','POST'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def sendBulkSmsToStudents(request, format=None):
    if request.method == 'POST':
        if request.data['registration'].strip() == 'all_student':
            c = 0
            data = StudentManagement.objects.values('referUser__username','referUser__email','mobileNumber')
            lenData = len(data)
            for i in data:
                flag = sendingEmail(i['referUser__username'],i['mobileNumber'],i['referUser__email'])
                c = c + 1
            data = {'msg':'mail send outof ' + str(c) + '/' +str(lenData)}
            return Response({'data':data,'status':True,'message':'success'}, status=200)
        else:
            return Response({'data':{'msg':'please provide correct data'},'status':False,'message':'fail'}, status=200)


@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def student_credential(request, format=None):
    if request.method == 'POST':
        data = User.objects.get(username=request.data['registration'])
        dataStudent = StudentManagement.objects.get(referUser=data)
        flag = sendingEmail(data.username,dataStudent.mobileNumber,data.email)
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
    
    
    


@api_view(['GET', 'POST'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def student_list(request, format=None):
    if request.method == 'GET':
        paginator = PageNumberPagination()
        snippets = StudentManagement.objects.all().order_by('-updated_at')
        snippets = paginator.paginate_queryset(snippets, request)
        serializer = GETStudentManagementSerializer(snippets, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        data = request.data
        if isinstance(request.data, QueryDict):
            data = dict(zip(request.data.keys(), request.data.values()))
        registraNo = data['registrationNumber']
        contactNo = data['mobileNumber']
        email = data['emailID']
        dictData = {
            'username':data['registrationNumber'],
            'password':data['mobileNumber'],
            'email':data['emailID']
        }
        try:
            serializer = RegisterSerializer(data=dictData)
            if serializer.is_valid():
                user = serializer.save()
            else:
                return Response({'data':serializer.errors,'status':True,'message':'success'}, status=status.HTTP_400_BAD_REQUEST)
            userID = User.objects.get(username=data['registrationNumber'])
            del data['registrationNumber']
            del data['emailID']
            data['referUser'] = userID.id
            if type(data['suject']) != list:
                data['suject'] = [int(i) for i in eval(data['suject'])]
            else:
                data['suject'] = data['suject']
            try:
                serializer = StudentManagementSerializer(data=data)
                if serializer.is_valid():
                    serializer.save()
                    print('student data >>>>',request.data)
                    current_user = request.user
                    autherName = current_user.username
                    data1 = RequestHeading(requestID='Student',request_author=autherName,
                    request_action_description='New Student "'+request.data['fullName']+'" has been added by '+autherName+'',request_action_url='student_list',
                    request_view_status=False)
                    data1.save()
                    datamail = sendingEmail(registraNo,contactNo,email)
                    mail_text = ''
                    if datamail == 'Mail_Send':
                        mail_text = 'Credential Send Successfully'
                    else:
                        mail_text = 'Credential Not Send Successfully'
                    return Response({'data':serializer.data,'status':True,'message':mail_text}, status=status.HTTP_201_CREATED)
                else:
                    User.objects.get(id=userID.id).delete()
                    return Response({'data':serializer.errors,'status':False,'message':'success'}, status=status.HTTP_400_BAD_REQUEST)
            except:
                User.objects.get(id=userID.id).delete()
                return Response({'data':serializer.errors,'status':False,'message':'success'}, status=status.HTTP_400_BAD_REQUEST)
        except:
                User.objects.get(id=userID.id).delete()
                return Response({'data':serializer.errors,'status':False,'message':'success'}, status=status.HTTP_400_BAD_REQUEST)







@api_view(['GET', 'POST'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def student_csv_without_email(request, format=None):
    if request.method == 'POST':
        data = request.data
        if isinstance(request.data, QueryDict):
            data = dict(zip(request.data.keys(), request.data.values()))
        registraNo = data['registrationNumber']
        contactNo = data['mobileNumber']
        email = data['emailID']
        dictData = {
            'username':data['registrationNumber'],
            'password':data['mobileNumber'],
            'email':data['emailID']
        }
        try:
            serializer = RegisterSerializer(data=dictData)
            if serializer.is_valid():
                user = serializer.save()
            else:
                return Response({'data':serializer.errors,'status':True,'message':'success'}, status=status.HTTP_400_BAD_REQUEST)
            userID = User.objects.get(username=data['registrationNumber'])
            del data['registrationNumber']
            del data['emailID']
            data['referUser'] = userID.id
            if type(data['suject']) != list:
                data['suject'] = [int(i) for i in eval(data['suject'])]
            else:
                data['suject'] = data['suject']
            try:
                serializer = StudentManagementSerializer(data=data)
                if serializer.is_valid():
                    serializer.save()
                    print('student data >>>>',request.data)
                    current_user = request.user
                    autherName = current_user.username
                    data1 = RequestHeading(requestID='Student',request_author=autherName,
                    request_action_description='New Student "'+request.data['fullName']+'" has been added by '+autherName+'',request_action_url='student_list',
                    request_view_status=False)
                    data1.save()
                    # datamail = sendingEmail(registraNo,contactNo,email)
                    # mail_text = ''
                    # if datamail == 'Mail_Send':
                    #     mail_text = 'Credential Send Successfully'
                    # else:
                    #     mail_text = 'Credential Not Send Successfully'
                    return Response({'data':serializer.data,'status':True}, status=status.HTTP_201_CREATED)
                else:
                    User.objects.get(id=userID.id).delete()
                    return Response({'data':serializer.errors,'status':False,'message':'success'}, status=status.HTTP_400_BAD_REQUEST)
            except:
                User.objects.get(id=userID.id).delete()
                return Response({'data':serializer.errors,'status':False,'message':'success'}, status=status.HTTP_400_BAD_REQUEST)
        except:
                User.objects.get(id=userID.id).delete()
                return Response({'data':serializer.errors,'status':False,'message':'success'}, status=status.HTTP_400_BAD_REQUEST)







@api_view(['GET', 'PUT', 'DELETE'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def student_detail(request, pk, format=None):
    try:
        studentDetail = StudentManagement.objects.get(pk=pk)
    except StudentManagement.DoesNotExist:
        return Response({'data':{},'status':False,'message':'Student Not Found'}, status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = GETStudentManagementSerializer(studentDetail)
        return JsonResponse({'data':serializer.data,'status':True,'message':'success'}, status=200, safe=False)
    if request.method == 'PUT':
        data = request.data
        if isinstance(request.data, QueryDict):
            data = dict(zip(request.data.keys(), request.data.values()))
        userID = User.objects.get(username=data['registrationNumber'])
        if data['emailID'] != '':
            userID.email = data['emailID']
            userID.save()
        del data['registrationNumber']
        del data['emailID']
        data['referUser'] = userID.id
        if type(data['suject']) != list:
            data['suject'] = [int(i) for i in eval(data['suject'])]
        else:
            data['suject'] = data['suject']
        serializer = StudentManagementSerializer(studentDetail,data=data)
        if serializer.is_valid():
            serializer.save()
            print('student data >>>>',request.data)
            current_user = request.user
            autherName = current_user.username
            data1 = RequestHeading(requestID='Student',request_author=autherName,
            request_action_description='Student "'+request.data['fullName']+'" has been updated by '+autherName+'',request_action_url='student_list',
            request_view_status=False)
            data1.save()
            return Response(serializer.data, status=200)

    elif request.method == 'DELETE':
        studentDetail.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



# 

@api_view(['GET', 'PUT', 'DELETE'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def student_paper(request, pk, format=None):
    try:
        studentDetail = StudentManagement.objects.get(pk=pk)
    except StudentManagement.DoesNotExist:
        return Response({'data':{},'status':False,'message': 'Student Not Found'}, status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        dataPaper = ExamManagement.objects.filter(examAssociateCourse=studentDetail.courseFK,examStatus='Up Coming').values_list('id', flat=True)
        data = PaperManagement.objects.filter(paperAssociateCourse=studentDetail.courseFK,paperAssociateSubject__in=studentDetail.suject.values_list('id', flat=True)).values_list('id', flat=True)
        dataPapers = Eaxm_Paper.objects.filter(exam_management_fk__in=dataPaper,examPapers__in=data)
        data = getPaperStudentWise(dataPapers)
        if len(data) > 0:
            return Response({'data':data,'message': 'success', 'status':True})
        else:
            return Response({'data':{},'message': 'No Exam Schedule', 'status':False})

  


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
