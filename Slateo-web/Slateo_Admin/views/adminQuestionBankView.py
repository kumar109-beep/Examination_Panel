from django.shortcuts import render,redirect
from django.http import JsonResponse, HttpResponse, HttpResponseRedirect
from .Helper.postMethod import *
from .Helper.getMethod import *
from .Helper.globalURL import *
import json
import datetime
from .Helper.getAuthorityList import *
from Slate_O.validateKey import checkKey
import json
from .headerNotification import headerNotification



# ==========================================================================================================================================
#                                         ADD SINGLE QUESTIONS TO SELECTED COURSE --> SUBJECT --> TOPIC
# ==========================================================================================================================================
def add_questions(request):
    if request.session.has_key('auth_token'):
        try:
            authority = request.session['authority']
            dictionary = get_authority_list(authority,'resource_login')
        except:
            authority = []
            dictionary = get_authority_list(authority,'edit_exam')
        status = checkKey(dictionary,'add_question')
        if(status == 'True' or len(authority) == 0):
            username = request.session['auth_username']
            if request.method == 'GET':
                dateTime = datetime.datetime.now()
                uniqueCode = str(dateTime).replace(" ", "|")
                tokenKey = request.session['auth_token']
                apiCourseList = getMethod(
                    request=request,
                    method='GET',
                    task = 'GETCOURSELIST',
                    pathInfo=getCourseList_URL.strip(),
                    )
                data = json.loads(apiCourseList.text)

                apiLanguageList = getMethod(
                    request=request,
                    method='GET',
                    task = 'GETLANGUAGES',
                    pathInfo=getlanguage_list.strip(),
                    )
                lang = json.loads(apiLanguageList.text)

                apigetquestionSubType = getMethod(
                    request=request,
                    method='GET',
                    task = 'GETLANGUAGES',
                    pathInfo=getquestionSubType.strip(),
                    )
                questionSubType = json.loads(apigetquestionSubType.text)

                apigetquestionType = getMethod(
                    request=request,
                    method='GET',
                    task = 'GETLANGUAGES',
                    pathInfo=getquestionType.strip(),
                    )
                questionType = json.loads(apigetquestionType.text)

                apigetquestionLevel = getMethod(
                    request=request,
                    method='GET',
                    task = 'GETLANGUAGES',
                    pathInfo=getquestionLevel.strip(),
                    )
                questionLevel = json.loads(apigetquestionLevel.text)
                response = headerNotification(request)
                length = response[0]
                requestHeadingData = response[1]
                admin_data = response[2]
                return render(request,'Admin/question-bank/add-questions.html',{'admin_data':admin_data,'dataLength':length,'data':requestHeadingData['data'],'questionType':questionType,'questionLevel':questionLevel,'questionSubType':questionSubType,'username':username,'data1':data,'uniqueCode':uniqueCode,'authority':dictionary,'language':lang})
            elif request.method == 'POST':
                course = request.POST['course']
                subject = request.POST['subject']
                topic = request.POST['topic']
                questionLanguage = request.POST['questionLanguage']
                questionSubType = request.POST['questionSubType']
                questionDifficultyLevel = request.POST['questionDifficultyLevel']
                questionCorrectMark = request.POST['questionCorrectMark']
                refrenceUniuecode = request.POST['refrenceUniuecode']
                existingQuestionTypeID = request.POST.get('existingQuestionTypeID')
                addType = request.POST.get('addType')
                existingQuestionID = request.POST.get('existingQuestionID')
                questionType = request.POST['questionType']
                questionType_dorop = request.POST['questionType_dorop']
                lang_id = request.POST['lang_id']
                # exit()
            

                if(existingQuestionTypeID == None):
                    existingQuestionTypeID = 'NA'
                if(existingQuestionID == None):
                    existingQuestionTypeID = 'NA'
                print('1' , subject,course)
                print('2',topic)
                print('3',questionLanguage)
                print('4',questionSubType)
                print('5',questionDifficultyLevel)
                print('6',questionCorrectMark)
                print('7',refrenceUniuecode)
                print('8',existingQuestionTypeID) 
                print('9',addType)
                print('10',questionType)
                print('11',questionType_dorop)
                # exit()
                # --------------- ###  QUESTION TYPE  ###  -------------------
                

                if(questionType_dorop == 'Subjective'):
                    data = {}
                    data['question_data'] = eval(request.POST['optionList'])
                    data['course'] = int(course)
                    data['subject'] = int(subject)
                    data['topic'] = topic
                    data['questionLanguage'] = questionLanguage
                    data['questionType'] = questionType
                    data['questionSubType'] = questionSubType
                    data['questionDifficultyLevel'] = questionDifficultyLevel
                    data['questionCorrectMark'] = questionCorrectMark
                    data['sameQuestionrefrence'] = refrenceUniuecode
                    data['addType'] = addType
                    data['existingQuestionTypeID'] = existingQuestionTypeID
                    data['existingQuestionID'] = existingQuestionID
                    data['lang_id'] = lang_id
                    apiQuestion = postMethod(
                        request=request,
                        method='POST',
                        task = 'ADDSUBJECTIVEQUESTION',
                        pathInfo=addQuestion_URl.strip(),
                        dataList = data
                        )
                    res = apiQuestion
                    response_code = res.status_code
                    # exit()
                    dataDict = json.loads(apiQuestion.text)
                    print('dataDict =======>>>',dataDict)
                    print('response_code =======>>>',response_code)


                    if(response_code == 201):
                        return JsonResponse({'data' : 'success'})
                    elif(response_code == 409):
                        print('ASAS',dataDict)
                        return JsonResponse({'data':dataDict})
                    else:
                        return JsonResponse({'data' : 'fail'})

                else:
                    data = {}
                    data['question_data'] = eval(request.POST['optionList'])
                    data['course'] = int(course)
                    data['subject'] = int(subject)
                    data['topic'] = topic
                    data['questionLanguage'] = questionLanguage
                    data['questionType'] = questionType
                    data['questionSubType'] = questionSubType
                    data['questionDifficultyLevel'] = questionDifficultyLevel
                    data['questionCorrectMark'] = questionCorrectMark
                    data['optionCount'] = request.POST['optionCount']
                    data['sameQuestionrefrence'] = refrenceUniuecode
                    data['addType'] = addType
                    data['existingQuestionTypeID'] = existingQuestionTypeID
                    data['existingQuestionID'] = existingQuestionID
                    data['lang_id'] = lang_id
                    apiQuestion = postMethod(
                        request=request,
                        method='POST',
                        task = 'ADDOBJECTIVEQUESTION',
                        pathInfo=addQuestion_URl.strip(),
                        dataList = data
                        )
                    res = json.loads(apiQuestion.text)
                    print('dataDict =======>>>',res)
                    # print('response_code =======>>>',response_code)


                    if(res['status'] == True):
                        return JsonResponse({'data' : 'success'})
                    elif(res['status'] == False):
                        return JsonResponse({'data':res})
                
        else:
            return render(request,'403.html') 
    else:
        return redirect('login')

# ===============================================
# ===========================================================================================
#                                         ADD MULTIPLE QUESTIONS TO SELECTED COURSE --> SUBJECT --> TOPIC
# ==========================================================================================================================================
def add_multiple_questions(request):
    if request.session.has_key('auth_token'):
        username = request.session['auth_username']
        if request.method == 'POST':
            course = request.POST['course']
            subject = request.POST['subject']
            topic = request.POST['topic']
            questionLanguage = request.POST['questionLanguage']
            questionSubType = request.POST['questionSubType']
            questionDifficultyLevel = request.POST['questionDifficultyLevel']
            questionCorrectMark = request.POST['questionCorrectMark']
            questionData = request.POST['questionData']

            # ---------------   QUESTION TYPE   -------------------
            questionType = request.POST['questionType']

            if(questionType == 'Subjective'):
                data = {}
                data['course'] = int(course)
                data['subject'] = int(subject)
                data['topic'] = topic
                data['questionLanguage'] = questionLanguage
                data['questionType'] = questionType
                data['questionSubType'] = questionSubType
                data['questionDifficultyLevel'] = questionDifficultyLevel
                data['questionCorrectMark'] = questionCorrectMark
                data['questionData'] = questionData

                apiQuestion = postMethod(
                    request=request,
                    method='POST',
                    task = 'ADDSUBJECTIVEQUESTION',
                    pathInfo=addQuestion_URl.strip(),
                    dataList = data
                    )
                res = apiQuestion
                response_code = res.status_code
                if(response_code == 201):
                    return JsonResponse({'questionAPI_Response' : 'success'})
                else:
                    return JsonResponse({'questionAPI_Response' : 'fail'})
            elif(questionType == 'Objective'):
                optionCount = request.POST['optionCount']
                data = {}
                data['course'] = int(course)
                data['subject'] = int(subject)
                data['topic'] = topic
                data['questionLanguage'] = questionLanguage
                data['questionType'] = questionType
                data['questionSubType'] = questionSubType
                data['questionDifficultyLevel'] = questionDifficultyLevel
                data['questionCorrectMark'] = questionCorrectMark
                data['questionData'] = questionData
                data['optionCount'] = optionCount
                data['questionOptions'] = str(questionOptionData)
                data['topicOption'] = str(topicOption)
                data['topicDataList1'] = str(topicDataList1)
                apiQuestion = postMethod(
                    request=request,
                    method='POST',
                    task = 'ADDOBJECTIVEQUESTION',
                    pathInfo=addQuestion_URl.strip(),
                    dataList = data
                    )
                res = apiQuestion
                response_code = res.status_code
                if(response_code == 201):
                    return JsonResponse({'questionAPI_Response' : 'success'})
                else:
                    return JsonResponse({'questionAPI_Response' : 'fail'})
    else:
        return redirect('login')



# ==========================================================================================================================================
#                                                         ALL QUESTIONS LIST
# ==========================================================================================================================================
def question_list(request):
    if request.session.has_key('auth_token'):
        try:
            authority = request.session['authority']
            dictionary = get_authority_list(authority,'resource_login')
        except:
            authority = []
            dictionary = get_authority_list(authority,'question_list')
        status = checkKey(dictionary,'add_question')
        if(status == 'True' or len(authority) == 0):
            username = request.session['auth_username']
            if request.method == 'GET': 
                apiCourseList = getMethod(
                    request=request,
                    method='GET',
                    task = 'GETCOURSELIST',
                    pathInfo=getCourseList_URL.strip(),
                    )
                data = json.loads(apiCourseList.text)
                apiLanguageList = getMethod(
                    request=request,
                    method='GET',
                    task = 'GETLANGUAGES',
                    pathInfo=getlanguage_list.strip(),
                    )
                lang = json.loads(apiLanguageList.text)

                apigetquestionSubType = getMethod(
                    request=request,
                    method='GET',
                    task = 'GETLANGUAGES',
                    pathInfo=getquestionSubType.strip(),
                    )
                questionSubType = json.loads(apigetquestionSubType.text)

                apigetquestionType = getMethod(
                    request=request,
                    method='GET',
                    task = 'GETLANGUAGES',
                    pathInfo=getquestionType.strip(),
                    )
                questionType = json.loads(apigetquestionType.text)

                apigetquestionLevel = getMethod(
                    request=request,
                    method='GET',
                    task = 'GETLANGUAGES',
                    pathInfo=getquestionLevel.strip(),
                    )
                questionLevel = json.loads(apigetquestionLevel.text)

                # ===== QUESTION LIST ==============
                apiCourseList = getMethod(
                    request=request,
                    method='GET',
                    task = 'GETALLQUESTIONLIST',
                    pathInfo=getQuestionList_URl.strip(),
                    )
                questionData = json.loads(apiCourseList.text)
                questionData = questionData['data']

                print('questionData >> ',questionData)
                if(len(questionData)>0):
                    for i in questionData:
                        yearList = i['created_at'].split('-')
                        i['year'] = yearList[0]
                response = headerNotification(request)
                length = response[0]
                requestHeadingData = response[1]
                admin_data = response[2]
                return render(request,'Admin/question-bank/question-list.html',{'admin_data':admin_data,'dataLength':length,'data':requestHeadingData['data'],'questionType':questionType,'questionLevel':questionLevel,'questionSubType':questionSubType,'username':username,'data1':data,'questionData':questionData,'len':len(questionData),'authority':dictionary,'language':lang})
        else:
            return render(request,'403.html') 
    else:
        return redirect('login')


# ==========================================================================================================================================
#                                              GET ASSIGNED SUBJECTS VIA COURSE SELECTION
# ==========================================================================================================================================
def chainedSubjects(request):
    if request.session.has_key('auth_token'):
        courseID = request.GET['courseId']
        apiSpeificSubject = getMethod(
                    request=request,
                    method='GET',
                    task = 'GETSUBJECTACCORDINGTOCOURSE',
                    pathInfo=getSubjectAccordingToCourse_URL+str(courseID)+'/'.strip(),
                    )
        dataSubject = json.loads(apiSpeificSubject.text)
        if dataSubject['status'] == True:
            return JsonResponse({'subjectList':dataSubject})
        return JsonResponse({'subjectList':'error'})
    else:
        return redirect('login')


# ==========================================================================================================================================
#                                              GET ASSIGNED TOPICS VIA SUBJECT SELECTION
# ==========================================================================================================================================
def searchTopic(request):
    if request.session.has_key('auth_token'):
        courseID = request.GET['courseID']
        subjectID = request.GET['subjectID']
        apispecificTopics = getMethod(
            request=request,
            method='GET',
            task = 'GETTOPICLIST',
            pathInfo=getassignSubjectTotopic_list_URL+'?courseID='+str(courseID)+'&subjectID='+str(subjectID).strip(),
            )
        dataTopic = json.loads(apispecificTopics.text)
        print('dataTopic >>>',dataTopic)

        if(len(dataTopic)!=0):
            for i in dataTopic:
                topicdata = i['topicsList'].split(',')
        else:
            topicdata = []
            topicdata.append('<b>- No topic available for selected course and subject!</b>')
        return JsonResponse({'topicList':topicdata,'topicId':dataTopic[0]['id']})
    else:
        return redirect('login')


# ==========================================================================================================================================
#                                              EDIT QUESTIONS
# ==========================================================================================================================================
def edit_question(request,id):
    if request.session.has_key('auth_token'):
        try:
            authority = request.session['authority']
            dictionary = get_authority_list(authority,'resource_login')
        except:
            authority = []
            dictionary = get_authority_list(authority,'edit_exam')
        status = checkKey(dictionary,'add_question')
        if(status == 'True' or len(authority) == 0):
            username = request.session['auth_username']
            if request.method == 'GET': 
                apispecificQuestion = getMethod(
                request=request,
                method='GET',
                task = 'GETSPECIFICQUESTION',
                pathInfo=getspecificQuestion_list_URL+str(id)+'/'.strip(),
                )
                print(apispecificQuestion)
                specificQuestionData = json.loads(apispecificQuestion.text)
                print('===========================================================================================================')
                print('edit question detail >> ',specificQuestionData)
                print('===========================================================================================================')
                # exit()
                
                specificQuestionData = specificQuestionData
                response = headerNotification(request)
                length = response[0]
                requestHeadingData = response[1]
                admin_data = response[2]

                sameQuestionrefrence = specificQuestionData['refrence_Questions_Type_Detail']['id']
                print('sameQuestionrefrence get >> ',sameQuestionrefrence)
                if(specificQuestionData['optionList'] != 'NA'):
                    if(specificQuestionData['optionList']):
                        optionListData = eval(specificQuestionData['optionList'])
                        optionCountData = len(eval(specificQuestionData['optionList'])[0])
                        print('optionListData >>>> ',optionListData)
                        print('optionCountData >>>> ',optionCountData)
                        # exit()

                        try:
                            authority = request.session['authority']
                            dictionary = get_authority_list(authority,'resource_login')
                        except:
                            authority = []
                            dictionary = get_authority_list(authority,'admin_login')
                        return render(request,'Admin/question-bank/edit-question.html',{'admin_data':admin_data,'dataLength':length,'sameQuestionrefrence':sameQuestionrefrence,'data':requestHeadingData['data'],'username':username,'specificQuestionData':specificQuestionData,'optionListData':optionListData,'optionCountData':optionCountData,'authority':dictionary})
                else:
                    try:
                        authority = request.session['authority']
                        dictionary = get_authority_list(authority,'resource_login')
                    except:
                        authority = []
                        dictionary = get_authority_list(authority,'admin_login')
                    return render(request,'Admin/question-bank/edit-question.html',{'admin_data':admin_data,'dataLength':length,'data':requestHeadingData['data'],'username':username,'specificQuestionData':specificQuestionData,'sameQuestionrefrence':sameQuestionrefrence,'authority':dictionary})

            elif request.method == 'POST':
        
                questionType = request.POST['questionTypeText']
                sameQuestionrefrence = request.POST['sameQuestionrefrence']
                print('sameQuestionrefrence put >> ',sameQuestionrefrence)
                print('questionType put >> ',questionType)

                if(questionType == 'Subjective'):
                    questionData = request.POST['questionData']
                    add_type = request.POST['add_type']
                    data = {}
                    data['question'] = questionData
                    data['questionType'] = request.POST['questionType']
                    data['sameQuestionrefrence'] = int(sameQuestionrefrence)
                    
                    data['add_type'] = add_type

                    apiQuestion = postMethod(
                        request=request,
                        method='PUT',
                        task = 'UPDATESUBJECTIVEQUESTION',
                        pathInfo=updateSpecificQuestion_URL+str(id)+'/'.strip(),
                        dataList = data
                        )
                    res = apiQuestion
                    response_code = res.status_code
                    print('response_text >> ',res.text)
                    print('response_code >> ',response_code)
                    if(response_code == 200):
                        return JsonResponse({'questionAPI_Response' : 'success'})
                    else:
                        return JsonResponse({'questionAPI_Response' : 'fail'})
                elif(questionType == 'Objective'):
                    print('request.POST : ',request.POST)
                    selectLanguage = request.POST['selectLanguage']
                    questionType = request.POST['questionType']
                    subQuestionType = request.POST['subQuestionType']
                    Topic = request.POST['Topic']
                    difficultyLevel = request.POST['difficultyLevel']
                    correctMarks = request.POST['correctMarks']
                    selectCourse = request.POST['selectCourse']
                    selectSubject = request.POST['selectSubject']
                    questionData = request.POST['questionData']
                    sameQuestionrefrence = request.POST['sameQuestionrefrence']
                    add_type = request.POST['add_type']
                    existingQuestionTypeID = request.POST['existingQuestionTypeID']
                    existingQuestionID = request.POST['existingQuestionID']
                    selectNoOption = request.POST['selectNoOption']
                    lang_id = request.POST['lang_id']
                    question_data = request.POST['question_Data']


                    

                    
                    data = {}
                    data['selectLanguage'] = selectLanguage
                    data['question_data'] = question_data
                    data['questionType'] = questionType
                    data['subQuestionType'] = subQuestionType
                    data['Topic'] = Topic
                    data['difficultyLevel'] = difficultyLevel
                    data['correctMarks'] = correctMarks
                    data['selectCourse'] = selectCourse
                    data['selectSubject'] = selectSubject
                    data['questionData'] = questionData
                    data['sameQuestionrefrence'] = sameQuestionrefrence
                    data['add_type'] = add_type
                    data['existingQuestionTypeID'] = existingQuestionTypeID
                    data['existingQuestionID'] = existingQuestionID
                    data['selectNoOption'] = selectNoOption

                    print('data dict >> ',data)


                    apiQuestion = postMethod(
                        request=request,
                        method='PUT',
                        task = 'UPDATEOBJECTIVEQUESTION',
                        pathInfo=updateSpecificQuestion_URL+str(id)+'/'.strip(),
                        dataList = data
                        )
                    res = apiQuestion
                    response_code = res.status_code

                    print('res',res.text)
                    print('response_code',response_code)

                    if(response_code == 200):
                        return JsonResponse({'questionAPI_Response' : 'success'})
                    else:
                        return JsonResponse({'questionAPI_Response' : 'fail'})
        else:
            return render(request,'403.html') 

    else:
        return redirect('login')
# ==========================================================================================================================================
#                                              EDIT QUESTIONS
# ==========================================================================================================================================
def show_question(request,id):
    if request.session.has_key('auth_token'):
        try:
            authority = request.session['authority']
            dictionary = get_authority_list(authority,'resource_login')
        except:
            authority = []
            dictionary = get_authority_list(authority,'edit_exam')
        status = checkKey(dictionary,'add_question')
        if(status == 'True' or len(authority) == 0):
            username = request.session['auth_username']
            if request.method == 'GET': 
                apispecificQuestion = getMethod(
                request=request,
                method='GET',
                task = 'VIEWSINGLEQUESTION',
                pathInfo=viewSpecificQuestion_URL+str(id)+'/'.strip(),
                )
                specificQuestionData = json.loads(apispecificQuestion.text)
                print('specificQuestionData >>> ',specificQuestionData)
                # specificQuestionData >>>  {'id': 179, 'question': 'aa', 'optionList': "[['False', 'True'], ['a', 'b']]", 'sameQuestionrefrence': '2021-06-05|14:08:08.743268', 'created_at': '2021-06-05T08:38:54.959097Z', 'updated_at': '2021-06-05T08:38:54.959121Z', 'refrence_Questions_Type_Detail': {'id': 3, 'Topic': 'AP', 'selectNoOption': '2', 'correctMarks': '3', 'created_at': '2021-06-04T12:39:19.585230Z', 'updated_at': '2021-06-04T12:39:19.585257Z', 'selectCourse': {'id': 1, 'courseID': 'dwede', 'courseName': 'BSC', 'created_at': '2021-06-04T08:44:28.860559Z', 'updated_at': '2021-06-04T08:44:28.860583Z', 'courseType': 1}, 'selectSubject': {'id': 1, 'subjectID': 'dews', 'subjectName': 'Maths', 'created_at': '2021-06-04T08:44:44.223559Z', 'updated_at': '2021-06-04T08:44:44.223596Z'}, 'questionType': {'id': 2, 'questio_type_id': 'efwedf', 'questio_type_name': 'Objective', 'created_at': '2021-06-04T08:43:23.479742Z', 'updated_at': '2021-06-04T08:43:23.479767Z'}, 'subQuestionType': {'id': 1, 'questio_sub_type_id': 'ftg3', 'questio_sub_type_name': 'True/False', 'created_at': '2021-06-04T08:42:20.345852Z', 'updated_at': '2021-06-04T08:42:20.345878Z'}, 'difficultyLevel': {'id': 2, 'questio_level_type_id': 'hard6540', 'questio_level_type_name': 'Hard', 'created_at': '2021-06-04T08:41:16.090782Z', 'updated_at': '2021-06-04T08:41:16.090807Z'}}, 'selectLanguage': {'id': 1, 'languageCode': 'hhdb678', 'languageName': 'Hindi', 'created_at': '2021-06-04T08:43:37.451254Z', 'updated_at': '2021-06-04T08:43:37.451279Z'}}
                # exit()
                if(specificQuestionData['optionList'] != 'NA'):
                    if(specificQuestionData['optionList']):
                        optionListData = eval(specificQuestionData['optionList'])
                        optionCountData = eval(specificQuestionData['refrence_Questions_Type_Detail']['selectNoOption'])
                        print(optionListData)
                        return JsonResponse({'username':username,'specificQuestionData':specificQuestionData,'optionListData':optionListData,'optionCountData':optionCountData})
                else:
                    return JsonResponse({'username':username,'specificQuestionData':specificQuestionData})
        else:
            return render(request,'403.html') 
    else:
        return redirect('login')
        


def question_show(request):
    if request.method == 'GET':
        questionID = request.GET['questionID']
        apispecificQuestion = getMethod(
            request=request,
            method='GET',
            task = 'GETSPECIFICQUESTION',
            pathInfo=getspecificQuestion_list_URL+str(questionID)+'/'.strip(),
            )
        specificQuestionData = json.loads(apispecificQuestion.text)
        return JsonResponse({'searchResultList': specificQuestionData})

      
  

# ==========================================================================================================================================
#                                                       FILTER DATA on MASTER FILTER
# ==========================================================================================================================================
def filterData(request):
    if request.session.has_key('auth_token'):
        print('<<<<<<<<<<<<<<<< filter management >>>>>>>>>>>>>>>>>>>>>')
        year = request.GET['year']
        courseID = request.GET.get('courseId')
        subjectID = request.GET.get('subjectID')
        topic = request.GET.get('topic')

        difficultyList = request.GET.getlist('difficultyList[]')
        questionTypeList = request.GET.getlist('questionTypeList[]')
        languageList = request.GET.getlist('marksList[]')
        marksList = request.GET.getlist('languageList[]')
        # -------------------------------------------------------------------------------------
        # conditions for question management filter tag
        # -------------------------------------------------------------------------------------
        # if keyData['label_search'] == 'MainFilter'>>>> 
        # if keyData['label_search'] == 'SubFilter' >>>> 
        # if keyData['label_search'] == 'MixFilter' >>>> 
        # 2021 <=> 0 <=> 0 <=>  <=> [] <=> ['1'] <=> [] <=> [] label >>  MixFilter
        print(year,'<=>',courseID,type(courseID),'<=>',subjectID,'<=>',topic,'<=>',difficultyList,'<=>',questionTypeList,'<=>',marksList,'<=>',languageList)
        if(courseID == '0'):
            print('c1')
            courseID = 0
        if(subjectID == '0'):
            print('c2')
            subjectID = 0
        # -------------------------------------------------------------------------------------
        if(courseID == 0 and subjectID == 0):
            print('condition 01')
            label = 'SubFilter'
        elif(difficultyList == [] and questionTypeList == [] and languageList == [] and marksList == []):
            print('condition 02')
            label = 'MainFilter'
        # if(courseID != 0 or subjectID != 0 and difficultyList != [] or questionTypeList != [] or languageList != [] or marksList != []):
        else:
            print('condition 03')
            label = 'MixFilter'
        # -------------------------------------------------------------------------------------
        # if(topic == ''):
        #     topic = 0

        # url = "http://localhost:5000/api/questionFilterData?year=2021&course=2&subject=4&topic=&bydifficulty=E,M,D&quesType=O,S&language=E,H&byMarks=[1,2,3,gt_3]"
        print(year,'<=>',courseID,'<=>',subjectID,'<=>',topic,'<=>',difficultyList,'<=>',questionTypeList,'<=>',marksList,'<=>',languageList,'label >> ',label)

        apiFilteredQuestion = getMethod(
            request=request,
            method='GET',
            task = 'GETFILTEREDDATA',
            pathInfo=filterQuestion_URL+"?year="+str(year)+"&course="+str(courseID)+"&subject="+str(subjectID)+"&topic="+str(topic)+"&bydifficulty="+str(difficultyList)+"&quesType="+str(questionTypeList)+"&language="+str(languageList)+"&byMarks="+str(marksList)+"&label_search="+str(label).strip(),
            )
        filteredData = json.loads(apiFilteredQuestion.text)
        # print(filteredData)

        if(len(filteredData)>0):
            for i in filteredData:
                yearList = i['created_at'].split('-')
                i['year'] = yearList[0]
        return JsonResponse({'FILTERED_data':filteredData})
    else:
        return redirect('login')

# ==========================================================================================================================================
#                                                       GET SPECIFIC QUESTION DETAIL
# ==========================================================================================================================================
def getSpecificQuestion(request,id):
    if request.session.has_key('auth_token'):
        print('This is the question ID : ',id)
        apispecificQuestion = getMethod(
            request=request,
            method='GET',
            task = 'GETSPECIFICQUESTION',
            pathInfo=getspecificQuestion_list_URL+str(id)+'/'.strip(),
        )
        specificQuestionData = json.loads(apispecificQuestion.text)

        if(specificQuestionData[0]['optionList']):
            optionListData = eval(specificQuestionData[0]['optionList'])
            optionCountData = eval(specificQuestionData[0]['selectNoOption'])
        print('This is the question detail : ',specificQuestionData)
        
        return JsonResponse({'questionData':specificQuestionData})
    else:
        return redirect('login')

# ===================================================================================================================================================================
#                                                          SEARCH & PAGINATION FOR Question LIST (with querystring or page number)
# ===================================================================================================================================================================
def question_Search(request):
    if request.session.has_key('auth_token'):
        username = request.session['auth_username']

        year = request.GET['year']
        courseID = request.GET.get('courseId')
        subjectID = request.GET.get('subjectID')
        topic = request.GET.get('topic')

        print('courseID >> ',courseID)
        print('subjectID >> ',subjectID)

        if(courseID == ''):
            courseID = 0
        if(subjectID == ''):
            subjectID = 0
        # if(topic == ''):
        #     topic = 0


        difficultyList = request.GET.getlist('difficultyList[]')
        questionTypeList = request.GET.getlist('questionTypeList[]')
        languageList = request.GET.getlist('marksList[]')
        marksList = request.GET.getlist('languageList[]')

        questionSearchString = request.GET['search_String']
        page = request.GET['page']

        # http://13.233.247.133/api/questionFilterData?year=2021&course=1&subject=0&topic=AP&bydifficulty=[2]&quesType=[2]&language=[1]&byMarks=[1]&label_search=mainFilter&page=2

        print(year,'<=>',courseID,'<=>',subjectID,'<=>',topic,'<=>',difficultyList,'<=>',questionTypeList,'<=>',marksList,'<=>',languageList,'<=>',questionSearchString,'<=>',page)
        mainFilter= 'mainFilter'

        apiFilteredQuestion = getMethod(
            request=request,
            method='GET',
            task = 'GETFILTEREDDATA',
            pathInfo=filterQuestion_URL+"?year="+str(year)+"&course="+str(courseID)+"&subject="+str(subjectID)+"&topic="+str(topic)+"&bydifficulty="+str(difficultyList)+"&quesType="+str(questionTypeList)+"&language="+str(languageList)+"&byMarks="+str(marksList)+"&label_search="+str(mainFilter)+"&page="+str(page).strip(),
            )
        filteredData = json.loads(apiFilteredQuestion.text)
        print('this is our filteredData >======>> ',filteredData)

        if('detail' not in filteredData):
            if(len(filteredData)>0):
                for i in filteredData:
                    yearList = i['created_at'].split('-')
                    i['year'] = yearList[0]
        return JsonResponse({'FILTERED_data':filteredData})
    else:
        return redirect('login')