from django.http import HttpResponse, JsonResponse
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.decorators import api_view, permission_classes, authentication_classes, parser_classes
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from knox.auth import TokenAuthentication
from rest_framework.response import Response
from django.db.models import Q
from rest_framework.pagination import PageNumberPagination
from django.contrib.auth.models import User
from itertools import groupby
from operator import itemgetter




# Custome Import
from ..serializers.studentManagementSerializers import *
from ..serializers.batchManagementSerializers import *
from ..serializers.resourceManagementSerializers import *
from ..serializers.rolesManagementSerializers import *
from ..serializers.questionBankManagementSerializers import *
from ..serializers.examManagementSerializers import *
from ..serializers.adminProfileManagementSerializers import *
from ..serializers.resultManagementSerializers import *
from .helper.dataRenderFunction import *
import json







@api_view(['GET'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def studentSearch(request, format=None):
    keyData = request.query_params.get('q')
    if keyData != None:
        paginator = PageNumberPagination()
        snippets = StudentManagement.objects.filter(
            Q(referUser__username__icontains=keyData) |
            Q(mobileNumber__icontains=keyData)
            )
        snippets = paginator.paginate_queryset(snippets, request)
        snippets = StudentRenderData(snippets)
        return Response(snippets)
    else:
        return Response("Please Provide Correct key Parameter")


@api_view(['GET'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def batchSearch(request, format=None):
    keyData = request.query_params.get('q')
    if keyData != None:
        paginator = PageNumberPagination()
        snippets = BatchtManagement.objects.filter(
            Q(batchName__icontains=keyData) |
            Q(batchID__icontains=keyData)
            )
        snippets = paginator.paginate_queryset(snippets, request)
        serializer = BatchtManagementSerializer(snippets, many=True)
        return Response(serializer.data)
    else:
        return Response("Please Provide Correct key Parameter")



@api_view(['GET'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def resourceSearch(request, format=None):
    keyData = request.query_params.get('q')
    if keyData != None:
        paginator = PageNumberPagination()
        snippets = ResourceManagement.objects.filter(
            Q(referUser__username__icontains=keyData) |
            Q(mobileNumber__icontains=keyData)
            )
        snippets = paginator.paginate_queryset(snippets, request)
        data = GetResourceManagementSerializer(snippets,many=True)
        return Response(data.data)
    else:
        return Response("Please Provide Correct key Parameter")








@api_view(['GET'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def courseTypeSearch(request, format=None):
    keyData = request.query_params.get('q')
    if keyData != None:
        paginator = PageNumberPagination()
        snippets = Type_of_Course.objects.filter(
            Q(courseTypeID__icontains=keyData) |
            Q(courseTypeName__icontains=keyData)
            )
        snippets = paginator.paginate_queryset(snippets, request)
        serila = GetTypeOfCourseManagementSerializer(snippets, many=True)
        return Response({'data':serila.data,'status':True,'message':'success'})
    else:
        return Response({'data':{},'status':False,'message':'Some thing went worng'})


@api_view(['GET'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def SubjectsSearch(request, format=None):
    keyData = request.query_params.get('q')
    if keyData != None:
        paginator = PageNumberPagination()
        snippets = Subjects.objects.filter(
            Q(subjectID__icontains=keyData) |
            Q(subjectName__icontains=keyData)
            )
        snippets = paginator.paginate_queryset(snippets, request)
        serila = SubjectsSerializer(snippets, many=True)
        return Response({'data':serila.data,'status':True,'message':'success'})
    else:
        return Response({'data':{},'status':False,'message':'Some thing went worng'})




@api_view(['GET'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def CourseSearch(request, format=None):
    keyData = request.query_params.get('q')
    if keyData != None:
        paginator = PageNumberPagination()
        snippets = Courses.objects.filter(
            Q(courseID__icontains=keyData) |
            Q(courseName__icontains=keyData)
            )
        snippets = paginator.paginate_queryset(snippets, request)
        serila = GETCourseSerializer(snippets, many=True)
        return Response({'data':serila.data,'status':True,'message':'success'})
    else:
        return Response({'data':{},'status':False,'message':'Some thing went worng'})



@api_view(['GET'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def AssignSubjectToCourseSearch(request, format=None):
    keyData = request.query_params.get('q')
    if keyData != None:
        paginator = PageNumberPagination()
        snippets = AssignSubjectToCourse.objects.filter(
            Q(type_of_courseFK__courseTypeName__icontains=keyData) |
            Q(courseFK__courseName__icontains=keyData)
            )
        snippets = paginator.paginate_queryset(snippets, request)
        serila = GETAssignSubjectToCourseSerializer(snippets, many=True)
        return Response({'data':serila.data,'status':True,'message':'success'})
    else:
        return Response({'data':{},'status':False,'message':'Some thing went worng'})



@api_view(['GET'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def roleSearch(request, format=None):
    keyData = request.query_params.get('q')
    if keyData != None:
        paginator = PageNumberPagination()
        snippets = RolesManagement.objects.filter(
            Q(roleID__icontains=keyData) |
            Q(roleName__icontains=keyData)
            )
        snippets = paginator.paginate_queryset(snippets, request)
        serializer = RolesManagementSerializer(snippets, many=True)
        return Response(serializer.data)
    else:
        return Response("Please Provide Correct key Parameter")



@api_view(['GET'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def questionFilterData(request, format=None):
    keyData = request.query_params
    print(keyData['label_search'])
    if keyData != None:
        paginator = PageNumberPagination()
        if keyData['label_search'] == 'MainFilter':
            if int(keyData['subject']) != 0 and len(keyData['topic']) == 0 and int(keyData['course']) != 0:
                print("Only Subject Not 0 and Topic 0")
                data = QuestionBank_Question.objects.filter(
                        Q(refrence_Questions_Type_Detail__selectCourse=keyData['course'])&
                        Q(refrence_Questions_Type_Detail__selectSubject=keyData['subject'])&
                        Q(created_at__year= keyData['year']))
                snippets = paginator.paginate_queryset(data, request)
                serializer = GetQuestionBank_QuestionSerializer(snippets, many=True)
                return Response(serializer.data)
            elif len(keyData['topic']) != 0 and int(keyData['subject']) != 0 and int(keyData['course']) != 0:
                print("Only Subject && Topic Both  Not 0")
                data = QuestionBank_Question.objects.filter(
                        Q(refrence_Questions_Type_Detail__selectCourse=keyData['course'])&
                        Q(refrence_Questions_Type_Detail__selectSubject=keyData['subject'])& 
                        Q(refrence_Questions_Type_Detail__Topic=keyData['topic']) &
                        Q(created_at__year= keyData['year']))
                print(data)
                snippets = paginator.paginate_queryset(data, request)
                serializer = GetQuestionBank_QuestionSerializer(snippets, many=True)
                return Response(serializer.data)
            elif len(keyData['topic']) == 0 and int(keyData['subject']) == 0 and int(keyData['course']) != 0:
                print("Only Subject && Topic Blank")
                data = QuestionBank_Question.objects.filter(
                        Q(refrence_Questions_Type_Detail__selectCourse=keyData['course']) &
                        Q(created_at__year= keyData['year']))
                print(data)
                snippets = paginator.paginate_queryset(data, request)
                serializer = GetQuestionBank_QuestionSerializer(snippets, many=True)
                return Response(serializer.data)
            else:
                print("Only Course ,Subject && Topic All Blank")
                data = QuestionBank_Question.objects.filter(
                        Q(created_at__year= keyData['year']))
                print(data)
                snippets = paginator.paginate_queryset(data, request)
                serializer = GetQuestionBank_QuestionSerializer(snippets, many=True)
                return Response(serializer.data)
        if keyData['label_search'] == 'SubFilter':
            # / Single Sub Filter Selected
            if len(eval(keyData['bydifficulty'])) != 0 and len(eval(keyData['quesType'])) == 0 and len(eval(keyData['byMarks'])) == 0 and len(eval(keyData['language'])) == 0:
                data = QuestionBank_Question.objects.filter(
                    Q(refrence_Questions_Type_Detail__difficultyLevel__in=eval(keyData['bydifficulty'])) &
                    Q(created_at__year= keyData['year']))
                snippets = paginator.paginate_queryset(data, request)
                serializer = GetQuestionBank_QuestionSerializer(snippets, many=True)
                return Response(serializer.data)
            if len(eval(keyData['quesType'])) != 0 and len(eval(keyData['bydifficulty'])) == 0 and len(eval(keyData['byMarks'])) == 0 and len(eval(keyData['language'])) == 0:
                data = QuestionBank_Question.objects.filter(
                    Q(refrence_Questions_Type_Detail__difficultyLevel__in=eval(keyData['quesType'])) &
                    Q(created_at__year= keyData['year']))
                snippets = paginator.paginate_queryset(data, request)
                serializer = GetQuestionBank_QuestionSerializer(snippets, many=True)
                return Response(serializer.data)
            if len(eval(keyData['byMarks'])) != 0 and len(eval(keyData['quesType'])) == 0 and len(eval(keyData['bydifficulty'])) == 0 and len(eval(keyData['language'])) == 0:
                data = QuestionBank_Question.objects.filter(
                    Q(refrence_Questions_Type_Detail__difficultyLevel__in=eval(keyData['byMarks'])) &
                    Q(created_at__year= keyData['year']))
                snippets = paginator.paginate_queryset(data, request)
                serializer = GetQuestionBank_QuestionSerializer(snippets, many=True)
                return Response(serializer.data)
            if len(eval(keyData['language'])) != 0 and len(eval(keyData['quesType'])) == 0 and len(eval(keyData['byMarks'])) == 0 and len(eval(keyData['bydifficulty'])) == 0:
                data = QuestionBank_Question.objects.filter(
                    Q(refrence_Questions_Type_Detail__difficultyLevel__in=eval(keyData['language'])) &
                    Q(created_at__year= keyData['year']))
                snippets = paginator.paginate_queryset(data, request)
                serializer = GetQuestionBank_QuestionSerializer(snippets, many=True)
                return Response(serializer.data)

            # Double Selected
# Condition 1
            if len(eval(keyData['bydifficulty'])) != 0 and len(eval(keyData['quesType'])) != 0 and len(eval(keyData['byMarks'])) == 0 and len(eval(keyData['language'])) == 0:
                data = QuestionBank_Question.objects.filter(
                    Q(refrence_Questions_Type_Detail__difficultyLevel__in=eval(keyData['bydifficulty'])) &
                    Q(refrence_Questions_Type_Detail__difficultyLevel__in=eval(keyData['quesType'])) &
                    Q(created_at__year= keyData['year']))
                snippets = paginator.paginate_queryset(data, request)
                serializer = GetQuestionBank_QuestionSerializer(snippets, many=True)
                return Response(serializer.data)
            if len(eval(keyData['bydifficulty'])) != 0 and len(eval(keyData['quesType'])) == 0 and len(eval(keyData['byMarks'])) != 0 and len(eval(keyData['language'])) == 0:
                data = QuestionBank_Question.objects.filter(
                    Q(refrence_Questions_Type_Detail__difficultyLevel__in=eval(keyData['quesType'])) &
                    Q(refrence_Questions_Type_Detail__difficultyLevel__in=eval(keyData['byMarks'])) &
                    Q(created_at__year= keyData['year']))
                snippets = paginator.paginate_queryset(data, request)
                serializer = GetQuestionBank_QuestionSerializer(snippets, many=True)
                return Response(serializer.data)
            if len(eval(keyData['bydifficulty'])) != 0 and len(eval(keyData['quesType'])) == 0 and len(eval(keyData['byMarks'])) == 0 and len(eval(keyData['language'])) != 0:
                data = QuestionBank_Question.objects.filter(
                    Q(refrence_Questions_Type_Detail__difficultyLevel__in=eval(keyData['quesType'])) &
                    Q(refrence_Questions_Type_Detail__difficultyLevel__in=eval(keyData['language'])) &
                    Q(created_at__year= keyData['year']))
                snippets = paginator.paginate_queryset(data, request)
                serializer = GetQuestionBank_QuestionSerializer(snippets, many=True)
                return Response(serializer.data)
# Condition 2 
            if len(eval(keyData['bydifficulty'])) == 0 and len(eval(keyData['quesType'])) != 0 and len(eval(keyData['byMarks'])) != 0 and len(eval(keyData['language'])) == 0:
                data = QuestionBank_Question.objects.filter(
                    Q(refrence_Questions_Type_Detail__difficultyLevel__in=eval(keyData['bydifficulty'])) &
                    Q(refrence_Questions_Type_Detail__difficultyLevel__in=eval(keyData['byMarks'])) &
                    Q(created_at__year= keyData['year']))
                snippets = paginator.paginate_queryset(data, request)
                serializer = GetQuestionBank_QuestionSerializer(snippets, many=True)
                return Response(serializer.data)
            if len(eval(keyData['bydifficulty'])) == 0 and len(eval(keyData['quesType'])) != 0 and len(eval(keyData['byMarks'])) == 0 and len(eval(keyData['language'])) != 0:
                data = QuestionBank_Question.objects.filter(
                    Q(refrence_Questions_Type_Detail__difficultyLevel__in=eval(keyData['quesType'])) &
                    Q(refrence_Questions_Type_Detail__difficultyLevel__in=eval(keyData['language'])) &
                    Q(created_at__year= keyData['year']))
                snippets = paginator.paginate_queryset(data, request)
                serializer = GetQuestionBank_QuestionSerializer(snippets, many=True)
                return Response(serializer.data)
# Condtion --3
            if len(eval(keyData['bydifficulty'])) == 0 and len(eval(keyData['quesType'])) != 0 and len(eval(keyData['byMarks'])) != 0 and len(eval(keyData['language'])) != 0:
                data = QuestionBank_Question.objects.filter(
                    Q(refrence_Questions_Type_Detail__difficultyLevel__in=eval(keyData['quesType'])) &
                    Q(refrence_Questions_Type_Detail__difficultyLevel__in=eval(keyData['byMarks'])) &
                    Q(created_at__year= keyData['year']))
                snippets = paginator.paginate_queryset(data, request)
                serializer = GetQuestionBank_QuestionSerializer(snippets, many=True)
                return Response(serializer.data)
    # Three Selected
            if len(eval(keyData['bydifficulty'])) == 0 and len(eval(keyData['quesType'])) != 0 and len(eval(keyData['byMarks'])) != 0 and len(eval(keyData['language'])) == 0:
                data = QuestionBank_Question.objects.filter(
                    Q(refrence_Questions_Type_Detail__difficultyLevel__in=eval(keyData['quesType'])) &
                    Q(refrence_Questions_Type_Detail__difficultyLevel__in=eval(keyData['byMarks'])) &
                    Q(created_at__year= keyData['year']))
                snippets = paginator.paginate_queryset(data, request)
                serializer = GetQuestionBank_QuestionSerializer(snippets, many=True)
                return Response(serializer.data)

            if len(eval(keyData['bydifficulty'])) != 0 and len(eval(keyData['quesType'])) != 0 and len(eval(keyData['byMarks'])) == 0 and len(eval(keyData['language'])) != 0:
                data = QuestionBank_Question.objects.filter(
                    Q(refrence_Questions_Type_Detail__difficultyLevel__in=eval(keyData['quesType'])) &
                    Q(refrence_Questions_Type_Detail__difficultyLevel__in=eval(keyData['language'])) &
                    Q(created_at__year= keyData['year']))
                snippets = paginator.paginate_queryset(data, request)
                serializer = GetQuestionBank_QuestionSerializer(snippets, many=True)
                return Response(serializer.data)
            if len(eval(keyData['bydifficulty'])) != 0 and len(eval(keyData['quesType'])) == 0 and len(eval(keyData['byMarks'])) != 0 and len(eval(keyData['language'])) != 0:
                data = QuestionBank_Question.objects.filter(
                    Q(refrence_Questions_Type_Detail__difficultyLevel__in=eval(keyData['bydifficulty'])) &
                     Q(refrence_Questions_Type_Detail__difficultyLevel__in=eval(keyData['language'])) &
                    Q(created_at__year= keyData['year']))
                snippets = paginator.paginate_queryset(data, request)
                serializer = GetQuestionBank_QuestionSerializer(snippets, many=True)
                return Response(serializer.data)
            if len(eval(keyData['bydifficulty'])) == 0 and len(eval(keyData['quesType'])) != 0 and len(eval(keyData['byMarks'])) != 0 and len(eval(keyData['language'])) != 0:
                data = QuestionBank_Question.objects.filter(
                    Q(refrence_Questions_Type_Detail__difficultyLevel__in=eval(keyData['quesType'])) &
                    Q(refrence_Questions_Type_Detail__difficultyLevel__in=eval(keyData['language'])) &
                    Q(created_at__year= keyData['year']))
                snippets = paginator.paginate_queryset(data, request)
                serializer = GetQuestionBank_QuestionSerializer(snippets, many=True)
                return Response(serializer.data)

            # Four Selected
            if len(eval(keyData['bydifficulty'])) != 0 and len(eval(keyData['quesType'])) != 0 and len(eval(keyData['byMarks'])) != 0 and len(eval(keyData['language'])) != 0:
                data = QuestionBank_Question.objects.filter(
                    Q(refrence_Questions_Type_Detail__difficultyLevel__in=eval(keyData['bydifficulty'])) &
                     Q(refrence_Questions_Type_Detail__difficultyLevel__in=eval(keyData['quesType'])) &
                      Q(refrence_Questions_Type_Detail__difficultyLevel__in=eval(keyData['byMarks'])) &
                       Q(refrence_Questions_Type_Detail__difficultyLevel__in=eval(keyData['language'])) &
                    Q(created_at__year= keyData['year']))
                snippets = paginator.paginate_queryset(data, request)
                serializer = GetQuestionBank_QuestionSerializer(snippets, many=True)
                return Response(serializer.data)
            

        if keyData['label_search'] == 'MixFilter':
            pass
        







        if keyData['label_search'] == 'diffQT':
            data = QuestionBank_Question.objects.filter(
                    Q(refrence_Questions_Type_Detail__difficultyLevel__in=eval(keyData['bydifficulty'])) &
                    Q(created_at__year= keyData['year']))
            snippets = paginator.paginate_queryset(data, request)
            serializer = GetQuestionBank_QuestionSerializer(snippets, many=True)
            return Response(serializer.data)
        elif keyData['label_search'] == 'quesTypeQT':
            data = QuestionBank_Question.objects.filter(
                    Q(refrence_Questions_Type_Detail__questionType__in=eval(keyData['quesType'])) &
                    Q(created_at__year= keyData['year']))
            print(data)
            snippets = paginator.paginate_queryset(data, request)
            serializer = GetQuestionBank_QuestionSerializer(snippets, many=True)
            return Response(serializer.data)
        elif keyData['label_search'] == 'langQT':
            data = QuestionBank_Question.objects.filter(
                    Q(selectLanguage__in=eval(keyData['language'])) &
                    Q(created_at__year= keyData['year']))
            print(data)
            snippets = paginator.paginate_queryset(data, request)
            serializer = GetQuestionBank_QuestionSerializer(snippets, many=True)
            return Response(serializer.data)
        elif keyData['label_search'] == 'markQT':
            data = QuestionBank_Question.objects.filter(
                    Q(refrence_Questions_Type_Detail__correctMarks__in=eval(keyData['byMarks'])) &
                    Q(created_at__year= keyData['year']))
            print(data)
            snippets = paginator.paginate_queryset(data, request)
            serializer = GetQuestionBank_QuestionSerializer(snippets, many=True)
            return Response(serializer.data)
        elif keyData['label_search'] == 'mainFilter':
            if int(keyData['subject']) != 0 and len(keyData['topic']) == 0 and int(keyData['course']) != 0:
                print("Only Subject Not 0 and Topic 0")
                data = QuestionBank_Question.objects.filter(
                        Q(refrence_Questions_Type_Detail__selectCourse=keyData['course'])&
                        Q(refrence_Questions_Type_Detail__selectSubject=keyData['subject'])&
                        Q(created_at__year= keyData['year']))
                snippets = paginator.paginate_queryset(data, request)
                serializer = GetQuestionBank_QuestionSerializer(snippets, many=True)
                return Response(serializer.data)
            elif len(keyData['topic']) != 0 and int(keyData['subject']) != 0 and int(keyData['course']) != 0:
                print("Only Subject && Topic Both  Not 0")
                data = QuestionBank_Question.objects.filter(
                        Q(refrence_Questions_Type_Detail__selectCourse=keyData['course'])&
                        Q(refrence_Questions_Type_Detail__selectSubject=keyData['subject'])& 
                        Q(refrence_Questions_Type_Detail__Topic=keyData['topic']) &
                        Q(created_at__year= keyData['year']))
                print(data)
                snippets = paginator.paginate_queryset(data, request)
                serializer = GetQuestionBank_QuestionSerializer(snippets, many=True)
                return Response(serializer.data)
            elif len(keyData['topic']) == 0 and int(keyData['subject']) == 0 and int(keyData['course']) != 0:
                print("Only Subject && Topic Blank")
                data = QuestionBank_Question.objects.filter(
                        Q(refrence_Questions_Type_Detail__selectCourse=keyData['course']) &
                        Q(created_at__year= keyData['year']))
                print(data)
                snippets = paginator.paginate_queryset(data, request)
                serializer = GetQuestionBank_QuestionSerializer(snippets, many=True)
                return Response(serializer.data)
            else:
                print("Only Course ,Subject && Topic All Blank")
                data = QuestionBank_Question.objects.filter(
                        Q(created_at__year= keyData['year']))
                print(data)
                snippets = paginator.paginate_queryset(data, request)
                serializer = GetQuestionBank_QuestionSerializer(snippets, many=True)
                return Response(serializer.data)
        elif keyData['label_search'] == 'diffQT__quesTypeQT':
            print("Difficult Question and Question Type")
            data = QuestionBank_Question.objects.filter(
                Q(refrence_Questions_Type_Detail__difficultyLevel__in=eval(keyData['bydifficulty'])) &
                Q(refrence_Questions_Type_Detail__questionType__in=eval(keyData['quesType'])) &
                    Q(created_at__year= keyData['year']))
            snippets = paginator.paginate_queryset(data, request)
            serializer = GetQuestionBank_QuestionSerializer(snippets, many=True)
            return Response(serializer.data)
        elif keyData['label_search'] == 'diffQT__langQT':
            print("Difficult Question and Question Type")
            data = QuestionBank_Question.objects.filter(
                Q(refrence_Questions_Type_Detail__difficultyLevel__in=eval(keyData['bydifficulty'])) &
                Q(refrence_Questions_Type_Detail__questionType__in=eval(keyData['language'])) &
                    Q(created_at__year= keyData['year']))
            snippets = paginator.paginate_queryset(data, request)
            serializer = GetQuestionBank_QuestionSerializer(snippets, many=True)
            return Response(serializer.data)
        elif keyData['label_search'] == 'diffQT__markQT':
            print("Difficult Question and Question Type")
            data = QuestionBank_Question.objects.filter(
                Q(refrence_Questions_Type_Detail__difficultyLevel__in=eval(keyData['bydifficulty'])) &
                Q(refrence_Questions_Type_Detail__questionType__in=eval(keyData['byMarks'])) &
                    Q(created_at__year= keyData['year']))
            snippets = paginator.paginate_queryset(data, request)
            serializer = GetQuestionBank_QuestionSerializer(snippets, many=True)
            return Response(serializer.data)
        elif keyData['label_search'] == 'diffQT__quesTypeQT__langQT':
            print("Difficult Question and Question Type")
            data = QuestionBank_Question.objects.filter(
                Q(refrence_Questions_Type_Detail__difficultyLevel__in=eval(keyData['bydifficulty'])) &
                Q(refrence_Questions_Type_Detail__questionType__in=eval(keyData['quesType'])) &
                Q(refrence_Questions_Type_Detail__difficultyLevel__in=eval(keyData['byMarks'])) &
                    Q(created_at__year= keyData['year']))
            snippets = paginator.paginate_queryset(data, request)
            serializer = GetQuestionBank_QuestionSerializer(snippets, many=True)
            return Response(serializer.data)
        elif keyData['label_search'] == 'diffQT__quesTypeQT__markQT':
            print("Difficult Question and Question Type")
            data = QuestionBank_Question.objects.filter(
                Q(refrence_Questions_Type_Detail__difficultyLevel__in=eval(keyData['bydifficulty'])) &
                Q(refrence_Questions_Type_Detail__questionType__in=eval(keyData['quesType'])) &
                Q(refrence_Questions_Type_Detail__difficultyLevel__in=eval(keyData['byMarks'])) &
                Q(created_at__year= keyData['year']))
            snippets = paginator.paginate_queryset(data, request)
            serializer = GetQuestionBank_QuestionSerializer(snippets, many=True)
            return Response(serializer.data)
        elif keyData['label_search'] == 'quesTypeQT__markQT__langQT':
            print("Difficult Question and Question Type")
            data = QuestionBank_Question.objects.filter(
                Q(refrence_Questions_Type_Detail__difficultyLevel__in=eval(keyData['quesType'])) &
                Q(refrence_Questions_Type_Detail__questionType__in=eval(keyData['byMarks'])) &
                Q(refrence_Questions_Type_Detail__difficultyLevel__in=eval(keyData['language'])) &
                Q(created_at__year= keyData['year']))
            snippets = paginator.paginate_queryset(data, request)
            serializer = GetQuestionBank_QuestionSerializer(snippets, many=True)
            return Response(serializer.data)
        elif keyData['label_search'] == 'diffQT__quesTypeQT__markQT__langQT':
            print("Difficult Question and Question Type")
            data = QuestionBank_Question.objects.filter(
                Q(refrence_Questions_Type_Detail__difficultyLevel__in=eval(keyData['bydifficulty'])) &
                Q(refrence_Questions_Type_Detail__difficultyLevel__in=eval(keyData['quesType'])) &
                Q(refrence_Questions_Type_Detail__questionType__in=eval(keyData['byMarks'])) &
                Q(refrence_Questions_Type_Detail__difficultyLevel__in=eval(keyData['language'])) &
                Q(created_at__year= keyData['year']))
            snippets = paginator.paginate_queryset(data, request)
            serializer = GetQuestionBank_QuestionSerializer(snippets, many=True)
            return Response(serializer.data)
        

            # elif len(keyData['topic']) != 0:


        #  data = QuestionBank_Question.objects.filter(
        #             Q(refrence_Questions_Type_Detail__selectCourse=keyData['course'])|
        #             Q(refrence_Questions_Type_Detail__selectSubject=keyData['subject'])| 
        #             Q(refrence_Questions_Type_Detail__Topic=keyData['topic'])|
        #             Q(selectLanguage__in=eval(keyData['language']))|
        #             Q(refrence_Questions_Type_Detail__correctMarks__in=eval(keyData['byMarks']))|
        #             Q(refrence_Questions_Type_Detail__difficultyLevel__in=eval(keyData['bydifficulty']))|
        #             Q(refrence_Questions_Type_Detail__difficultyLevel__in=eval(keyData['bydifficulty']))|
        #             Q(refrence_Questions_Type_Detail__questionType__in=eval(keyData['quesType'])) &
        #             Q(created_at__year= keyData['year']))





@api_view(['GET'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def questionFilterBar(request, format=None):
    keyData = request.query_params.get('q')
    if keyData != None:
        paginator = PageNumberPagination()
        snippets = Question.objects.filter(Q(question__icontains=keyData))
        snippets = questionDataRender(snippets)
        snippets = paginator.paginate_queryset(snippets, request)
        # return Response({'data':snippets,'message':'success','status':True},status=200)
        return Response(snippets)
    else:
        # return Response({'data':{},'message':'Please Provide Correct key Parameter','status':False},status=404)
        return Response("Please Provide Correct key Parameter")


@api_view(['GET'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def questionAddTo_paper(request, format=None):
    course = request.query_params.get('course')
    subject = request.query_params.get('subject')
    languages = request.query_params.get('languages')
    questionType = request.query_params.get('questionType')
    topicType = request.query_params.get('topicType')
    dataQuestion = Question.objects.filter(refrence_QuestionBank_Question__questionType__in=eval(questionType),
                refrence_QuestionBank_Question__selectLanguage__in=eval(languages),
                refrence_QuestionBank_Question__refrence_Question_Associated__selectCourse__id=course,
                refrence_QuestionBank_Question__refrence_Question_Associated__selectSubject__id=subject
                )
    data = ConvertFilterinDict(dataQuestion)
    realData = []
    dataDict = {}
    ques_data = sorted(data, key = itemgetter('referQuestion'))
    for key, value in groupby(ques_data, key = itemgetter('referQuestion')):
        data = list(value)
        print(len(data),len(eval(languages)))
        if len(eval(languages)) == len(data):
            dataDict['quetionData'] = data
            realData.append(dataDict)
            dataDict = {}
    print(realData)
    return Response({'data':realData,'status':True,'message':"success"})

# define a fuction for key
def key_func(k):
    return k['referQuestion']








# batcharch


@api_view(['GET'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def checkExistDataStudent(request, format=None):
    keyData = request.query_params.get('q')
    typeVal = request.query_params.get('type_validation')
    if typeVal == "UsernameVal":
        if keyData != None:
            paginator = PageNumberPagination()
            snippets = StudentManagement.objects.filter(
                Q(referUser__username=keyData)
                )
            snippets = paginator.paginate_queryset(snippets, request)
            serila = GETStudentManagementSerializer(snippets, many=True)
            return Response({'data':serila.data,'status':True,'message':'success'})
        else:
            return Response({'data':{},'status':False,'message':'Some thing went worng'})
    elif typeVal == "EmailVal":
        if keyData != None:
            paginator = PageNumberPagination()
            snippets = StudentManagement.objects.filter(
                Q(referUser__email=keyData)
                )
            snippets = paginator.paginate_queryset(snippets, request)
            serila = GETStudentManagementSerializer(snippets, many=True)
            return Response({'data':serila.data,'status':True,'message':'success'})
        else:
            return Response({'data':{},'status':False,'message':'Some thing went worng'})
    elif typeVal == "ContactVal":
        if keyData != None:
            paginator = PageNumberPagination()
            snippets = StudentManagement.objects.filter(
                Q(mobileNumber=keyData)
                )
            snippets = paginator.paginate_queryset(snippets, request)
            serila = GETStudentManagementSerializer(snippets, many=True)
            return Response({'data':serila.data,'status':True,'message':'success'})
        else:
            return Response({'data':{},'status':False,'message':'Some thing went worng'})
    else:
        pass


@api_view(['GET'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def checkExistDataResource(request, format=None):
    keyData = request.query_params.get('q')
    typeVal = request.query_params.get('type_validation')
    if typeVal == "UsernameVal":
        if keyData != None:
            paginator = PageNumberPagination()
            snippets = ResourceManagement.objects.filter(
                Q(referUser__username=keyData)
                )
            snippets = paginator.paginate_queryset(snippets, request)
            serila = GetResourceManagementSerializer(snippets, many=True)
            return Response({'data':serila.data,'status':True,'message':'success'})
        else:
            return Response({'data':{},'status':False,'message':'Some thing went worng'})
    elif typeVal == "EmailVal":
        if keyData != None:
            paginator = PageNumberPagination()
            snippets = ResourceManagement.objects.filter(
                Q(referUser__email=keyData)
                )
            snippets = paginator.paginate_queryset(snippets, request)
            serila = GetResourceManagementSerializer(snippets, many=True)
            return Response({'data':serila.data,'status':True,'message':'success'})
        else:
            return Response({'data':{},'status':False,'message':'Some thing went worng'})
    elif typeVal == "ContactVal":
        if keyData != None:
            paginator = PageNumberPagination()
            snippets = ResourceManagement.objects.filter(
                Q(mobileNumber=keyData)
                )
            snippets = paginator.paginate_queryset(snippets, request)
            serila = GetResourceManagementSerializer(snippets, many=True)
            return Response({'data':serila.data,'status':True,'message':'success'})
        else:
            return Response({'data':{},'status':False,'message':'Some thing went worng'})
    else:
        pass
    




@api_view(['GET'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def checkExistDataAdmin(request, format=None):
    keyData = request.query_params.get('q')
    typeVal = request.query_params.get('type_validation')
    if typeVal == "UsernameVal":
        if keyData != None:
            paginator = PageNumberPagination()
            snippets = Profile.objects.filter(
                Q(refrence_user__username=keyData)
                )
            snippets = paginator.paginate_queryset(snippets, request)
            serila = GETAdminProfileManagementSerializer(snippets, many=True)
            return Response({'data':serila.data,'status':True,'message':'success'})
        else:
            return Response({'data':{},'status':False,'message':'Some thing went worng'})
    elif typeVal == "EmailVal":
        if keyData != None:
            paginator = PageNumberPagination()
            snippets = Profile.objects.filter(
                Q(refrence_user__email=keyData)
                )
            snippets = paginator.paginate_queryset(snippets, request)
            serila = GETAdminProfileManagementSerializer(snippets, many=True)
            return Response({'data':serila.data,'status':True,'message':'success'})
        else:
            return Response({'data':{},'status':False,'message':'Some thing went worng'})
    elif typeVal == "ContactVal":
        if keyData != None:
            paginator = PageNumberPagination()
            snippets = Profile.objects.filter(
                Q(mobile_number=keyData)
                )
            snippets = paginator.paginate_queryset(snippets, request)
            serila = GETAdminProfileManagementSerializer(snippets, many=True)
            return Response({'data':serila.data,'status':True,'message':'success'})
        else:
            return Response({'data':{},'status':False,'message':'Some thing went worng'})
    else:
        pass



@api_view(['GET'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def resultFilterData(request, format=None):
    keyData = request.query_params
    if keyData != None:
        paginator = PageNumberPagination()
        data = Eaxm_Paper.objects.filter(
                Q(examPapers__paperAssociateCourse=keyData['course'])&
                Q(examPapers__paperAssociateSubject=keyData['subject']) &
                Q(examPapers__created_at__year=keyData['year']) &
                Q(paperStatus="Completed"))
        snippets = paginator.paginate_queryset(data, request)
        serializer = GET_Eaxm_PaperSerializer(snippets, many=True)
        return Response(serializer.data)



@api_view(['GET'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def examPaper_search(request, format=None):
    keyData = request.query_params
    if keyData != None:
        paginator = PageNumberPagination()
        data = PaperManagement.objects.filter(
                Q(paperID__icontains=keyData['data'])|
                Q(paperName__icontains=keyData['data']))
        snippets = paginator.paginate_queryset(data, request)
        serializer = GETPaperManagementSerializer(snippets, many=True)
        return Response(serializer.data)
    


@api_view(['GET'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def examManagementSearch(request, format=None):
    keyData = request.query_params.get('q')
    keyexamfilter = request.query_params.get('examfilter')
    if keyData != None:
        paginator = PageNumberPagination()
        snippets = ExamManagement.objects.filter(
            Q(examName__icontains=keyData) |
            Q(examID__icontains=keyData) |
            Q(examType__icontains=keyData))
        snippets = paginator.paginate_queryset(snippets, request)
        dataL = []
        data = examMangementRenderData(snippets,dataL)
        return Response(data)
    else:
        return Response("Please Provide Correct key Parameter")

def checkExamPpaerStatus(lable):
    if lable == 'Next Year':
        return "Next Year"



@api_view(['GET'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def searchStudent_yeariwse(request, format=None):
    courseType = request.query_params.get('courseType')
    course = request.query_params.get('course')
    year_at = request.query_params.get('year')
    if courseType != None and course != None and year_at != None:
        paginator = PageNumberPagination()
        snippets = StudentManagement.objects.filter(
            Q(courseTypeFK=courseType) &
            Q(courseFK=course) &
            Q(created_at__year=year_at))
        snippets = paginator.paginate_queryset(snippets, request)
        data = GETStudentManagementSerializer(snippets, many=True)
        return Response(data.data)
    else:
        return Response("Please Provide Correct key Parameter")



@api_view(['GET'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def searchStudent_regis_or_mob(request, format=None):
    paraMeter = request.query_params.get('q')
    type_of_search = request.query_params.get('type_of_search')
    courseType = request.query_params.get('courseType')
    course = request.query_params.get('course')
    if paraMeter != None:
        if type_of_search == 'mobile_search':
            paginator = PageNumberPagination()
            snippets = StudentManagement.objects.filter(Q(courseTypeFK=courseType) &
            Q(courseFK=course) & Q(mobileNumber=paraMeter))
            snippets = paginator.paginate_queryset(snippets, request)
            data = GETStudentManagementSerializer(snippets, many=True)
            return Response(data.data)
        else:
            paginator = PageNumberPagination()
            snippets = StudentManagement.objects.filter(Q(referUser__username=paraMeter))
            snippets = paginator.paginate_queryset(snippets, request)
            data = GETStudentManagementSerializer(snippets, many=True)
            return Response(data.data)
    else:
        return Response("Please Provide Correct key Parameter")




@api_view(['GET'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def searchBatchCourse_CourseType(request, format=None):
    courseType = request.query_params.get('courseType')
    course = request.query_params.get('course')
    if courseType != None:
        paginator = PageNumberPagination()
        snippets = BatchtManagement.objects.filter(Q(batchCourseType__id=courseType) &
        Q(batchCourseName__id=course))
        snippets = paginator.paginate_queryset(snippets, request)
        data = BatchtManagementSerializer(snippets, many=True)
        return Response(data.data)
    return Response("Please Provide Correct key Parameter")





@api_view(['GET'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def searchExamCourse_CourseType_year(request, format=None):
    courseType = request.query_params.get('courseType')
    course = request.query_params.get('course')
    year = request.query_params.get('year')
    if courseType != None:
        paginator = PageNumberPagination()
        snippets = ExamManagement.objects.filter(Q(examAssociateCourseType__id=courseType) &
        Q(examAssociateCourse__id=course) & Q(created_at__year=year))
        snippets = paginator.paginate_queryset(snippets, request)
        data = GETExamManagementSerializer(snippets, many=True)
        return Response(data.data)
    return Response("Please Provide Correct key Parameter")
