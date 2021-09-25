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
from ..serializers.questionBankManagementSerializers import *

@api_view(['GET', 'POST'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@permission_classes([IsAuthenticated])
def questionBank_list(request, format=None):
    if request.method == 'GET':
        listData = []
        dicData = {}
        paginator = PageNumberPagination()
        snippets = Question.objects.all().order_by('-id')
        for i in snippets:
            dicData['id'] = i.id
            dicData['course'] = i.refrence_Questions_Type_Detail.refrence_Question_Associated.selectCourse.courseName
            dicData['subject'] = i.refrence_Questions_Type_Detail.refrence_Question_Associated.selectSubject.subjectName
            dicData['topic'] = i.refrence_Questions_Type_Detail.refrence_Question_Associated.Topic
            dicData['questionType'] = i.refrence_Questions_Type_Detail.questionType
            dicData['subQuestionType'] = i.refrence_Questions_Type_Detail.subQuestionType 
            dicData['selectLanguage'] = i.refrence_Questions_Type_Detail.selectLanguage
            dicData['selectNoOption'] = i.refrence_Questions_Type_Detail.selectNoOption 
            dicData['optionList'] = i.optionList
            dicData['difficultyLevel'] = i.refrence_Questions_Type_Detail.difficultyLevel
            dicData['correctMarks'] = i.refrence_Questions_Type_Detail.correctMarks 
            dicData['question'] = i.question
            dicData['created_at'] = i.created_at
            listData.append(dicData)
            dicData = {}
        snippets = paginator.paginate_queryset(listData, request)
        print(snippets)
        return Response(snippets)
    elif request.method == 'POST':
        data = request.data
        flagToCheck = False
        questionObject = {}
        questionlistObj = []
        courseInstance = Courses.objects.get(id=data['selectCourse'])
        subjectInstance = Subjects.objects.get(id=data['selectSubject'])
        try:
            data_associated = Question_Associated.objects.get(selectCourse=courseInstance, selectSubject=subjectInstance,Topic=data['Topic'])
        except Question_Associated.DoesNotExist:
            data_associated = Question_Associated(selectCourse=courseInstance, selectSubject=subjectInstance,Topic=data['Topic'])
            data_associated.save()
        questioCount = 0
        if data['questionType'].strip() == 'Subjective':
            istance_question_type = []
            istance_question = []
            questionData = data['question_data']
            lang = data['selectLanguage']
            questionType = data['questionType']
            subQuestionType = data['subQuestionType']
            correctMarks = data['correctMarks']
            difficultyLevel = data['difficultyLevel']
            refrenceUniuecode = data['refrenceUniuecode']
            languageList = lang.split(',')
            count = 0
            for lang in languageList:
                ques = questionData[count]['Question_'+ lang]
                try:
                    data_type_question = Questions_Type_Detail.objects.get(refrence_Question_Associated=data_associated,questionType=questionType,subQuestionType=subQuestionType,selectLanguage=lang,selectNoOption='0',difficultyLevel=difficultyLevel,correctMarks=correctMarks)
                except Questions_Type_Detail.DoesNotExist:
                    data_type_question = Questions_Type_Detail(refrence_Question_Associated=data_associated,questionType=questionType,subQuestionType=subQuestionType,selectLanguage=lang,selectNoOption='0',difficultyLevel=difficultyLevel,correctMarks=correctMarks)
                    data_type_question.save()
                istance_question_type.append(data_type_question.id)

                if Question.objects.filter(refrence_Questions_Type_Detail=data_type_question,question=ques,optionList='').exists():
                    data_question = Question.objects.get(refrence_Questions_Type_Detail=data_type_question,question=ques,optionList='')
                    istance_question.append(data_question.id)
                else:
                    data_question = Question(refrence_Questions_Type_Detail=data_type_question,sameRefrenceUniqueCode=refrenceUniuecode,question=ques,optionList='')
                    data_question.save()
                    data_question = Question.objects.latest('id')
                    istance_question.append(data_question.id)

                count = count + 1
            try:
                dataCheck = Refrence_Question.objects.get(question_course_fk=data_associated,QuestionsTypeDetailM2M=istance_question_type,QuestionM2M=istance_question)
            except Refrence_Question.DoesNotExist:
                data = Refrence_Question(question_course_fk=data_associated,QuestionsTypeDetailM2M=istance_question_type,QuestionM2M=istance_question)
                data.save()
                return Response({'message':'Question Sucessfully'}, status=201)
            
            
        else:
            questionData = data['question_data']
            lang = data['selectLanguage']
            selectNoOption = data['selectNoOption']
            questionType = data['questionType']
            subQuestionType = data['subQuestionType']
            correctMarks = data['correctMarks']
            difficultyLevel = data['difficultyLevel']
            refrenceUniuecode = data['refrenceUniuecode']
            languageList = lang.split(',')
            istance_question_type = []
            istance_question = []
            count = 0
            for lang in languageList:
                ques = questionData[count]['Question_'+ lang]
                option = questionData[count]['option']
                optionStatement = questionData[count]['optionStatement']
                optionState = convertOptionInFormatList(option,optionStatement,selectNoOption)
                try:
                    data_type_question = Questions_Type_Detail.objects.get(refrence_Question_Associated=data_associated,questionType=questionType,subQuestionType=subQuestionType,selectLanguage=lang,selectNoOption=selectNoOption,difficultyLevel=difficultyLevel,correctMarks=correctMarks)
                except Questions_Type_Detail.DoesNotExist:
                    data_type_question = Questions_Type_Detail(refrence_Question_Associated=data_associated,questionType=questionType,subQuestionType=subQuestionType,selectLanguage=lang,selectNoOption=selectNoOption,difficultyLevel=difficultyLevel,correctMarks=correctMarks)
                    data_type_question.save()
                istance_question_type.append(data_type_question.id)
                
                
                try:
                    data_question = Question.objects.get(refrence_Questions_Type_Detail=data_type_question,question=ques,optionList=optionState)
                except Question.DoesNotExist:
                    data_question = Question(refrence_Questions_Type_Detail=data_type_question,sameRefrenceUniqueCode=refrenceUniuecode,question=ques,optionList=optionState)
                    data_question.save()

                istance_question.append(data_question.id)
                count = count + 1
            try:
                dataCheck = Refrence_Question.objects.get(question_course_fk=data_associated,QuestionsTypeDetailM2M=istance_question_type,QuestionM2M=istance_question)
            except Refrence_Question.DoesNotExist:
                data = Refrence_Question(question_course_fk=data_associated,QuestionsTypeDetailM2M=istance_question_type,QuestionM2M=istance_question)
                data.save()
                return Response({'message':'Question Sucessfully'}, status=201)
    



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
        questionDetail = Question.objects.get(pk=pk)
    except Question.DoesNotExist:
        return Response({'message': 'Question Not Found! '},status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        listData = []
        dicData = {}
        paginator = PageNumberPagination()
        snippets = questionDetail
        dicData['id'] = snippets.id
        dicData['course'] = snippets.refrence_Questions_Type_Detail.refrence_Question_Associated.selectCourse.courseName
        dicData['subject'] = snippets.refrence_Questions_Type_Detail.refrence_Question_Associated.selectSubject.subjectName
        dicData['topic'] = snippets.refrence_Questions_Type_Detail.refrence_Question_Associated.Topic
        dicData['questionType'] = snippets.refrence_Questions_Type_Detail.questionType
        dicData['subQuestionType'] = snippets.refrence_Questions_Type_Detail.subQuestionType 
        dicData['selectLanguage'] = snippets.refrence_Questions_Type_Detail.selectLanguage
        dicData['selectNoOption'] = snippets.refrence_Questions_Type_Detail.selectNoOption 
        dicData['optionList'] = snippets.optionList
        dicData['difficultyLevel'] = snippets.refrence_Questions_Type_Detail.difficultyLevel
        dicData['correctMarks'] = snippets.refrence_Questions_Type_Detail.correctMarks 
        dicData['question'] = snippets.question
        dicData['created_at'] = snippets.created_at
        listData.append(dicData)
        return JsonResponse(listData, status=200, safe=False)
    if request.method == 'PUT':
        serializer = QuestionSerializer(questionDetail, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)







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