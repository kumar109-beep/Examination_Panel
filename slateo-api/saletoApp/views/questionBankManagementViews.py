from django.http import HttpResponse, JsonResponse
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.decorators import api_view,permission_classes,authentication_classes,parser_classes
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from knox.auth import TokenAuthentication
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from django.db import IntegrityError
from django.http import QueryDict
from collections import OrderedDict
import json

# Custom Import
from ..serializers.questionBankManagementSerializers import *
from ..serializers.requestHeadingSerializers import *

@api_view(['GET', 'POST'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def questionBank_list(request, format=None):
    if request.method == 'GET':
        listData = []
        dicData = {}
        paginator = PageNumberPagination()
        snippets = QuestionBank_Question.objects.all().order_by('-updated_at')
        snippets = paginator.paginate_queryset(snippets, request)
        snippets = GetQuestionBank_QuestionSerializer(snippets, many=True)
        return Response({'data':snippets.data,'status':True,'message':'success'}, status=200)
    elif request.method == 'POST':
        data = request.data
        listA = []
        dictA = {}
        if isinstance(request.data, QueryDict):
            data = dict(zip(request.data.keys(), request.data.values()))
        if data['addType'] == 'primary':
            data['selectCourse'] = int(data['selectCourse'])
            data['questionType'] = int(data['questionType'])
            data['subQuestionType'] = int(data['subQuestionType'])
            data['difficultyLevel'] = int(data['difficultyLevel'])
            data['selectSubject'] = int(data['selectSubject'])
            data['languageList'] = data['selectLanguage'].split(',')
            data['CHECKlanguageList'] = data['selectLanguage'].split(',')
            data['lang_id'] = data['lang_id'].split('||')
            try:
                data_question = QuestionBank_Filters.objects.get(selectCourse=data['selectCourse'],selectSubject=data['selectSubject'],Topic=data['Topic'].strip(),questionType=data['questionType'])
                data['refrence_Questions_Type_Detail'] = int(data_question.id)
            except QuestionBank_Filters.DoesNotExist:
                serializer_question_filter = QuestionBank_FiltersSerializer(data=data)
                if serializer_question_filter.is_valid():
                    serializer_question_filter.save()
                    data['refrence_Questions_Type_Detail'] = int(serializer_question_filter.data['id'])
                else:
                    return Response({'data':serializer_question_filter.errors,'status':False,'message':'Something Went Worng, Try Again After Some Time'}, status=404)
         
            deletemsg = deleteKey(data)
            questionData = data['question_data']
            ExistquestionData = data['question_data']
            launguageIDs = data['lang_id']
            lagids = []
            count = 0
            optioList = []
            for lang in data['languageList']:
                data['selectLanguage'] = data['lang_id'][count]
                # lagids.append(data['lang_id'][count])
                data['question'] = questionData[count]['Question_'+ lang].strip()
                data['optionList'] = "NA"
                serializer_questions = QuestionBank_QuestionSerializer(data=data)
                try:
                    if serializer_questions.is_valid():
                        serializer_questions.save()
                        data['CHECKlanguageList'].remove(lang)
                        del questionData[count]['Question_'+ lang]
                    count = count + 1
                    optioList = []
                except IntegrityError:
                    ExistquestionData = [i for i in ExistquestionData if len(i) != 0 ]
                    exitCount = 0
                    existList = []
                    existdict = {}
                    for lang in data['CHECKlanguageList']:
                        dataExist = QuestionBank_Question.objects.filter(refrence_Questions_Type_Detail__id=int(data['refrence_Questions_Type_Detail']),
                                selectLanguage__id__in=launguageIDs,question=ExistquestionData[exitCount]['Question_'+ lang].strip())
                        print(dataExist)
                        if len(dataExist) > 0:
                            for i in dataExist:
                                existdict['id'] = i.id
                                existdict['language'] = lang
                                existdict['sameQuestionrefrence'] = i.sameQuestionrefrence
                                existdict['language_id'] = i.selectLanguage.id
                                existList.append(existdict)
                                existdict = {}
                        exitCount = exitCount + 1
                    return Response({'data':existList,'status':False,'message':'Question Already Exist'}, status=409)
                
            return Response({'data':"Question Created Successfully",'status':True,'message':'Question Sucessfully'}, status=201)
            # except IntegrityError:
            #     return Response({'data':{},'status':False,'message':'Question Already Exist'}, status=409)
        else:
            data['selectCourse'] = int(data['selectCourse'])
            data['questionType'] = int(data['questionType'])
            data['subQuestionType'] = int(data['subQuestionType'])
            data['difficultyLevel'] = int(data['difficultyLevel'])
            data['selectSubject'] = int(data['selectSubject'])
            data['languageList'] = data['selectLanguage'].split(',')
            data['CHECKlanguageList'] = data['selectLanguage'].split(',')
            data['lang_id'] = data['lang_id'].split('||')
            try:
                data_question = QuestionBank_Filters.objects.get(selectCourse=data['selectCourse'],selectSubject=data['selectSubject'],Topic=data['Topic'].strip(),questionType=data['questionType'])
                data['refrence_Questions_Type_Detail'] = int(data_question.id)
            except QuestionBank_Filters.DoesNotExist:
                serializer_question_filter = QuestionBank_FiltersSerializer(data=data)
                if serializer_question_filter.is_valid():
                    serializer_question_filter.save()
                    data['refrence_Questions_Type_Detail'] = int(serializer_question_filter.data['id'])
                else:
                    return Response({'data':serializer_question_filter.errors,'status':False,'message':'Something Went Worng, Try Again After Some Time'}, status=409)
            deletemsg = deleteKey(data)
            questionData = data['question_data']
            ExistquestionData = data['question_data']
            launguageIDs = data['lang_id']
            count = 0
            optioList = []
            flag = False
            
            for lang in data['languageList']:
                data['selectLanguage'] = data['lang_id'][count]
                data['question'] = questionData[count]['Question_'+ lang].strip()
                optioList.append(questionData[count]['option'].split('|'))
                optioList.append(questionData[count]['optionStatement'].split('<<-|->>'))
                data['optionList'] = str(optioList)
                serializer_questions = QuestionBank_QuestionSerializer(data=data)
                try:
                    if serializer_questions.is_valid():
                        serializer_questions.save()
                        data['CHECKlanguageList'].remove(lang)
                        del questionData[count]['Question_'+ lang]
                    count = count + 1
                    optioList = []

                except IntegrityError:
                    ExistquestionData = [i for i in ExistquestionData if len(i) != 0 ]
                    exitCount = 0
                    existList = []
                    existdict = {}
                    for lang in data['CHECKlanguageList']:
                        dataExist = QuestionBank_Question.objects.filter(refrence_Questions_Type_Detail__id=int(data['refrence_Questions_Type_Detail']),
                                selectLanguage__id__in=launguageIDs,question=ExistquestionData[exitCount]['Question_'+ lang].strip())
                        print(dataExist)
                        if len(dataExist) > 0:
                            for i in dataExist:
                                existdict['id'] = i.id
                                existdict['language'] = lang
                                existdict['sameQuestionrefrence'] = i.sameQuestionrefrence
                                existdict['language_id'] = i.selectLanguage.id
                                existList.append(existdict)
                                existdict = {}
                        exitCount = exitCount + 1
                    return Response({'data':existList,'status':False,'message':'Question Already Exist'}, status=409)
            return Response({'data':"Question Created Successfully",'status':True,'message':'Question Sucessfully'}, status=201)
            # except IntegrityError:
            #         return Response({'data':{},'status':False,'message':'Question Already Exist'}, status=409)
  


def deleteKey(data):
    del data['selectCourse']
    del data['questionType']
    del data['subQuestionType']
    del data['difficultyLevel']
    del data['selectSubject']
    del data['existingQuestionTypeID']
    del data['correctMarks']
    del data['addType']
    del data['Topic']
    del data['existingQuestionID']
    return "Deleted"






      

def convertOptionInFormatList(option,statement,selectNoOption):
    optionList = option.split('|')
    statementList = statement.split('<<-|->>')
    insertDataList = []
    for i in range(0,int(selectNoOption)):
        insertDataList.append([optionList[i],statementList[i]])
    return insertDataList

        
        
            
     
 


@api_view(['GET','PUT'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def questionBank_detail(request, pk, format=None):
    try:
        questionDetail = QuestionBank_Question.objects.get(pk=pk)
        # data = QuestionBank_Question.objects.filter(sameQuestionrefrence=str(questionDetail.sameQuestionrefrence))
        print(questionDetail)
    except QuestionBank_Question.DoesNotExist:
        return Response({'message': 'Question Not Found! '},status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        # print()
        serializer = GetQuestionBank_QuestionSerializer(questionDetail)
        return JsonResponse(serializer.data, status=200, safe=False)
    if request.method == 'PUT':
        if request.data['add_type'] == 'primary':
            serializer = QuestionBank_QuestionSerializer(questionDetail, data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return JsonResponse(serializer.data)
            return JsonResponse(serializer.errors, status=400)
        else:
            data = request.data
            data['languageList'] = data['selectLanguage'].split(',')
            optioList = []
            questionData = eval(data['question_data'])
            count = 0
            # print(data)
            # exit()
            for lang in data['languageList']:
                print(questionData[count]['option'])
                optioList.append(questionData[count]['option'].split('|'))
                optioList.append(questionData[count]['optionStatement'].split('<<-|->>'))
                data['optionList'] = str(optioList)
                count = count + 1
            del data['selectLanguage']
            # print(data)
            # exit()
            serializer = QuestionBank_QuestionSerializer(questionDetail, data=data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return JsonResponse(serializer.data)
            return JsonResponse(serializer.errors, status=400)
               


@api_view(['GET', 'POST'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def questions_type(request, format=None):
    if request.method == 'GET':
        paginator = PageNumberPagination()
        snippets = Questions_Type.objects.all()
        serializer = Questions_TypeSerializer(snippets, many=True)
        return Response(serializer.data)

@api_view(['GET', 'POST'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def questions_sub_type(request, format=None):
    if request.method == 'GET':
        paginator = PageNumberPagination()
        snippets = Questions_Sub_Type.objects.all()
        serializer = Questions_Sub_TypeSerializer(snippets, many=True)
        return Response(serializer.data)

@api_view(['GET', 'POST'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def questionBank_level_type(request, format=None):
    if request.method == 'GET':
        paginator = PageNumberPagination()
        snippets = Questions_Level_Type.objects.all()
        serializer = Questions_Level_TypeSerializer(snippets, many=True)
        return Response(serializer.data)



@api_view(['GET','PUT'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def questionBank_view(request, pk, format=None):
    try:
        questionDetail = QuestionBank_Question.objects.get(pk=pk)
    except QuestionBank_Question.DoesNotExist:
        return Response({'message': 'Question Not Found! '},status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = GetQuestionBank_QuestionSerializer(questionDetail)
        return JsonResponse(serializer.data, status=200, safe=False)






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