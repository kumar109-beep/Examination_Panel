from django.http import HttpResponse, JsonResponse
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.decorators import api_view,permission_classes,authentication_classes,parser_classes
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from knox.auth import TokenAuthentication
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination


# Custome Import
from ..serializers.batchManagementSerializers import *


@api_view(['GET', 'POST'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def batch_list(request, format=None):
    if request.method == 'POST':
        print(request.data)
        serializer = BatchtManagementSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'GET':
        paginator = PageNumberPagination()
        snippets = BatchtManagement.objects.all()
        snippets = paginator.paginate_queryset(snippets, request)
        serializer = GETBatchtManagementSerializer(snippets, many=True)
        return Response(serializer.data)


@api_view(['GET','PUT','DELETE'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def batch_detail(request, pk, format=None):
    try:
        batchDetail = BatchtManagement.objects.get(pk=pk)
    except BatchtManagement.DoesNotExist:
        return Response({'message': 'Batch Not Found! '},status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = GETDepBatchtManagementSerializer(batchDetail)
        print(serializer.data)
        return JsonResponse(serializer.data, status=200, safe=False)

    if request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = BatchtManagementSerializer(batchDetail, data=data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        try:
            batchDetail.delete()
            return Response({'data':{},'status':True,'message':"Batch Delted"},status=200)
        except:
            return Response({'data':{},'status':False,'message':"Batch Attched with Someone"},status=403)





'''
{
"batchID":1,
"batchName":"AAS",
"batchDescription":"A",
"batchPressor":"A",
"batchSuccessor":"B",
"batchSuperVisorID":"Aone",
"batchSuperVisorName":"Betch",
"batchStudentFK":[]
}

'''
      






































@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def degree_type(request, format=None):
    if request.method == 'GET':
        data = Degree_Type.objects.all()
        serializer = DegreeTypeSerializer(data, many=True)
        return JsonResponse(serializer.data, safe=False)


@api_view(['GET', 'POST'])
def add_course(request, format=None):
    if request.method == 'POST':
        data = request.data.dict()
        if all(check_key in data for check_key in ("courseID","degreeType","coursename")):
            courseID = data['courseID'].strip()
            degreeType = data['degreeType'].strip()
            coursename = data['coursename'].strip()
            try:
                degree = Degree_Type.objects.get(degree_type=degreeType)
            except:
                return JsonResponse({'message': ' Check Your Degree Type !'},status=status.HTTP_404_NOT_FOUND)
            try:
                subjectData = Course_Management.objects.get(courseID=courseID,Type_Of_Degree=degree,courseName=coursename)
                return JsonResponse({'message': 'Course Alredy Exist!'}, status=200)
            except:
                courseData = Course_Management(courseID=courseID,Type_Of_Degree=degree,courseName=coursename)
                courseData.save()
                return JsonResponse({'message': 'Course Added Suceesfully!'}, status=201)
        else:
            return JsonResponse({'message': ' Invalid Format Data!'},status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])
def add_subject(request, format=None):
    if request.method == 'POST':
        data = request.data.dict()
        if all(check_key in data for check_key in ("subjectID","Type_Of_Course","subjectename")):
            courseID = data['subjectID'].strip()
            Type_Of_Course = data['Type_Of_Course'].strip()
            subjectName = data['subjectename'].strip()
            print(Type_Of_Course)
            try:
                course = Course_Management.objects.get(courseName=Type_Of_Course)
                print(course,'SSS')
            except:
                return JsonResponse({'message': ' Check Your Course Type !'},status=status.HTTP_404_NOT_FOUND)
            try:
                courseData = Subject_Management.objects.get(subjectID=courseID,Type_Of_Course=course,subjectName=subjectName)
                return JsonResponse({'message': 'Subject Alredy Exist!'}, status=200)
            except:
                courseData = Subject_Management(subjectID=courseID,Type_Of_Course=course,subjectName=subjectName)
                courseData.save()
                return JsonResponse({'message': 'Subject Added Suceesfully!'}, status=201)
        else:
            return JsonResponse({'message': ' Invalid Format Data!'},status=status.HTTP_204_NO_CONTENT)
 
        # 'safe=False' for objects serialization

@api_view(['GET', 'POST'])
def getListCourse(request, format=None):
    if request.method == 'GET':
        data = Course_Management.objects.all()
        serializer = CourseManagementSerializer(data, many=True)
        return JsonResponse(serializer.data, safe=False)


@api_view(['GET', 'POST'])
def getListsubject(request, format=None):
    if request.method == 'GET':
        data = Subject_Management.objects.all()
        serializer = SubjectManagementSerializer(data, many=True)
        return JsonResponse(serializer.data, safe=False)



@api_view(['GET', 'POST'])
def CourseManagement(request, format=None):
    """
    List all code snippets, or create a new snippet.
    """
    if request.method == 'GET':
        saletoAllUser = SaletoSignUp.objects.all()
        serializer = CredentialSerializer(saletoAllUser, many=True)
        return JsonResponse(serializer.data, safe=False)
        # 'safe=False' for objects serialization

    elif request.method == 'POST':
        data = request.data
        checkMobileNo = data['mobileNo'].strip()
        checkEmailID = data['mailID'].strip()
        try:
            checkExistData = SaletoSignUp.objects.get(mobileNo=checkMobileNo,mailID=checkEmailID)
            if checkMobileNo == checkExistData.mobileNo.strip():
                return JsonResponse({'message': 'Mobile Number Already Exist!'},status=status.HTTP_204_NO_CONTENT)
                print("Data Found")
            elif checkEmailID == checkExistData.mailID.strip():
                return JsonResponse({'message': 'Email Number Already Exist!'},status=status.HTTP_204_NO_CONTENT)
                print("Data Found")
            elif checkEmailID == checkExistData.mailID.strip() and checkMobileNo == checkExistData.mobileNo.strip():
                return JsonResponse({'message': 'User Already Exist!'},status=status.HTTP_204_NO_CONTENT)
        except ObjectDoesNotExist:
            serializer = CredentialSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                print('serializer',serializer)
                return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
            return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)