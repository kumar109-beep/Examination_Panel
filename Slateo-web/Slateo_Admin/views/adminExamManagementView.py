from django.shortcuts import render,redirect
from django.http import JsonResponse, HttpResponse, HttpResponseRedirect
from .Helper.postMethod import *
from .Helper.getMethod import *
from .Helper.globalURL import *
from .Helper.getAuthorityList import *
import json,datetime
from Slate_O.validateKey import checkKey
from .headerNotification import headerNotification



# Create your views here.
# =========================================================================================================================================================================
#                                                                   ADMIN DASHBOARD
# =========================================================================================================================================================================

def create_exam(request):
    if request.session.has_key('auth_token'):
        try:
            authority = request.session['authority']
            dictionary = get_authority_list(authority,'resource_login')
        except:
            authority = []
            dictionary = get_authority_list(authority,'admin_login')
        status = checkKey(dictionary,'create_exam')
        if(status == 'True' or len(authority) == 0):
            username = request.session['auth_username']
            if request.method == 'GET':
                tokenKey = request.session['auth_token']
                # apiCourseList = getMethod(
                #         request=request,
                #         method='GET',
                #         task = 'GETCOURSELIST',
                #         pathInfo=getCourseList_URL.strip(),
                #         )
                # data = json.loads(apiCourseList.text)
                apiCourseTypeList = getMethod(
                    request=request,
                    method='GET',
                    task = 'GETCOURSETYPELIST',
                    pathInfo=getCourseTypeList_URL.strip(),
                    )
                data = json.loads(apiCourseTypeList.text)
                print('data >> ',data)
                apiCourseList = getMethod(
                        request=request,
                        method='GET',
                        task = 'GETPAPERLIST',
                        pathInfo=getPaperList_URL.strip(),
                        )
                data1 = json.loads(apiCourseList.text)
                # exit()


                paperList = []
                for i in data1:
                    if i['paperStatus'] == 'Approved':
                        apiSpeificSubject = getMethod(
                        request=request,
                        method='GET',
                        task = 'GETSPECIFICSUBJECT',
                        pathInfo=getSpecificSubject_URL+str(i['paperAssociateSubject'])+'/'.strip(),
                        )
                        dataSubject = json.loads(apiSpeificSubject.text)
                        i['subjectName'] = dataSubject['subjectName']
                        yearList = i['created_at'].split('-')
                        i['year'] = yearList[0]
                        paperList.append(i)
                # try:
                #     authority = request.session['authority']
                #     dictionary = get_authority_list(authority,'resource_login')
                # except:
                #     authority = []
                #     dictionary = get_authority_list(authority,'admin_login')
                response = headerNotification(request)
                length = response[0]
                requestHeadingData = response[1]
                admin_data = response[2]

                return render(request,'Admin/exam-management/create-exam.html',{'admin_data':admin_data,'dataLength':length,'data':requestHeadingData['data'],'username':username,'tokenKey':tokenKey,'data1':data,'paperList':paperList,'authority':dictionary})
        else:
            return render(request,'403.html') 
    else:
        return redirect('login')
# =========================================================================================================================================================================
# =========================================================================================================================================================================
def submitExam(request):
    if request.session.has_key('auth_token'):
        username = request.session['auth_username']
        tokenKey = request.session['auth_token']
        if request.method == 'POST':
            examName = request.POST['examName']
            examID = request.POST['examID']
            examType = request.POST['examType']
            examPassword = request.POST['examPassword']
            examStartDate = request.POST['examStartDate']
            examEndDate = request.POST['examEndDate']
            examPaperTimeTable = request.POST['examPaperTimeTable']
            examAssociateCourseType = request.POST['examAssociateCourseType']
            examAssociateCourse = request.POST['examAssociateCourse']
            examPapers = request.POST.getlist('examPapers[]')
            examBatches = request.POST.getlist('examBatches[]')

            
            dataList = []
            for i in examPapers:
                data = int(i)
                dataList.append(data)
            
            batchList = []
            for i in examBatches:
                data = int(i)
                batchList.append(data)

            data = {}
            data['examName'] = examName
            data['examID'] = examID
            data['examType'] = examType
            data['examPassword'] = examPassword[0:]
            data['examStartDate'] = examStartDate
            data['examEndDate'] = examEndDate
            data['examPaperTimeTable'] = str(examPaperTimeTable)
            data['examAssociateCourseType'] = examAssociateCourseType
            data['examAssociateCourse'] = examAssociateCourse
            data['examPapers'] = dataList
            data['examBatches'] = batchList


            print(data)
            # exit()examAssociateCourseType

            apiExamCreation = postMethod(
                request=request,
                method='POST',
                task = 'CREATEEXAM',
                pathInfo=createExam_URL.strip(),
                dataList = data
                )
            res = apiExamCreation
            response_code = res.status_code
            print('response_code >> ',response_code)
            print('res text >> ',json.loads(res.text))
            # exit()
            return JsonResponse({'response':json.loads(res.text)})
    else:
        return redirect('login')



def getResource(request):
    if request.session.has_key('auth_token'):
        username = request.session['auth_username']
        tokenKey = request.session['auth_token']
        # -------------------------------------------------------------------------
        apiGetResourceList = getMethod(
            request=request,
            method='GET',
            task = 'GETRESOURCELIST',
            pathInfo=getResourceList_URL.strip(),
            )
        resourceData = json.loads(apiGetResourceList.text)
        # print('this is resource data 01  : >> ',resourceData)
        dataList = []
        resourceData = resourceData['data']
        for j in resourceData:
            for k in j['role_designation']:
                if k['roleName'] == 'Proctor':
                    dataList.append(j)
       
        for i in dataList:
            if '-' in i['fullName']:
                fullname = i['fullName'].split('-')
                i['fullname'] = fullname[0]+" "+fullname[1]
            else:
                i['fullname'] = i['fullName']
        print('this is resource data 02  : >> ',dataList)
        return JsonResponse({'resourceData':dataList})
    else:
        return redirect('login')



def create_exam_step_4(request):
    if request.session.has_key('auth_token'):
        username = request.session['auth_username']
        tokenKey = request.session['auth_token']
        return render(request,'Admin/exam-management/create-exam-step-4.html',{'username':username,'tokenKey':tokenKey})
    else:
        return redirect('login')


def create_exam_step_5(request):
    print('sssss')
    if request.session.has_key('auth_token'):
        username = request.session['auth_username']
        tokenKey = request.session['auth_token']
        return render(request,'Admin/exam-management/create-exam-step-5.html',{'username':username,'tokenKey':tokenKey})
    else:
        return redirect('login')


def create_exam_step_6(request):
    if request.session.has_key('auth_token'):
        username = request.session['auth_username']
        tokenKey = request.session['auth_token']
        return render(request,'Admin/exam-management/create-exam-step-6.html',{'username':username,'tokenKey':tokenKey})
    else:
        return redirect('login')


def exam_details(request,id):
    if request.session.has_key('auth_token'):
        try:
            authority = request.session['authority']
            dictionary = get_authority_list(authority,'resource_login')
        except:
            authority = []
            dictionary = get_authority_list(authority,'admin_login')
        status = checkKey(dictionary,'exam_details')
        if(status == 'True' or len(authority) == 0):
            username = request.session['auth_username']
            tokenKey = request.session['auth_token']
            if request.method == 'GET':
                # try:
                apiGetSpecificExam = getMethod(
                        request=request,
                        method='GET',
                        task = 'GETSPECIFICEXAM',
                        pathInfo=getSpecificExam_URL+str(id)+'/'.strip(),
                        )
                res = apiGetSpecificExam
                response_code = res.status_code
                examDataArray = json.loads(apiGetSpecificExam.text)
                print('this is my data  :>>>> ',examDataArray)
                    
                for i in examDataArray['data']['examPaperDetail']:
                    startDate = datetime.datetime.strptime(i['paperStartDate'],'%Y-%m-%d').strftime('%d %b %Y')
                    # endDate = datetime.datetime.strptime(i['examEndDate'],'%m/%d/%Y').strftime('%d %b %Y')

                    i['StartDate'] = startDate
                    # i['endDate'] = endDate
                    yearList = i['year'].split('-')
                    i['year_p'] = yearList[0]
                paperCount = len(examDataArray['data']['examPaperDetail'])
                # print('examDataArray : ------------->>',examDataArray)
                # {'data': {'id': 86, 'examName': 'CSE-I Year', 'examID': 'CSE-I-2021', 'examAssociateCourse': 'M.tech', 'examStartDate': '7/1/2021', 'examEndDate': '9/1/2021', 'examPassword': 'ku', 'examPaperDetail': [{'id': 28, 'subjectName': 'Hindi', 'year': '2021-04-25T19:00:24.459Z', 'totalPaperTime': '02:30', 'paperStartDate': '2021-09-01', 'paper_time_start': '09:30', 'paper_procter_id': 269, 'paper_procter_name': 'bjb-kgkh'}, {'id': 29, 'subjectName': 'Hindi', 'year': '2021-04-28T11:24:11.727Z', 'totalPaperTime': '17:53', 'paperStartDate': '2021-07-01', 'paper_time_start': '20:30', 'paper_procter_id': 269, 'paper_procter_name': 'bjb-kgkh'}, {'id': 30, 'subjectName': 'English', 'year': '2021-04-16T12:29:15.551Z', 'totalPaperTime': '03:00', 'paperStartDate': '2021-07-10', 'paper_time_start': '14:30', 'paper_procter_id': 269, 'paper_procter_name': 'bjb-kgkh'}]}, 'status': True, 'message': 'sucess'}
                # ----------------------------------------------------------------------
                context = []            
                # ----------------------------------------------------------------------
                response = headerNotification(request)
                length = response[0]
                requestHeadingData = response[1]
                admin_data = response[2]

                return render(request,'Admin/exam-management/exam-details.html',{'admin_data':admin_data,'dataLength':length,'data':requestHeadingData['data'],'username':username,'tokenKey':tokenKey,'data1':examDataArray['data'],'context':context,'paperCount':paperCount,'authority':dictionary})
        else:
            return render(request,'403.html') 
    else:
        return redirect('login')


def examlist(request):
    if request.session.has_key('auth_token'):
        try:
            authority = request.session['authority']
            dictionary = get_authority_list(authority,'resource_login')
        except:
            authority = []
            dictionary = get_authority_list(authority,'admin_login')
        status = checkKey(dictionary,'exam_list')
        if(status == 'True' or len(authority) == 0):
            username = request.session['auth_username']
            tokenKey = request.session['auth_token']
            apiExamList = getMethod(
                    request=request,
                    method='GET',
                    task = 'GETEXAMLIST',
                    pathInfo=getExamList_URL.strip(),
                    )
            examList = json.loads(apiExamList.text)
            print('this is exam list :>>> ',examList)
            for i in examList['data']:
                startDate = datetime.datetime.strptime(i['examStartDate'],'%m/%d/%Y').strftime('%d %b %Y')
                endDate = datetime.datetime.strptime(i['examEndDate'],'%m/%d/%Y').strftime('%d %b %Y')

                i['startDate'] = startDate
                i['endDate'] = endDate

            response = headerNotification(request)
            length = response[0]
            requestHeadingData = response[1]
            admin_data = response[2]

            return render(request,'Admin/exam-management/exam-list.html',{'admin_data':admin_data,'dataLength':length,'data':requestHeadingData['data'],'username':username,'tokenKey':tokenKey,'examList':examList['data'],'authority':dictionary})
        else:
            return render(request,'403.html') 
    else:
        return redirect('login')


def edit_exam(request,id):
    if request.session.has_key('auth_token'):
        try:
            authority = request.session['authority']
            dictionary = get_authority_list(authority,'resource_login')
        except:
            authority = []
            dictionary = get_authority_list(authority,'admin_login')
        status = checkKey(dictionary,'edit_exam')
        if(status == 'True' or len(authority) == 0):
            username = request.session['auth_username']
            tokenKey = request.session['auth_token']
            if request.method == 'GET':
                # --------------------------------------------------------------------------------
                apiGetSpecificExam = getMethod(
                        request=request,
                        method='GET',
                        task = 'GETSPECIFICEXAM',
                        pathInfo=getSpecificExam_URL+str(id)+'/'.strip(),
                        )
                res = apiGetSpecificExam
                response_code = res.status_code
                examDataArray = json.loads(apiGetSpecificExam.text)
                print('examDataArray >> ',examDataArray)
                if examDataArray['data']['examPaperDetail'] != 0:
                    for i in examDataArray['data']['examPaperDetail']:
                        yearList = i['year'].split('-')
                        i['year_p'] = yearList[0]
                apiBatchList = getMethod(
                    request=request,
                    method='GET',
                    task = 'GETBATCHLIST',
                    pathInfo=getBatchList_URL.strip(),
                    )
                batchData = json.loads(apiBatchList.text)
                print('batchData >>>>>>> ',batchData)
                # ==================================================================================
                apiGetResourceList = getMethod(
                                    request=request,
                                    method='GET',
                                    task = 'GETRESOURCELIST',
                                    pathInfo=getResourceList_URL.strip(),
                                    )
                resourceData = json.loads(apiGetResourceList.text)

                # exit()
                # print(resourceData)
                # exit()
                for i in resourceData['data']:
                    if '-' in i['fullName']:
                        fullname = i['fullName'].split('-')
                        i['fullname'] = fullname[0]+" "+fullname[1]
                    else:
                        i['fullname'] = i['fullName']
                roleStr = []

                resorceList = []
                for i in range(len(examDataArray['data']['examPaperDetail'])):
                    print('i data >> ',i)
                    dataDict = {}
                    dataDict['proctorId'] = examDataArray['data']['examPaperDetail'][i]['paper_procter_id']
                    dataDict['proctorName'] = examDataArray['data']['examPaperDetail'][i]['paper_procter_name']


                    resorceList.append(dataDict)
                # print('data >>> ',examDataArray['data']['examPaperDetail'])
                print('\n\n')
                batchIdArray = []
                for i in examDataArray['data']['batchManagement_mtwom']:
                    batchIdArray.append(i['id'])
                print('batchIdArray >>> ',batchIdArray)

                print('\n\n')
                print('resorceList >>> ',resorceList)
                response = headerNotification(request)
                length = response[0]
                requestHeadingData = response[1]
                admin_data = response[2]


                return render(request,'Admin/exam-management/edit-details.html',{'batchData':batchData,'batchIdArray':batchIdArray[0],'admin_data':admin_data,'dataLength':length,'data':requestHeadingData['data'],'username':username,'tokenKey':tokenKey,'data1':examDataArray['data'],'resorceList':resorceList,'authority':dictionary})

            if request.method == 'POST':
                print('hello ',id)
                examName = request.POST['examName']
                examID = request.POST['examID']
                examType = request.POST['examType']
                examPassword = request.POST['examPassword']
                examStartDate = request.POST['examStartDate']
                examEndDate = request.POST['examEndDate']
                examPaperTimeTable = request.POST['examPaperTimeTable']
                examAssociateCourse = request.POST['examAssociateCourse']
                examAssociateCourseType = request.POST['examAssociateCourse_Type']
                examPapers = request.POST.getlist('examPapers[]')
                examBatches = request.POST.getlist('examBatches[]')

                
                dataList = []
                for i in examPapers:
                    data = int(i)
                    dataList.append(data)

                batchList = []
                for i in examBatches:
                    data = int(i)
                    batchList.append(data)

                data = {}
                data['examName'] = examName
                data['examID'] = examID
                data['examType'] = examType
                data['examPassword'] = examPassword[0:]
                # data['examPassword'] = 'ku'
                data['examStartDate'] = examStartDate
                data['examEndDate'] = examEndDate
                data['examPaperTimeTable'] = str(examPaperTimeTable)
                data['examAssociateCourse'] = int(examAssociateCourse)
                data['examAssociateCourseType'] = int(examAssociateCourseType)
                data['examBatches'] = batchList
                data['examPapers'] = dataList

                print('update data :::>>> ',data)

                apiExamUpdate = postMethod(
                    request=request,
                    method='PUT',
                    task = 'UPDATEEXAM',
                    pathInfo=updateExam_URL+str(id)+'/'.strip(),
                    dataList = data
                    )
                res = apiExamUpdate
                response_code = res.status_code
                print('update data >> ',apiExamUpdate.text)
                print('response_code',response_code)
                # exit()
                response = ''
                if(response_code == 404 or response_code == 500):
                    response = 'error!'  
                else:
                    response = 'success'

                return JsonResponse({'response':response})
        else:
            return render(request,'403.html') 
    else:
        return redirect('login')






def getSpecificCourseIdPaper(request):
    if request.session.has_key('auth_token'):
        username = request.session['auth_username']
        tokenKey = request.session['auth_token']
        courseId = request.GET['courseId']
        paperList = getMethod(
                request=request,
                method='GET',
                task = 'GET_PAPER_ACCORDING_TO_COURSE',
                pathInfo=papers_accor_course_URL+str(courseId)+'/'.strip(),
                )
        data = json.loads(paperList.text)
        return JsonResponse({'data':data})
    return redirect('login')



# ===================================================================================================================================================================
#                                                          SEARCH & PAGINATION FOR EXAM LIST (with querystring or page number)
# ===================================================================================================================================================================
def examSearch(request):
    if request.session.has_key('auth_token'):
        username = request.session['auth_username']
        examSearchString = request.GET['search_String']
        page = request.GET['page']

        print('string : ',examSearchString,'pgno : ',page)
        apiSearchexamDetail = getMethod(
                request=request,
                method='GET',
                task = 'SEARCHEXAM',
                pathInfo=searchExam_URL+'?q='+str(examSearchString)+'&page='+str(page).strip(),
                )
        data = json.loads(apiSearchexamDetail.text)
        print('this is exam search data before >>>> ',data)

        return JsonResponse({'searchResultList': data})
    else:
        return redirect('login')


# ===================================================================================================================================================================
#                                                          FILTER FOR STUDENT LIST
# ===================================================================================================================================================================
def exam_Filter(request):
    if request.session.has_key('auth_token'):
        username = request.session['auth_username']
        filterString = request.GET['filterString']

        print('string : ',filterString)
        # <option value='Ongoing Exams'>Ongoing Exams</option>
        # <option value="Upcoming Exams">Upcoming Exams</option>
        # <option value="Completed Exams">Completed Exams</option>
        # <option value="Starting Month">Starting Month</option>
        # <option value="End Month">End Month</option>
        # <option value="Next Year">Next Year</option>

        # start & end date data format >> mm/dd/yyyy
        # ======================  date range conditions  ================================
        if(filterString == 'Ongoing Exams'):
            Start_Date = datetime.datetime.today().strftime ('%m/%d/%Y')
            print ('Start Date: ' + str(Start_Date))
            Ending_Date = datetime.datetime.today() + datetime.timedelta(days=7)
            End_Date = Ending_Date.strftime ('%m/%d/%Y')
            print ('End Date: ' + str(End_Date))

        if(filterString == 'Upcoming Exams'):
            Start_Date = datetime.datetime.today().strftime ('%m/%d/%Y')
            print ('Start Date: ' + str(Start_Date))
            Ending_Date = datetime.datetime.today() + datetime.timedelta(days=7)
            End_Date = Ending_Date.strftime ('%m/%d/%Y')
            print ('End Date: ' + str(End_Date))

        if(filterString == 'Completed Exams'):
            Start_Date = ''
            print ('Start Date: ' + str(Start_Date))
            End_Date = datetime.datetime.today() - datetime.timedelta(days=1)
            print('End Date: ',str(End_Date.date()))

        if(filterString == 'Starting Month'):
            pass

        if(filterString == 'End Month'):
            pass

        if(filterString == 'Next Year'):
            Start_Date = datetime.datetime.today().year + 1
            print ('Start Date: ' + str(Start_Date))
            End_Date = 'next_year'
            print ('End Date: ' + str(End_Date))

        # ===============================================================================
        apiFilterExamDetail = getMethod(
                request=request,
                method='GET',
                task = 'FILTEREXAM',
                pathInfo=filterExam_URL+'?start_date='+str(Start_Date)+'&last_date='+str(End_Date).strip(),
                )
        data = json.loads(apiFilterExamDetail.text)
        print('this is filtered exam data >>>> ',data)

        return JsonResponse({'searchResultList': data})
    else:
        return redirect('login')




def checkExistence(request):
    if request.session.has_key('auth_token'):
        username = request.session['auth_username']
        if request.method == 'GET':
            check = request.GET['check']
            validateString = request.GET['valiadteString']
            print('check value : ',check)
            print('validation string : ',validateString)
            # exit()

            if(check == 'examUniqueName' or check == 'updateExamName'):
                apiExamNameDetail = getMethod(
                request=request,
                method='GET',
                task = 'CHECKEXISTENCE',
                pathInfo=checkExamName_URL+'?q='+str(validateString).strip(),
                )
                data = json.loads(apiExamNameDetail.text)
                print('examUniqueName data >> ',data)
                return JsonResponse({'resultData': data})

            if(check == 'examUniqueCode'):
                apiExamIDDetail = getMethod(
                request=request,
                method='GET',
                task = 'CHECKEXISTENCE',
                pathInfo=checkExamId_URL+'?q='+str(validateString).strip(),
                )
                data = json.loads(apiExamIDDetail.text)
                print('examUniqueCode data >> ',data)
                return JsonResponse({'resultData': data})

    else:
        return redirect('login')


def filterBatches(request):
    if request.method == 'GET':
        courseTypeId = request.GET['courseTypeId']
        courseId = request.GET['coursenameId']

        print('courseTypeId : ',courseTypeId)
        print('courseId : ',courseId)

        apiExamBatchDetail = getMethod(
            request=request,
            method='GET',
            task = 'CHECKEXISTENCE',
            pathInfo=filterBatch_URL+'?courseType='+str(courseTypeId)+'&course='+str(courseId).strip(),
            )
        batchData = json.loads(apiExamBatchDetail.text)
        print('batchData data >> ',batchData)

        return JsonResponse({'batchList':batchData})
