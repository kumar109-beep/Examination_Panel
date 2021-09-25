from django.http import HttpResponse, JsonResponse
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.decorators import api_view, permission_classes, authentication_classes, parser_classes
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from knox.auth import TokenAuthentication
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from django.core.mail import send_mass_mail
from rest_framework.authtoken.serializers import AuthTokenSerializer
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password,check_password

# Custom Import
from ..serializers.studentManagementSerializers import *
from ..serializers.credentialSerializers import *
from .helper.dataRenderFunction import *
from ..serializers.requestHeadingSerializers import *


@api_view(['GET', 'POST'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def student_list(request, format=None):
    if request.method == 'GET':
        paginator = PageNumberPagination()
        snippets = StudentManagement.objects.all()
        snippets = paginator.paginate_queryset(snippets, request)
        dataList = StudentRenderData(snippets)
        return Response(dataList)
    elif request.method == 'POST':
        dictData = {
            'username':request.data['registrationNumber'],
            'password':make_password(str(request.data['mobileNumber']).strip()),
            'email':request.data['emailID'],
            'is_staff':True
        }
        serializer = RegisterSerializer(data=dictData)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        userID = User.objects.latest('id')
        try:
            studentData = {
            'referUser':userID.id,
            "fullName":request.data['fullName'],          
            "mobileNumber":request.data['mobileNumber'],   
            "dateOfBirth":request.data['dateOfBirth'],         
            "gender":request.data['gender'],        
            "guardianName":request.data['guardianName'],    
            "relationwithGuardian":request.data['relationwithGuardian'],   
            "guardianEmail":request.data['guardianEmail'],    
            "guardianMobile":request.data['guardianMobile'],
            "course":request.data['course'],   
            "year":request.data['year'],  
            "handy":request.data['handy'], 
            "temp_country":request.data['temp_country'], 
            "temp_state":request.data['temp_state'],           
            "temp_district":request.data['temp_district'],   
            "temp_address":request.data['temp_address'],        
            "temp_pincode":request.data['temp_pincode'],              
            "perm_country":request.data['perm_country'],      
            "perm_state":request.data['perm_state'],           
            "perm_district":request.data['perm_district'],        
            "perm_address":request.data['perm_address'],     
            "perm_pincode":request.data['perm_pincode']
            }
            serializerStudent = StudentManagementSerializer(data=studentData)
            if serializerStudent.is_valid():
                serializerStudent.save()
                
                return Response(serializerStudent.data, status=status.HTTP_201_CREATED)
        except:
            User.objects.get(id=userID.id).delete()
            return Response({'message':"Check Your Data"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def student_detail(request, pk, format=None):
    try:
        studentDetail = StudentManagement.objects.get(pk=pk)
    except StudentManagement.DoesNotExist:
        return Response({'message': 'Student Not Found! '}, status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = StudentManagementSerializer(studentDetail)
        return JsonResponse(serializer.data, status=200, safe=False)
    if request.method == 'PUT':
        serializer = StudentManagementSerializer(
            studentDetail, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            print('student data >>>>',request.data)
            current_user = request.user
            autherName = current_user.username
            data = RequestHeading(requestID='Student',request_author=autherName,
            request_action_description='Student  has been updated by '+autherName+'',request_action_url='student_list',
            request_view_status=False)
            data.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        studentDetail.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
# @permission_classes([IsAuthenticated])
def student_credential(request):
    if request.method == 'GET':
        keyData = request.query_params
        data = StudentManagement.objects.get(registrationNumber=keyData['user_id'].strip())
        password = data.registrationNumber[:5] + '@' + data.mobileNumber[5:]
        insertedPassword = keyData['user_password']
        if insertedPassword.strip() == password.strip():
            serializer = StudentManagementSerializer(data)
            return Response(serializer.data, status=200)
        else:
            return Response({'message':'Provide Correct Credential'},status=status.HTTP_204_NO_CONTENT)



def SendEmailToCustomer(request):
    if request.method == 'GET':
        keyData = request.query_params
        data = StudentManagement.objects.get(registrationNumber=keyData['user_id'].strip())

        check = CampaignEmail.objects.filter(campaignName=mailSubject.strip())
        datatuple = []
        flag = False

        for i in range(len(AllEmail)):
            if(AllEmail[i] != "NA"):
                datatuple.append((mailsubject,completeemail[i],'rk468335@gmail.com',[AllEmail[i]]))
                flag = True
        datatuple = tuple(datatuple)
        send_mass_mail(datatuple)
        if len(check) > 0:
            check = check[0]
            sub_camp = EmailSubCampaign(CampaignName=check,allEmails=AllEmail,text=mail_syntax_Text)
            sub_camp.save()
        else:
            master_campaign = CampaignEmail(campaignName=mailSubject.strip())
            master_campaign.save()
            sub_camp = EmailSubCampaign(CampaignName=master_campaign,allEmails=AllEmail,text=mail_syntax_Text)
            sub_camp.save()

        return HttpResponse(flag)





# Request Parameter ----->>>>
# request.data['registrationNumber'][:5] + '@' + request.data['mobileNumber'][5:]
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
