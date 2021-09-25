from django.http import HttpResponse, JsonResponse
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.decorators import api_view,permission_classes,authentication_classes,parser_classes
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from knox.auth import TokenAuthentication
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from django.db import IntegrityError

# Custom Import
from ..serializers.courseManagementSerializers import *
from ..serializers.requestHeadingSerializers import *






###############################################################
##########################  Add Course Type #######################
@api_view(['GET', 'POST'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def courseType_list(request, format=None):
    if request.method == 'GET':
        paginator = PageNumberPagination()
        snippets = Type_of_Course.objects.all().order_by('-updated_at')
        snippets = paginator.paginate_queryset(snippets, request)
        serializer = TypeOfCourseManagementSerializer(snippets, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = TypeOfCourseManagementSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            current_user = request.user
            autherName = current_user.username
            data = RequestHeading(requestID='CourseType',request_author=autherName,
            request_action_description='New Course Type "'+request.data['courseTypeName']+'" has been added by '+autherName+'',request_action_url='course_type_list',
            request_view_status=False)
            data.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET','PUT','DELETE'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def courseType_detail(request, pk, format=None):
    try:
        courseIDDatat = Type_of_Course.objects.get(pk=pk)
    except Type_of_Course.DoesNotExist:
        return Response({'message': 'Type Of Course Not Found! '},status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = TypeOfCourseManagementSerializer(courseIDDatat)
        return JsonResponse(serializer.data, status=200, safe=False)
    if request.method == 'PUT':
        serializer = TypeOfCourseManagementSerializer(courseIDDatat, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            current_user = request.user
            autherName = current_user.username
            data = RequestHeading(requestID='CourseType',request_author=autherName,
            request_action_description='Course Type "'+request.data['courseTypeName']+'" has been updated by '+autherName+'',request_action_url='course_type_list',
            request_view_status=False)
            data.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        try:
            courseIDDatat.delete()
            return Response({'data':{},'status':True,'message':"Course Type Delted"},status=200)
        except:
            return Response({'data':{},'status':False,'message':"Course Type Attched with Someone"},status=403)
        








###############################################################
##########################  Add Course #########################
@api_view(['GET', 'POST'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def course_list(request, format=None):
    if request.method == 'GET':
        paginator = PageNumberPagination()
        snippets = Courses.objects.all().order_by('-updated_at')
        snippets = paginator.paginate_queryset(snippets, request)
        serializer = CourseSerializer(snippets, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = CourseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            current_user = request.user
            autherName = current_user.username
            data = RequestHeading(requestID='Course',request_author=autherName,
            request_action_description='New Course "'+request.data['courseName']+'" has been added by '+autherName+'',request_action_url='course_list',
            request_view_status=False)
            data.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    


@api_view(['GET','PUT','DELETE'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def course_detail(request, pk, format=None):
    try:
        courseIDDatat = Courses.objects.get(pk=pk)
    except Courses.DoesNotExist:
        return Response({'message': 'Course Not Found! '},status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = CourseSerializer(courseIDDatat)
        print(serializer.data)
        return JsonResponse(serializer.data, status=200, safe=False)
    if request.method == 'PUT':
        serializer = CourseSerializer(courseIDDatat, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            current_user = request.user
            autherName = current_user.username
            data = RequestHeading(requestID='Course',request_author=autherName,
            request_action_description='Course "'+request.data['courseName']+'" has been updated by '+autherName+'',request_action_url='course_list',
            request_view_status=False)
            data.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        try:
            courseIDDatat.delete()
            return Response({'data':{},'status':True,'message':"Course Deleted"},status=200)
        except:
            return Response({'data':{},'status':False,'message':"Course  Attched with Someone"},status=403)










###############################################################
##########################  Add Subject #######################
@api_view(['GET', 'POST'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def subject_list(request, format=None):
    if request.method == 'GET':
        paginator = PageNumberPagination()
        snippets = Subjects.objects.all().order_by('-updated_at')
        snippets = paginator.paginate_queryset(snippets, request)
        serializer = SubjectsSerializer(snippets, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = SubjectsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            current_user = request.user
            autherName = current_user.username
            data = RequestHeading(requestID='Subject',request_author=autherName,
            request_action_description='New Subject "'+request.data['subjectName']+'" has been added by '+autherName+'',request_action_url='Subject-list',
            request_view_status=False)
            data.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET','PUT','DELETE'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def subject_detail(request, pk, format=None):
    try:
        courseIDDatat = Subjects.objects.get(pk=pk)
    except Subjects.DoesNotExist:
        return Response({'message': 'Subjects Not Found! '},status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = SubjectsSerializer(courseIDDatat)
        print(serializer.data)
        return JsonResponse(serializer.data, status=200, safe=False)
    if request.method == 'PUT':
        serializer = SubjectsSerializer(courseIDDatat, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            current_user = request.user
            autherName = current_user.username
            data = RequestHeading(requestID='Subject',request_author=autherName,
            request_action_description='Subject "'+request.data['subjectName']+'" has been updated by '+autherName+'',request_action_url='Subject-list',
            request_view_status=False)
            data.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        try:
            courseIDDatat.delete()
            return Response({'data':{},'status':True,'message':"Subject Deleted"},status=200)
        except:
            return Response({'data':{},'status':False,'message':"Subject Attched with Someone"},status=403)






###############################################################
##########################  AssignSubjectToCourse #######################
@api_view(['GET', 'POST'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def assignCourse_list(request, format=None):
    if request.method == 'GET':
        paginator = PageNumberPagination()
        snippets = AssignSubjectToCourse.objects.all().order_by('-updated_at')
        snippets = paginator.paginate_queryset(snippets, request)
        serializer = GetAssignSubjectToCourseSerializer(snippets, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = AssignSubjectToCourseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'data':serializer.data,'status':True,'message':'success'}, status=200)
        return Response({'data':serializer.errors,'status':False,'message':'success'}, status=400)



@api_view(['GET','PUT','DELETE'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def assignCourse_detail(request, pk, format=None):
    try:
        courseIDDatat = AssignSubjectToCourse.objects.get(pk=pk)
    except AssignSubjectToCourse.DoesNotExist:
        return Response({'message': 'Assigned Subject To Course Not Found! '},status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = GetAssignSubjectToCourseSerializer(courseIDDatat)
        return JsonResponse(serializer.data, status=200, safe=False)
    if request.method == 'PUT':
        serializer = AssignSubjectToCourseSerializer(courseIDDatat, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'data':serializer.data,'status':True,'message':'success'}, status=200)
        return Response({'data':serializer.errors,'status':False,'message':'success'}, status=400)

    elif request.method == 'DELETE':
        try:
            courseIDDatat.delete()
            return Response({'data':{},'status':True,'message':"Assigned  Course Deleted"},status=200)
        except:
            return Response({'data':{},'status':False,'message':"Assign Subject To Course  Attched with Someone"},status=403)



@api_view(['GET'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def getSubjectAccordingToCourse(request, pk, format=None):
    if request.method == 'GET':
        try:
            courseIDDatat = AssignSubjectToCourse.objects.get(courseFK__id=pk)
            serializer = GetAssignSubjectToCourseSerializer(courseIDDatat)
            return Response({'data':serializer.data,'status':True,'message':'success'}, status=200)
        except AssignSubjectToCourse.DoesNotExist:
            return Response({'data':{},'status':False,'message':'fail'}, status=400)





###############################################################
##########################  AssignTopicToSubject #######################
@api_view(['GET', 'POST'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def assignSubjectTotopic_list(request, format=None):
    if request.method == 'GET':
        courseID = request.query_params.get('courseID')
        subjectID = request.query_params.get('subjectID')
        if courseID != None and subjectID != None:
            snippets = AssignTopicToSubject.objects.filter(select_courseFK=courseID,selectsubjectFK=subjectID)
            serializer = AssignSubjectTotopicSerializer(snippets, many=True)
            return Response(serializer.data)
        else:
            return Response("Please Provide Correct key Parameter")
    elif request.method == 'POST':
        try:
            data = AssignTopicToSubject.objects.get(select_courseFK__id=int(request.data['select_courseFK']),selectsubjectFK__id=int(request.data['selectsubjectFK']))
            newTopicList = data.topicsList +','+ request.data['topicsList']
            newTopicList = set(newTopicList.split(','))
            newTopicList = ','.join(list(newTopicList))
            data.topicsList =  newTopicList
            data.save()
            current_user = request.user
            autherName = current_user.username
            data1 = RequestHeading(requestID='Topic',request_author=autherName,
            request_action_description='New Topic "'+request.data['topicsList']+'" has been added by '+autherName+'',request_action_url='topic_list',
            request_view_status=False)
            data1.save()
            serializer = AssignSubjectTotopicSerializer(data)
            return Response({'data':serializer.data,'message':'Add Successfully','status':True})
        except AssignTopicToSubject.DoesNotExist:
            serializer = AssignSubjectTotopicSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                print('Role data 02 >>>>', request.data['topicsList'])
                current_user = request.user
                autherName = current_user.username
                data1 = RequestHeading(requestID='Topic',request_author=autherName,
                request_action_description='New Topic "'+request.data['topicsList']+'" has been added by '+autherName+'',request_action_url='topic_list',
                request_view_status=False)
                data1.save()
                return Response({'data':serializer.data,'message':'Add Successfully','status':True},status=404)
            return Response({'data':serializer.errors,'message':'fail','status':False},status=404)



@api_view(['GET','PUT','DELETE'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def assignSubjectTotopic_detail(request, pk, format=None):
    try:
        courseIDDatat = AssignTopicToSubject.objects.get(pk=pk)
    except AssignTopicToSubject.DoesNotExist:
        return Response({'message': 'authority Not Found! '},status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = AssignSubjectTotopicSerializer(courseIDDatat)
        print(serializer.data)
        return JsonResponse(serializer.data, status=200, safe=False)
    if request.method == 'PUT':
        serializer = AssignSubjectTotopicSerializer(courseIDDatat, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            print('Role data 03 >>>>', request.data['topicsList'])
            current_user = request.user
            autherName = current_user.username
            data1 = RequestHeading(requestID='Topic',request_author=autherName,
            request_action_description='Topic "'+request.data['topicsList']+'" has been updated by '+autherName+'',request_action_url='topic_list',
            request_view_status=False)
            data1.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        try:
            courseIDDatat.delete()
            return Response({'data':{},'status':True,'message':"Assigned Subject to Course Attched with Someone"},status=200)
        except:
            return Response({'data':{},'status':False,'message':"Topic  Attched with Someone"},status=403)




@api_view(['GET'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def getSubjectList_formCourse(request):
    courseType = request.query_params.get('courseType')
    courseName = request.query_params.get('courseName')
    try:
        data = AssignSubjectToCourse.objects.get(type_of_courseFK=int(courseType),courseFK=int(courseName))
        dataCourse = AssignSubjectToCourseSerializer(data)
        subjectList = Subjects.objects.filter(id__in=dataCourse.data['subjectNameFK'])
        dataSubject = SubjectsSerializer(subjectList, many=True)
        return Response(dataSubject.data)
    except AssignSubjectToCourse.DoesNotExist:
        return Response({'message':"Subject not found"})

