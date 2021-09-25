from django.shortcuts import render,redirect
from django.http import JsonResponse, HttpResponse, HttpResponseRedirect
from .Helper.postMethod import *
from .Helper.getMethod import *
from .Helper.globalURL import *
import json
from .Helper.getAuthorityList import *



# ==========================================================================================================================================
# ==========================================================================================================================================
def deletePaper(request,id):
    if request.session.has_key('auth_token'):
        apideleteCourse = getMethod(
            request=request,
                method="DELETE",
                task = 'DELETESPECIFICCOURSE',
                pathInfo=deletePaper_URL+str(id)+'/'.strip(),
                ) 
        data = apideleteCourse.text
        return JsonResponse({'data':data})
    else:
        return redirect('login')
# # =========================================================================================================================================================================
# #                                                                   CREATE PAPER
# # =========================================================================================================================================================================
def create_paper(request):
    if request.session.has_key('auth_token'):
        username = request.session['auth_username']
        if request.method == 'GET':
            try:
                authority = request.session['authority']
                dictionary = get_authority_list(authority,'resource_login')
            except:
                authority = []
                dictionary = get_authority_list(authority,'admin_login')
            apiCourseList = getMethod(
                request=request,
                method='GET',
                task = 'GETCOURSELIST',
                pathInfo=getCourseList_URL.strip(),
                )
            data = json.loads(apiCourseList.text)
                # ===== QUESTION LIST ==============
            apiCourseList = getMethod(
                request=request,
                method='GET',
                task = 'GETALLQUESTIONLIST',
                pathInfo=getQuestionList_URl.strip(),
                )
            print(apiCourseList.text)
            questionData = json.loads(apiCourseList.text)
            print(questionData)
            # if(len(questionData)>0):
            #     for i in questionData:
            #         yearList = i['created_at'].split('-')
            #         i['year'] = yearList[0]
            apiLanguageList = getMethod(
                    request=request,
                    method='GET',
                    task = 'GETLANGUAGES',
                    pathInfo=getlanguage_list.strip(),
                    )
            lang = json.loads(apiLanguageList.text)
            return render(request,'Admin/paper-management/create-paper.html',{'lang':lang,'username':username,'data':data,'questionData':questionData,'len':len(questionData),'authority':dictionary})
            # return render(request,'Admin/paper-management/create-paper.html',{'username':username,'data':data})
    else:
        return redirect('login')

# # =========================================================================================================================================================================
# #                                                                   SHOW ALL PAPER LIST
# # =========================================================================================================================================================================
def paper_list(request):
    if request.session.has_key('auth_token'):
        username = request.session['auth_username']
        if request.method == 'GET':
            paperList = getMethod(
                request=request,
                method='GET',
                task = 'GETPAPERLIST',
                pathInfo=paper_list_URL.strip(),
                )
            data = json.loads(paperList.text)
            print('paper list :>>>>',data)
            try:
                authority = request.session['authority']
                dictionary = get_authority_list(authority,'resource_login')
            except:
                authority = []
                dictionary = get_authority_list(authority,'admin_login')
            return render(request,'Admin/paper-management/paper-list.html',{'username':username,'data':data,'authority':dictionary})
    else:
        return redirect('login')

# # =========================================================================================================================================================================
# # =========================================================================================================================================================================
def searchTopic(request):
    if request.session.has_key('auth_token'):
        courseID = request.GET['courseID']
        subjectID = request.GET['subjectID']

        print(courseID,'>>>>',subjectID)
        apispecificTopics = getMethod(
            request=request,
            method='GET',
            task = 'GETTOPICLIST',
            pathInfo=getassignSubjectTotopic_list_URL+'?courseID='+str(courseID)+'&subjectID='+str(subjectID).strip(),
            )
        dataTopic = json.loads(apispecificTopics.text)
        if(len(dataTopic)!=0):
            for i in dataTopic:
                topicdata = i['topicsList'].split(',')
        else:
            topicdata = []
            topicdata.append('<b>- No topic available for selected course and subject!</b>')
        return JsonResponse({'topicList':topicdata})
    else:
        return JsonResponse({'error':'Error!'})
# # =========================================================================================================================================================================
# #                                                                   CREATE PAPER : PAGE 01
# # =========================================================================================================================================================================


# # =========================================================================================================================================================================
# #                                                                   CREATE PAPER : PAGE 02
# # =========================================================================================================================================================================
def paper_approval_view(request,id):
    if request.session.has_key('auth_token'):
        username = request.session['auth_username']
        if request.method == 'GET':
            apiGetSpecificPaper = getMethod(
                    request=request,
                    method='GET',
                    task = 'GETSPECIFICPAPER',
                    pathInfo=getSpecificPaper_URL+str(id)+'/'.strip(),
                    )
            res = apiGetSpecificPaper
            response_code = res.status_code
            paperData = json.loads(apiGetSpecificPaper.text)
            questionList = eval(paperData['data']['SectionWiseQuestionList'])
            questionsDict = {}
            count = 1
            for i in questionList:
                print(i)
                questionList = i['Section_'+str(count)]
                questionArray = []
                for j in questionList:
                    print('questionNumber >> ',j)
                    apispecificQuestion = getMethod(
                    request=request,
                    method='GET',
                    task = 'VIEWSINGLEQUESTION',
                    pathInfo=viewSpecificQuestion_URL+str(j)+'/'.strip(),
                    )
                    specificQuestionData = json.loads(apispecificQuestion.text)
                    print('specificQuestionData >>> ',specificQuestionData)
                    questionArray.append(specificQuestionData)
                questionsDict['Section_'+str(count)] = questionArray
                count = count + 1

            print('questionsDict >> ',questionsDict)
            # exit()


            apiLanguageList = getMethod(
                    request=request,
                    method='GET',
                    task = 'GETLANGUAGES',
                    pathInfo=getlanguage_list.strip(),
                    )
            lang = json.loads(apiLanguageList.text)
            print('lang =>>',lang)

            paperLanguage = ''
            paperdefaultLang =''

            for i in lang:
                if(i['id'] == int(paperData['data']['paperLanguage'])):
                    paperLanguage = i['languageName']
                    paperdefaultLang = paperLanguage

            # exit()
            # ##
            # sectionData = eval(paperData['data']['SectionWiseQuestionList'])
            # questionArray = []
            # count = 1
            # for i in sectionData:
            #     for j in i['Section '+str(count)]:
            #         questionArray.append(j)
            #     count = count + 1
            #     paperData['questionArray'] = questionArray
            #     questionArray = []

            # languageData = paperData['data']['paperLanguage']
            # x = languageData.replace('[','')
            # y = x.replace(']','')
            # z = y.replace("'",'')

            # paperData['languageData'] = z

            paperData['sectioncount'] = len(eval(paperData['data']['SectionWiseQuestionList'])) 
            # -----------------------------------------
            apiSpeificCourse = getMethod(
                request=request,
                method='GET',
                task = 'GETCOURSE',
                pathInfo=getSpecificCourse_URL+str(paperData['data']['paperAssociateCourse'])+'/'.strip(),
                )
            dataCourse = json.loads(apiSpeificCourse.text)
            courseName = dataCourse['courseName']
            # -----------------------------------------
            apiSpeificSubject = getMethod(
                request=request,
                method='GET',
                task = 'GETSPECIFICSUBJECT',
                pathInfo=getSpecificSubject_URL+str(paperData['data']['paperAssociateSubject'])+'/'.strip(),
                )
            dataSubject = json.loads(apiSpeificSubject.text)
            subjectName = dataSubject['subjectName']
            try:
                authority = request.session['authority']
                dictionary = get_authority_list(authority,'resource_login')
            except:
                authority = []
                dictionary = get_authority_list(authority,'admin_login')
            # # =========================================
            # print('===================================================================================================================')
            print('this is my paper data for the id : ',id,'\n',paperData)
            #  {'data': {'id': 11, 'paperID': 'paper001', 'paperName': 'math-001', 'paperTotalMarks': '20', 'paperPassingMark': '15', 'paperStatus': 'Completed', 'paperDeafaultLanguage': None, 'paperLanguage': '2', 'paperGuideLines': 'bjfbsgfr gre gjherkjgh erg erhgjreh ig rekjghkerjgher gj ergh jerg reig erhgkjhrkjg er ger jhgbehrjg jr g rejgbiuerg', 'totalPaperTime': '15:00', 'totalNoSection': '3', 'totalnumberOuestion': '5', 'sectionDetails': "['1-2-2-10-1', '2-2-1-5-2', '3-3-2-5-1,2']", 'SectionWiseQuestionList': '[{"Section_1":["507","519"]},{"Section_2":["523"]},{"Section_3":["525","526"]}]', 'automatedSet': True, 'noOfSets': '2', 'created_at': '2021-06-11T12:00:00.725823Z', 'updated_at': '2021-06-11T12:00:00.725851Z', 'paperAssociateCourse': 1, 'paperAssociateSubject': 1}, 'status': True, 'message': 'success', 'sectioncount': 3, 'courseName': 'BSC', 'subjectName': 'Maths'}
            # print('===================================================================================================================')

            try:
                authority = request.session['authority']
                dictionary = get_authority_list(authority,'resource_login')
            except:
                authority = []
                dictionary = get_authority_list(authority,'admin_login')
            listData = []
            listData.append(questionsDict)
            return render(request,'Admin/paper-management/paper-approval.html',{'data':paperData['data'],'courseName':courseName,'subjectName':subjectName,'paperLanguage':paperLanguage,'paperdefaultLang':paperdefaultLang,'questionsDict' : listData,'username':username,'authority':dictionary})

        if request.method == 'POST':
        # {
        # "paperID": "paper001",
        # "paperName": "math-001",
        # "paperStatus": "Completed",
        # "paperRemark": "Rejected"
        # }
            paperID = request.POST['paperID']
            paperName = request.POST['paperName']
            paperStatus = request.POST['paperStatus']
            paperRemark = request.POST['paperRemark']       

            print('=====>>>>',paperID)
            print('=====>>>>',paperName)
            print('=====>>>>',paperStatus)
            print('=====>>>>',paperRemark)
            # exit()

            data = {}
            data['paperID'] = paperID
            data['paperName'] = paperName
            data['paperStatus'] = paperStatus
            data['paperRemark'] = paperRemark
        
            
            apiPaperCreation = postMethod(
                request=request,
                method='PUT',
                task = 'UPDATEEXAMSTATUS',
                pathInfo=updatePaperStatus_URL+str(id)+'/'.strip(),
                dataList = data
                )
            res = apiPaperCreation
            response_code = res.status_code
            response_text= json.loads(res.text)

            print(response_text)
            print(response_code)

            # {"message":"Question Created Successfully"}

            if('message' in response_text):
                return JsonResponse({'data' : 'success'})
            elif(response_code == 409):
                # print(dataDict)
                return JsonResponse({'data':response_text})
            else:
                return JsonResponse({'data' : response_text})
    else:
        return redirect('login')


# # =========================================================================================================================================================================
# #                                                                   CREATE PAPER : PAGE 03
# # =========================================================================================================================================================================
def paper_approval_list(request):
    if request.session.has_key('auth_token'):
        username = request.session['auth_username']
        if request.method == 'GET':
            paperList = getMethod(
                request=request,
                method='GET',
                task = 'GETPAPERLIST',
                pathInfo=paper_list_URL.strip(),
                )
            data = json.loads(paperList.text)
            print('paper list :>>>>',data)
            try:
                authority = request.session['authority']
                dictionary = get_authority_list(authority,'resource_login')
            except:
                authority = []
                dictionary = get_authority_list(authority,'admin_login')
            return render(request,'Admin/paper-management/paper-approval-list.html',{'username':username,'data':data,'authority':dictionary})
    else:
        return redirect('login')


# # =========================================================================================================================================================================
# #                                                                   SUBMIT PAPER DATA TO THE MODAL
# # =========================================================================================================================================================================
def submitPaper(request):
    if request.session.has_key('auth_token'):
        username = request.session['auth_username']
        if request.method == 'POST':
            paperID = request.POST['paperID']
            paperName = request.POST['paperName']
            paperAssociateCourse = request.POST['paperAssociateCourse']
            paperAssociateSubject = request.POST['paperAssociateSubject']
            totalPaperTime = request.POST['totalPaperTime']
            paperTotalMarks = request.POST['paperTotalMarks']
            paperPassingMark = request.POST['paperPassingMark']
            paperStatus = request.POST['paperStatus']
            paperLanguage = request.POST['paperLanguage']
            paperDefaultLanguage = request.POST['paperDefaultLanguage']
            paperGuideLines = request.POST['paperGuideLines']

            totalSection = request.POST['totalSection']
            totalnumberOuestion = request.POST['totalnumberOuestion']
            sectionDetails = request.POST.getlist('sectionDetails[]')

            SectionWiseQuestionList = request.POST['SectionWiseQuestionList']
            
            automatedSet = request.POST['automatedSet']
            noOfSets = request.POST['noOfSets']

            print('=====>>>>',paperID)
            print('=====>>>>',paperName)
            print('=====>>>>',paperAssociateCourse)
            print('=====>>>>',paperAssociateSubject)
            print('=====>>>>',totalPaperTime)
            print('=====>>>>',paperTotalMarks)
            print('=====>>>>',paperPassingMark)
            print('=====>>>>',paperStatus)
            print('=====>>>>',paperLanguage)
            print('=====>>>>',paperDefaultLanguage)
            print('=====>>>>',paperGuideLines)
            print('=====>>>>',totalSection)
            print('=====>>>>',totalnumberOuestion)
            print('=====>>>>',str(sectionDetails))
            print('=====>>>>',SectionWiseQuestionList)
            print('=====>>>>',automatedSet)
            print('=====>>>>',noOfSets)
            # exit()

            data = {}
            data['paperID'] = paperID
            data['paperName'] = paperName
            data['paperAssociateCourse'] = paperAssociateCourse
            data['paperAssociateSubject'] = paperAssociateSubject
            data['totalPaperTime'] = totalPaperTime
            data['paperTotalMarks'] = paperTotalMarks
            data['paperPassingMark'] = paperPassingMark
            data['paperStatus'] = paperStatus
            data['paperLanguage'] = paperLanguage      
            data['paperDefaultLanguage'] = paperDefaultLanguage            
            data['paperGuideLines'] = paperGuideLines
            data['totalSection'] = totalSection
            data['totalnumberOuestion'] = totalnumberOuestion
            data['sectionDetails'] = str(sectionDetails)             
            data['SectionWiseQuestionList'] = SectionWiseQuestionList            
            data['automatedSet'] = automatedSet
            data['noOfSets'] = noOfSets
            
            apiPaperCreation = postMethod(
                request=request,
                method='POST',
                task = 'ADDEXAMPAPER',
                pathInfo=addExampaper_URl.strip(),
                dataList = data
                )
            res = apiPaperCreation
            response_code = res.status_code
            response_text= json.loads(res.text)

            print(response_text)
            print(response_code)

            # {"message":"Question Created Successfully"}

            if('message' in response_text):
                return JsonResponse({'data' : 'success'})
            elif(response_code == 409):
                # print(dataDict)
                return JsonResponse({'data':response_text})
            else:
                return JsonResponse({'data' : response_text})
    else:
        return redirect('login')


# # =========================================================================================================================================================================
# #                                                                   EDIT SPECIFIC PAPER
# # =========================================================================================================================================================================
def edit_paper_detail(request,id):
    if request.session.has_key('auth_token'):
        username = request.session['auth_username']
        if request.method == 'GET':
            tokenKey = request.session['auth_token']
            print('this is my papr i : ',id)
            # -----------------------------------------
            apiGetSpecificPaper = getMethod(
                    request=request,
                    method='GET',
                    task = 'GETSPECIFICPAPER',
                    pathInfo=getSpecificPaper_URL+str(id)+'/'.strip(),
                    )
            res = apiGetSpecificPaper
            response_code = res.status_code
            paperData = json.loads(apiGetSpecificPaper.text)
            questionList = eval(paperData['data']['SectionWiseQuestionList'])
            questionsDict = {}
            count = 1
            for i in questionList:
                print(i)
                questionList = i['Section_'+str(count)]
                questionArray = []
                for j in questionList:
                    print('questionNumber >> ',j)
                    apispecificQuestion = getMethod(
                    request=request,
                    method='GET',
                    task = 'VIEWSINGLEQUESTION',
                    pathInfo=viewSpecificQuestion_URL+str(j)+'/'.strip(),
                    )
                    specificQuestionData = json.loads(apispecificQuestion.text)
                    print('specificQuestionData >>> ',specificQuestionData)
                    questionArray.append(specificQuestionData)
                questionsDict['Section_'+str(count)] = questionArray
                count = count + 1

            print('questionsDict >> ',questionsDict)
            # exit()


            apiLanguageList = getMethod(
                    request=request,
                    method='GET',
                    task = 'GETLANGUAGES',
                    pathInfo=getlanguage_list.strip(),
                    )
            lang = json.loads(apiLanguageList.text)
            print('lang =>>',lang)

            paperLanguage = ''
            paperdefaultLang =''

            for i in lang:
                if(i['id'] == int(paperData['data']['paperLanguage'])):
                    paperLanguage = i['languageName']
                    paperdefaultLang = paperLanguage

            # exit()
            # ##
            # sectionData = eval(paperData['data']['SectionWiseQuestionList'])
            # questionArray = []
            # count = 1
            # for i in sectionData:
            #     for j in i['Section '+str(count)]:
            #         questionArray.append(j)
            #     count = count + 1
            #     paperData['questionArray'] = questionArray
            #     questionArray = []

            # languageData = paperData['data']['paperLanguage']
            # x = languageData.replace('[','')
            # y = x.replace(']','')
            # z = y.replace("'",'')

            # paperData['languageData'] = z

            paperData['sectioncount'] = len(eval(paperData['data']['SectionWiseQuestionList'])) 
            # -----------------------------------------
            apiSpeificCourse = getMethod(
                request=request,
                method='GET',
                task = 'GETCOURSE',
                pathInfo=getSpecificCourse_URL+str(paperData['data']['paperAssociateCourse'])+'/'.strip(),
                )
            dataCourse = json.loads(apiSpeificCourse.text)
            courseName = dataCourse['courseName']
            # -----------------------------------------
            apiSpeificSubject = getMethod(
                request=request,
                method='GET',
                task = 'GETSPECIFICSUBJECT',
                pathInfo=getSpecificSubject_URL+str(paperData['data']['paperAssociateSubject'])+'/'.strip(),
                )
            dataSubject = json.loads(apiSpeificSubject.text)
            subjectName = dataSubject['subjectName']
            try:
                authority = request.session['authority']
                dictionary = get_authority_list(authority,'resource_login')
            except:
                authority = []
                dictionary = get_authority_list(authority,'admin_login')
            # # =========================================
            # print('===================================================================================================================')
            print('this is my paper data for the id : ',id,'\n',paperData)
            #  {'data': {'id': 11, 'paperID': 'paper001', 'paperName': 'math-001', 'paperTotalMarks': '20', 'paperPassingMark': '15', 'paperStatus': 'Completed', 'paperDeafaultLanguage': None, 'paperLanguage': '2', 'paperGuideLines': 'bjfbsgfr gre gjherkjgh erg erhgjreh ig rekjghkerjgher gj ergh jerg reig erhgkjhrkjg er ger jhgbehrjg jr g rejgbiuerg', 'totalPaperTime': '15:00', 'totalNoSection': '3', 'totalnumberOuestion': '5', 'sectionDetails': "['1-2-2-10-1', '2-2-1-5-2', '3-3-2-5-1,2']", 'SectionWiseQuestionList': '[{"Section_1":["507","519"]},{"Section_2":["523"]},{"Section_3":["525","526"]}]', 'automatedSet': True, 'noOfSets': '2', 'created_at': '2021-06-11T12:00:00.725823Z', 'updated_at': '2021-06-11T12:00:00.725851Z', 'paperAssociateCourse': 1, 'paperAssociateSubject': 1}, 'status': True, 'message': 'success', 'sectioncount': 3, 'courseName': 'BSC', 'subjectName': 'Maths'}
            # print('===================================================================================================================')
            listData = []
            listData.append(questionsDict)

            return render(request,'Admin/paper-management/edit-paper.html',{'data':paperData['data'],'courseName':courseName,'subjectName':subjectName,'paperLanguage':paperLanguage,'paperdefaultLang':paperdefaultLang,'questionsDict' : listData,'username':username,'tokenKey':tokenKey,'authority':dictionary})

        if request.method == 'POST':
            paperID = request.POST['paperID']
            paperName = request.POST['paperName']
            paperPassingMark = request.POST['paperPassingMark']
            paperGuideLines = request.POST['paperGuideLines']
            SectionWiseQuestionList = request.POST['SectionWiseQuestionList']
            automatedSet = request.POST['automatedSet']
            noOfSets = request.POST['noOfSets']

            print('=====>>>>',paperID)
            print('=====>>>>',paperName)
            print('=====>>>>',paperPassingMark)
            print('=====>>>>',paperGuideLines)
            print('=====>>>>',SectionWiseQuestionList)
            print('=====>>>>',automatedSet)
            print('=====>>>>',noOfSets)
            # exit()

            data = {}
            data['paperID'] = paperID
            data['paperName'] = paperName
            data['paperPassingMark'] = paperPassingMark           
            data['paperGuideLines'] = paperGuideLines
            data['SectionWiseQuestionList'] = SectionWiseQuestionList            
            data['automatedSet'] = automatedSet
            data['noOfSets'] = noOfSets
            
            apiPaperCreation = postMethod(
                request=request,
                method='PUT',
                task = 'UPDATEEXAMPAPER',
                pathInfo=upadateSpecificPaper_URL+str(id)+'/'.strip(),
                dataList = data
                )
            res = apiPaperCreation
            response_code = res.status_code
            response_text= json.loads(res.text)

            print(response_text)
            print(response_code)

            # {"message":"Question Created Successfully"}

            if('message' in response_text):
                return JsonResponse({'data' : 'success'})
            elif(response_code == 409):
                # print(dataDict)
                return JsonResponse({'data':response_text})
            else:
                return JsonResponse({'data' : response_text})
    else:
        return redirect('login')

# # =========================================================================================================================================================================
# #                                                                   PREVIEW NEW PAPER DETAILS
# # =========================================================================================================================================================================
def getQues(request):
    if request.session.has_key('auth_token'):
        username = request.session['auth_username']
        tokenKey = request.session['auth_token']
        if request.method == 'GET':
            questionList = request.GET.getlist('questionList[]')
            defaultLanguage = request.GET['defaultLanguage']
            print('==================================>>',questionList,defaultLanguage)
            questionArrayData = []
            for i in questionList:
                data = i.split(',')
                for j in range(len(data)):
                    apispecificQuestion = getMethod(
                    request=request,
                    method='GET',
                    task = 'GETSPECIFICQUESTION',
                    pathInfo=getspecificQuestion_list_URL+str(data[j])+'/'.strip(),
                    )
                    specificQuestionData = json.loads(apispecificQuestion.text)
                    specificQuestionData[0]['quesId'] = str(questionList[0])

                    if(specificQuestionData[0]['optionList']):
                        optionListData = eval(specificQuestionData[0]['optionList'])
                        optionCountData = eval(specificQuestionData[0]['selectNoOption'])
                        
                    if(specificQuestionData[0]['selectLanguage'] == defaultLanguage):
                        questionArrayData.append(specificQuestionData[0])
                        
                        print('00000000000>>>>',questionArrayData)
            return JsonResponse({'questionResponse':questionArrayData})
    else:
        return redirect('login')

# # =========================================================================================================================================================================
# #                                                                   CREATE PAPER : PAGE 02
# # =========================================================================================================================================================================
# def select_paper_batch_student(request):
#     if request.session.has_key('auth_token'):
#         username = request.session['auth_username']
#         return render(request,'Admin/paper-management/select-batch-student.html',{'username':username})
#     else:
#         return redirect('login')


# # =========================================================================================================================================================================
# #                                                                   CREATE PAPER : PAGE 02
# # =========================================================================================================================================================================
# def paper_student_detail(request):
#     if request.session.has_key('auth_token'):
#         username = request.session['auth_username']
#         return render(request,'Admin/paper-management/student-detail.html',{'username':username})
#     else:
#         return redirect('login')


# # =========================================================================================================================================================================
# #                                                                   VIEW SPECIFIC PAPER DETAILS
# # =========================================================================================================================================================================
def view_paper_detail(request,id):
    if request.session.has_key('auth_token'):
        username = request.session['auth_username']
        if request.method == 'GET':
            apiGetSpecificPaper = getMethod(
                    request=request,
                    method='GET',
                    task = 'GETSPECIFICPAPER',
                    pathInfo=getSpecificPaper_URL+str(id)+'/'.strip(),
                    )
            res = apiGetSpecificPaper
            response_code = res.status_code
            paperData = json.loads(apiGetSpecificPaper.text)
            questionList = eval(paperData['data']['SectionWiseQuestionList'])
            questionsDict = {}
            count = 1
            for i in questionList:
                print(i)
                questionList = i['Section_'+str(count)]
                questionArray = []
                for j in questionList:
                    print('questionNumber >> ',j)
                    apispecificQuestion = getMethod(
                    request=request,
                    method='GET',
                    task = 'VIEWSINGLEQUESTION',
                    pathInfo=viewSpecificQuestion_URL+str(j)+'/'.strip(),
                    )
                    specificQuestionData = json.loads(apispecificQuestion.text)
                    print('specificQuestionData >>> ',specificQuestionData)
                    questionArray.append(specificQuestionData)
                questionsDict['Section_'+str(count)] = questionArray
                count = count + 1
            apiLanguageList = getMethod(
                    request=request,
                    method='GET',
                    task = 'GETLANGUAGES',
                    pathInfo=getlanguage_list.strip(),
                    )
            lang = json.loads(apiLanguageList.text)
            paperLanguage = ''
            paperdefaultLang =''
            for i in lang:
                if(i['id'] == int(paperData['data']['paperLanguage'])):
                    paperLanguage = i['languageName']
                    paperdefaultLang = paperLanguage

            paperData['sectioncount'] = len(eval(paperData['data']['SectionWiseQuestionList'])) 
            # -----------------------------------------
            apiSpeificCourse = getMethod(
                request=request,
                method='GET',
                task = 'GETCOURSE',
                pathInfo=getSpecificCourse_URL+str(paperData['data']['paperAssociateCourse'])+'/'.strip(),
                )
            dataCourse = json.loads(apiSpeificCourse.text)
            courseName = dataCourse['courseName']
            # -----------------------------------------
            apiSpeificSubject = getMethod(
                request=request,
                method='GET',
                task = 'GETSPECIFICSUBJECT',
                pathInfo=getSpecificSubject_URL+str(paperData['data']['paperAssociateSubject'])+'/'.strip(),
                )
            dataSubject = json.loads(apiSpeificSubject.text)
            subjectName = dataSubject['subjectName']
            try:
                authority = request.session['authority']
                dictionary = get_authority_list(authority,'resource_login')
            except:
                authority = []
                dictionary = get_authority_list(authority,'admin_login')
            try:
                authority = request.session['authority']
                dictionary = get_authority_list(authority,'resource_login')
            except:
                authority = []
                dictionary = get_authority_list(authority,'admin_login')
            listData = []
            listData.append(questionsDict)
            return render(request,'Admin/paper-management/preview-data.html',{'data':paperData['data'],'courseName':courseName,'subjectName':subjectName,'paperLanguage':paperLanguage,'paperdefaultLang':paperdefaultLang,'questionsDict' : listData,'username':username,'authority':dictionary})
    else:
        return redirect('login')


# # =========================================================================================================================================================================
# #                                                                   DELETE SPECIFIC PAPER
# # =========================================================================================================================================================================
def getAllquestionType(request):
    if request.session.has_key('auth_token'):
        if request.method == 'GET':
            apigetquestionType = getMethod(
                    request=request,
                    method='GET',
                    task = 'GETLANGUAGES',
                    pathInfo=getquestionType.strip(),
                    )
            questionType = json.loads(apigetquestionType.text)
            return JsonResponse({'questionType':questionType})

    else:
        return redirect('login')


# # =========================================================================================================================================================================
# # =========================================================================================================================================================================
def QuestionFilterData(request):
    if request.session.has_key('auth_token'):
        year = request.GET['year']
        courseID = request.GET.get('courseId')
        subjectID = request.GET.get('subjectID')
        topic = request.GET.getlist('topic[]')

        difficultyList = request.GET.getlist('difficultyList[]')
        questionTypeList = request.GET.getlist('questionTypeList[]')
        languageList = request.GET.getlist('marksList[]')
        marksList = request.GET.getlist('languageList[]')

        defaultLanguage = request.GET['defaultLanguage']

        print('===========>>>>>',defaultLanguage,year,courseID,subjectID,topic,difficultyList,questionTypeList,languageList,marksList)
        

        # url = "http://localhost:5000/api/questionFilterData?year=2021&course=2&subject=4&topic=&bydifficulty=E,M,D&quesType=O,S&language=E,H&byMarks=[1,2,3,gt_3]"

        print(year,'<=>',courseID,'<=>',subjectID,'<=>',topic,'<=>',difficultyList,'<=>',questionTypeList,'<=>',marksList,'<=>',languageList)

        apiFilteredQuestion = getMethod(
            request=request,
            method='GET',
            task = 'GETFILTEREDDATA',
            pathInfo=filterQuestion_URL+"?year="+str(year)+"&course="+str(courseID)+"&subject="+str(subjectID)+"&topic="+str(topic)+"&bydifficulty="+str(difficultyList)+"&quesType="+str(questionTypeList)+"&language="+str(languageList)+"&byMarks="+str(marksList).strip(),
            )
        filteredData = json.loads(apiFilteredQuestion.text)
        print(filteredData)

        data = []

        if(len(filteredData)>0):
            for i in filteredData:
                if(i['selectLanguage'] == defaultLanguage):
                    yearList = i['created_at'].split('-')
                    i['year'] = yearList[0]
                    data.append(i)
            print('===========================================================================')
            print('this is response data : ',filteredData)
            print('this is my data : ',data)
            print('===========================================================================')
        else:
            data = []
            # exit()
        return JsonResponse({'FILTERED_data':data})
    else:
        return JsonResponse({'error':'Error!'})

















def questionSearch(request):
    if request.session.has_key('auth_token'):
        # courseId = request.GET['courseId']
        # subjectID = request.GET['subjectID']
        # questionType = request.GET['questionTypeList']
        # language = request.GET.getlist('languageList[]')
        # topicArray = request.GET['topicArray']
        defaultLanguage = request.GET['defaultLanguage']
        # apiGetQuestion = getMethod(
        #     request=request,
        #     method='GET',
        #     task = 'GETQUESTIONLIST',
        #     pathInfo=getSpecificQuestionList_URL+
        #     '?course='+str(courseId)+
        #     '&subject='+str(subjectID)+
        #     '&languages='+str(language)+
        #     '&questionType='+str(questionType)+
        #     '&Topic='+str(topicArray).strip(),
        #     )
        # data = json.loads(apiGetQuestion.text)
        # print(data)
        # year = request.GET['year']
        year = 2021
        courseID = request.GET.get('courseId')
        subjectID = request.GET.get('subjectID')
        topic = request.GET.get('topic')

        if(topic == None):
            topic = ''

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
        marksList= request.GET.getlist('marksList[]')
        languageList = request.GET.getlist('languageList[]')

        # questionSearchString = request.GET['search_String']
        # page = request.GET['page']

        # http://13.233.247.133/api/questionFilterData?year=2021&course=1&subject=0&topic=AP&bydifficulty=[2]&quesType=[2]&language=[1]&byMarks=[1]&label_search=mainFilter&page=2
        print('====================================================================')
        print('year <=>',year)
        print('courseID <=>',courseID)
        print('subjectID <=>',subjectID)
        print('topic <=>',topic)
        print('difficultyList <=>',difficultyList)
        print('questionTypeList <=>',questionTypeList)
        print('marksList <=>',marksList)
        print('languageList <=>',languageList)
        print('====================================================================')

        # exit()
        mainFilter= 'mainFilter'

        apiFilteredQuestion = getMethod(
            request=request,
            method='GET',
            task = 'GETFILTEREDDATA',
            pathInfo=filterQuestion_URL+"?year="+str(year)+"&course="+str(courseID)+"&subject="+str(subjectID)+"&topic="+str(topic)+"&bydifficulty="+str(difficultyList)+"&quesType="+str(questionTypeList)+"&language="+str(languageList)+"&byMarks="+str(marksList)+"&label_search="+str(mainFilter).strip(),
            )
        data = json.loads(apiFilteredQuestion.text)
        print('filtered data >>> ',data)
        # exit()


        # data = data[0]
        print('DATA ::>>',data)
        # exit()
        # {'id': 552, 'question': '<span style="color: rgb(32, 33, 36); font-family: arial, sans-serif; font-size: 16px;">संख्या से आप क्या समझते हैं?</span>', 'optionList': 'NA', 'sameQuestionrefrence': '2021-06-10|08:49:48.859422', 'created_at': '2021-06-10T09:08:06.467161Z', 'updated_at': '2021-06-10T09:08:06.467188Z', 'refrence_Questions_Type_Detail': {'id': 10, 'Topic': 'Number theory', 'selectNoOption': '', 'correctMarks': '2', 'created_at': '2021-06-10T07:59:40.834262Z', 'updated_at': '2021-06-10T07:59:40.834287Z', 'selectCourse': {'id': 3, 'courseID': 'AB001', 'courseName': 'BA', 'created_at': '2021-06-10T07:51:25.958293Z', 'updated_at': '2021-06-10T08:46:17.222461Z', 'courseType': 1}, 'selectSubject': {'id': 1, 'subjectID': 'dews', 'subjectName': 'Maths', 'created_at': '2021-06-04T08:44:44.223559Z', 'updated_at': '2021-06-04T08:44:44.223596Z'}, 'questionType': {'id': 1, 'questio_type_id': 'gbgbs', 'questio_type_name': 'Subjective', 'created_at': '2021-06-04T08:43:13.109985Z', 'updated_at': '2021-06-04T08:43:13.110010Z'}, 'subQuestionType': {'id': 1, 'questio_sub_type_id': 'ftg3', 'questio_sub_type_name': 'True/False', 'created_at': '2021-06-04T08:42:20.345852Z', 'updated_at': '2021-06-04T08:42:20.345878Z'}, 'difficultyLevel': {'id': 2, 'questio_level_type_id': 'hard6540', 'questio_level_type_name': 'Hard', 'created_at': '2021-06-04T08:41:16.090782Z', 'updated_at': '2021-06-04T08:41:16.090807Z'}}, 'selectLanguage': {'id': 1, 'languageCode': 'hhdb678', 'languageName': 'Hindi', 'created_at': '2021-06-04T08:43:37.451254Z', 'updated_at': '2021-06-04T08:43:37.451279Z'}
        sameRefreIDs = []
        ids = []
        for i in range(len(data)):
            ids.append(data[i]['id'])
            sameRefreIDs.append(ids)
            ids = []
        print(sameRefreIDs)
        # exit()
        filteredData = []
        count = 0
        if(len(data)>0):
            for i in data:
            # for j in i['quetionData']:
                print('>>>>',i)
                print('defaultLanguage ===>',defaultLanguage)
                if(i['selectLanguage']['languageName'] == defaultLanguage):
                    print(i['selectLanguage'],'-------------------------------',defaultLanguage)
                    yearList = i['created_at'].split('-')
                    i['year'] = yearList[0]
                    i['id_piar'] = sameRefreIDs[count]
                    filteredData.append(i)
            count = count + 1
            print('===========================================================================')
            print('this is response filteredData : ',filteredData)
            print('===========================================================================')
        else:
            filteredData = []
        return JsonResponse({'FILTERED_data':filteredData})
    else:
        return JsonResponse({'error':'Error!'})


# ===================================================================================================================================================================
#                                                          SEARCH & PAGINATION FOR PAPER LIST (with querystring or page number)
# ===================================================================================================================================================================
def paperSearch(request):
    if request.session.has_key('auth_token'):
        username = request.session['auth_username']
        paperSearchString = request.GET['search_String']
        page = request.GET['page']

        print('string : ',paperSearchString,'pgno : ',page)
        apiSearchPaperDetails = getMethod(
                request=request,
                method='GET',
                task = 'SEARCHSTUDENT',
                pathInfo=search_paper_list_URL+'?data='+str(paperSearchString)+'&page='+str(page).strip(),
                )
        data = json.loads(apiSearchPaperDetails.text)

        return JsonResponse({'searchResultList': data})
    else:
        return redirect('login')


def filter_paper_question_Data(request):
    if request.session.has_key('auth_token'):
        year = request.GET['year']
        courseID = request.GET.get('courseId')
        subjectID = request.GET.get('subjectID')
        topic = request.GET.getlist('topicArray[]')

        # difficultyList = request.GET.getlist('difficultyList[]')
        questionTypeList = request.GET.getlist('questionTypeList[]')
        languageList = request.GET.getlist('languageList[]')
        # marksList = request.GET.getlist('languageList[]')
        # label = request.GET.get('label')

        if(courseID == ''):
            courseID = 0
        if(subjectID == ''):
            subjectID = 0
        # if(topic == ''):
        #     topic = 0

        # url = "http://localhost:5000/api/questionFilterData?year=2021&course=2&subject=4&topic=&bydifficulty=E,M,D&quesType=O,S&language=E,H&byMarks=[1,2,3,gt_3]"
        print(year,'<=>',courseID,'<=>',subjectID,'<=>',topic,'<=>',questionTypeList,'<=>',languageList)

        apiFilteredQuestion = getMethod(
            request=request,
            method='GET',
            task = 'GETFILTEREDDATA',
            pathInfo=filterQuestion_URL+"?year="+str(year)+"&course="+str(courseID)+"&subject="+str(subjectID)+"&topic="+str(topic)+"&bydifficulty=[]&quesType="+str(questionTypeList)+"&language="+str(languageList)+"&byMarks=[]".strip(),
            )
        filteredData = json.loads(apiFilteredQuestion.text)
        print(filteredData)

        if(len(filteredData)>0):
            for i in filteredData:
                yearList = i['created_at'].split('-')
                i['year'] = yearList[0]
        return JsonResponse({'FILTERED_data':filteredData})
    else:
        return redirect('login')