from django.shortcuts import render,redirect
from django.http import JsonResponse, HttpResponse, HttpResponseRedirect
from .Helper.getAuthorityList import *
from Slate_O.validateKey import checkKey
from .Helper.postMethod import *
from .Helper.getMethod import *
from .Helper.globalURL import *
import json,datetime
import pandas as pd
import csv
from django.urls import reverse
from .headerNotification import headerNotification

# ========================================================================================================================================
# ========================================================================================================================================
def assign_evaluator(request,id):
    if request.session.has_key('auth_token'):
        try:
            authority = request.session['authority']
            dictionary = get_authority_list(authority,'resource_login')
        except:
            authority = []
            dictionary = get_authority_list(authority,'admin_login')
        status = checkKey(dictionary,'assign_evaluator')
        if(status == 'True' or len(authority) == 0):
            username = request.session['auth_username']
            tokenKey = request.session['auth_token']
            # =======================================================================================
            # =======================================================================================
            apiCourseList = getMethod(
                    request=request,
                    method='GET',
                    task = 'GETCOURSELIST',
                    pathInfo=getCourseList_URL.strip(),
                    )
            CourseData = json.loads(apiCourseList.text)
            # print('course data >> ',CourseData)
            # =======================================================================================
            # =======================================================================================
            apiCompletedExamList = getMethod(
                    request=request,
                    method='GET',
                    task = 'COMPLETEDEXAMS',
                    pathInfo=getCompletedExamList_URL+str(id)+'/'.strip(),
                    )
            CompletedExamData = json.loads(apiCompletedExamList.text)

            print('comleted exam data >> ',CompletedExamData)
            # exit()
            resourceIdArray = []
            for i in CompletedExamData:
                year = i['created_at'].split('-')
                i['paper_year'] = year[0]
                i['evaluatorCount'] = len(i['assign_evaluator'])
                idList = []
                for j in range(len(i['assign_evaluator'])):
                    idList.append(int(i['assign_evaluator'][j]['id']))
                resourceIdArray.append(idList)
                i['evaluatorIdList'] = idList

            print('resourceIdArray data >> ',resourceIdArray)
            # =======================================================================================
            # =======================================================================================
            response = headerNotification(request)
            length = response[0]
            requestHeadingData = response[1]
            admin_data = response[2]
            return render(request,'Admin/result-management/assign-evaluator.html',{'admin_data':admin_data,'dataLength':length,'data':requestHeadingData['data'],'username':username,'tokenKey':tokenKey,'authority':dictionary,'courseList':CourseData,'CompletedExamData':CompletedExamData})
        else:
            return render(request,'403.html')  
    else:
        return redirect('login')

# ========================================================================================================================================
# ========================================================================================================================================
def evaluate_answers(request):
    if request.session.has_key('auth_token'):
        try:
            authority = request.session['authority']
            dictionary = get_authority_list(authority,'resource_login')
        except:
            authority = []
            dictionary = get_authority_list(authority,'admin_login')
        status = checkKey(dictionary,'evaluate_answers')
        if(status == 'True' or len(authority) == 0):
            username = request.session['auth_username']
            tokenKey = request.session['auth_token']
            # =======================================================================================
            apiCourseList = getMethod(
                    request=request,
                    method='GET',
                    task = 'GETCOURSELIST',
                    pathInfo=getCourseList_URL.strip(),
                    )
            CourseData = json.loads(apiCourseList.text)
            # print('course data >> ',CourseData)
            apiCompletedExamList = getMethod(
                    request=request,
                    method='GET',
                    task = 'COMPLETEDEXAMS',
                    pathInfo=getCompletedExamList_URL.strip(),
                    )
            print('apiCompletedExamList.text >>> ',apiCompletedExamList.text)
            CompletedExamData = json.loads(apiCompletedExamList.text)

            print('comleted exam data >> ',CompletedExamData)
            resourceIdArray = []
            for i in CompletedExamData:
                year = i['created_at'].split('-')
                i['paper_year'] = year[0]
                i['evaluatorCount'] = len(i['assign_evaluator'])
                idList = []
                for j in range(len(i['assign_evaluator'])):
                    idList.append(int(i['assign_evaluator'][j]['id']))
                resourceIdArray.append(idList)
                i['evaluatorIdList'] = idList
            # =======================================================================================
            response = headerNotification(request)
            length = response[0]
            requestHeadingData = response[1]
            admin_data = response[2]
            return render(request,'Admin/result-management/evaluate-answers.html',{'admin_data':admin_data,'dataLength':length,'data':requestHeadingData['data'],'username':username,'tokenKey':tokenKey,'authority':dictionary,'courseList':CourseData,'CompletedExamData':CompletedExamData})
        else:
            return render(request,'403.html')  
    else:
        return redirect('login')


def evaluateAnswerFilter(request):
    if request.method == 'GET':
        courseID = request.GET['courseID']
        subjectID = request.GET['subjectID']
        year = request.GET['year']

        print('courseID value : ',courseID)
        print('subjectID value : ',subjectID)
        print('year value : ',year)

        return JsonResponse({'searchResultList' : []})
# ========================================================================================================================================
# ========================================================================================================================================
def response(request,id):
    if request.session.has_key('auth_token'):
        try:
            authority = request.session['authority']
            dictionary = get_authority_list(authority,'resource_login')
        except:
            authority = []
            dictionary = get_authority_list(authority,'admin_login')
        status = checkKey(dictionary,'response')
        if(status == 'True' or len(authority) == 0):
            username = request.session['auth_username']
            tokenKey = request.session['auth_token']
            response = headerNotification(request)
            length = response[0]
            requestHeadingData = response[1]
            admin_data = response[2]
            return render(request,'Admin/result-management/response.html',{'admin_data':admin_data,'dataLength':length,'data':requestHeadingData['data'],'username':username,'tokenKey':tokenKey,'authority':dictionary})
        else:
            return render(request,'403.html')  
    else:
        return redirect('login')


# ========================================================================================================================================
# ========================================================================================================================================
def evaluate(request):
    if request.session.has_key('auth_token'):
        try:
            authority = request.session['authority']
            dictionary = get_authority_list(authority,'resource_login')
        except:
            authority = []
            dictionary = get_authority_list(authority,'admin_login')
        status = checkKey(dictionary,'evaluate')
        if(status == 'True' or len(authority) == 0):
            username = request.session['auth_username']
            tokenKey = request.session['auth_token']
            response = headerNotification(request)
            length = response[0]
            requestHeadingData = response[1]
            admin_data = response[2]
            return render(request,'Admin/result-management/evaluate.html',{'admin_data':admin_data,'dataLength':length,'data':requestHeadingData['data'],'username':username,'tokenKey':tokenKey,'authority':dictionary})
        else:
            return render(request,'403.html')  
    else:
        return redirect('login')

# ========================================================================================================================================
# ========================================================================================================================================
def edit_evaluate(request):
    if request.session.has_key('auth_token'):
        try:
            authority = request.session['authority']
            dictionary = get_authority_list(authority,'resource_login')
        except:
            authority = []
            dictionary = get_authority_list(authority,'admin_login')
        status = checkKey(dictionary,'evaluate')
        if(status == 'True' or len(authority) == 0):
            username = request.session['auth_username']
            tokenKey = request.session['auth_token']
            response = headerNotification(request)
            length = response[0]
            requestHeadingData = response[1]
            admin_data = response[2]
            return render(request,'Admin/result-management/edit-evaluate.html',{'admin_data':admin_data,'dataLength':length,'data':requestHeadingData['data'],'username':username,'tokenKey':tokenKey,'authority':dictionary})
        else:
            return render(request,'403.html')  
    else:
        return redirect('login')


# ========================================================================================================================================
# ========================================================================================================================================
def evaluated(request):
    if request.session.has_key('auth_token'):
        try:
            authority = request.session['authority']
            dictionary = get_authority_list(authority,'resource_login')
        except:
            authority = []
            dictionary = get_authority_list(authority,'admin_login')
        status = checkKey(dictionary,'evaluated')
        if(status == 'True' or len(authority) == 0):
            username = request.session['auth_username']
            tokenKey = request.session['auth_token']
            response = headerNotification(request)
            length = response[0]
            requestHeadingData = response[1]
            admin_data = response[2]
            return render(request,'Admin/result-management/evaluated.html',{'admin_data':admin_data,'dataLength':length,'data':requestHeadingData['data'],'username':username,'tokenKey':tokenKey,'authority':dictionary})
        else:
            return render(request,'403.html')  
    else:
        return redirect('login')


# ========================================================================================================================================
# ========================================================================================================================================
def evaluators(request):
    if request.session.has_key('auth_token'):
        try:
            authority = request.session['authority']
            dictionary = get_authority_list(authority,'resource_login')
        except:
            authority = []
            dictionary = get_authority_list(authority,'admin_login')
        status = checkKey(dictionary,'evaluators')
        if(status == 'True' or len(authority) == 0):
            username = request.session['auth_username']
            tokenKey = request.session['auth_token']
            response = headerNotification(request)
            length = response[0]
            requestHeadingData = response[1]
            admin_data = response[2]
            return render(request,'Admin/result-management/evaluators.html',{'admin_data':admin_data,'dataLength':length,'data':requestHeadingData['data'],'username':username,'tokenKey':tokenKey,'authority':dictionary})
        else:
            return render(request,'403.html')  
    else:
        return redirect('login')


# ========================================================================================================================================
# ========================================================================================================================================
def report_card_published(request):
    if request.session.has_key('auth_token'):
        try:
            authority = request.session['authority']
            dictionary = get_authority_list(authority,'resource_login')
        except:
            authority = []
            dictionary = get_authority_list(authority,'admin_login')
        status = checkKey(dictionary,'report_card_published')
        if(status == 'True' or len(authority) == 0):
            username = request.session['auth_username']
            tokenKey = request.session['auth_token']
            response = headerNotification(request)
            length = response[0]
            requestHeadingData = response[1]
            admin_data = response[2]
            return render(request,'Admin/result-management/report-card-published.html',{'admin_data':admin_data,'dataLength':length,'data':requestHeadingData['data'],'username':username,'tokenKey':tokenKey,'authority':dictionary})
        else:
            return render(request,'403.html')  
    else:
        return redirect('login')


# ========================================================================================================================================
# ========================================================================================================================================
def report_card(request):
    if request.session.has_key('auth_token'):
        try:
            authority = request.session['authority']
            dictionary = get_authority_list(authority,'resource_login')
        except:
            authority = []
            dictionary = get_authority_list(authority,'admin_login')
        status = checkKey(dictionary,'report_card')
        if(status == 'True' or len(authority) == 0):
            username = request.session['auth_username']
            tokenKey = request.session['auth_token']
            apiCourseList = getMethod(
                    request=request,
                    method='GET',
                    task = 'GETCOURSELIST',
                    pathInfo=getCourseList_URL.strip(),
                    )
            course_data = json.loads(apiCourseList.text)
            print('course data >>> ',course_data)
            apiCourseTypeList = getMethod(
                    request=request,
                    method='GET',
                    task = 'GETCOURSETYPELIST',
                    pathInfo=getCourseTypeList_URL.strip(),
                    )
            CourseTypeData = json.loads(apiCourseTypeList.text)
            print('CourseTypeData >> ',CourseTypeData)
            response = headerNotification(request)
            length = response[0]
            requestHeadingData = response[1]
            admin_data = response[2]
            return render(request,'Admin/result-management/report-card.html',{'CourseTypeData':CourseTypeData,'course_data':course_data,'admin_data':admin_data,'dataLength':length,'data':requestHeadingData['data'],'username':username,'tokenKey':tokenKey,'authority':dictionary})
        else:
            return render(request,'403.html')  
    else:
        return redirect('login')


def reportCardFilter(request):
    if request.method == 'GET':
        reportCardYear = request.GET['reportCardYear']
        reportCardSemester = request.GET['reportCardSemester']
        reportCardCourseType = request.GET['reportCardCourseType']
        reportCardCourse = request.GET['reportCardCourse']
        reportCardStatus = request.GET['reportCardStatus']

        print('reportCardYear value : ',reportCardYear)
        print('reportCardSemester value : ',reportCardSemester)
        print('reportCardCourseType value : ',reportCardCourseType)
        print('reportCardCourse value : ',reportCardCourse)
        print('reportCardStatus value : ',reportCardStatus)

        return JsonResponse({'searchResultList' : []})

# ========================================================================================================================================
# ========================================================================================================================================
def student_report_card(request):
    if request.session.has_key('auth_token'):
        try:
            authority = request.session['authority']
            dictionary = get_authority_list(authority,'resource_login')
        except:
            authority = []
            dictionary = get_authority_list(authority,'admin_login')
        status = checkKey(dictionary,'student_report_card')
        if(status == 'True' or len(authority) == 0):
            username = request.session['auth_username']
            tokenKey = request.session['auth_token']
            response = headerNotification(request)
            length = response[0]
            requestHeadingData = response[1]
            admin_data = response[2]
            return render(request,'Admin/result-management/student-report-card.html',{'admin_data':admin_data,'dataLength':length,'data':requestHeadingData['data'],'username':username,'tokenKey':tokenKey,'authority':dictionary})
        else:
            return render(request,'403.html')  
    else:
        return redirect('login')


# ========================================================================================================================================
# ========================================================================================================================================
def under_evaluation(request):
    if request.session.has_key('auth_token'):
        try:
            authority = request.session['authority']
            dictionary = get_authority_list(authority,'resource_login')
        except:
            authority = []
            dictionary = get_authority_list(authority,'admin_login')
        status = checkKey(dictionary,'under_evaluation')
        if(status == 'True' or len(authority) == 0):
            username = request.session['auth_username']
            tokenKey = request.session['auth_token']
            response = headerNotification(request)
            length = response[0]
            requestHeadingData = response[1]
            admin_data = response[2]
            return render(request,'Admin/result-management/under-evaluation.html',{'admin_data':admin_data,'dataLength':length,'data':requestHeadingData['data'],'username':username,'tokenKey':tokenKey,'authority':dictionary})
        else:
            return render(request,'403.html')  
    else:
        return redirect('login')


# ========================================================================================================================================
# ========================================================================================================================================
def getFilteredResources(request,id):
    if request.session.has_key('auth_token'):
        username = request.session['auth_username']
        tokenKey = request.session['auth_token']
        # =======================================================================================
        apiSelectedResourceList = getMethod(
                request=request,
                method='GET',
                task = 'GETSELECTEDRESOURCES',
                pathInfo=getSelectedResourceList_URL+str(id)+'/'.strip(),
                )
        SelectedResourceList = json.loads(apiSelectedResourceList.text)
        print('SelectedResourceList data >> ',SelectedResourceList)
        # =======================================================================================
        return JsonResponse({'result':SelectedResourceList})
    else:
        return redirect('login')



def allocateEvaluaters(request):
    if request.session.has_key('auth_token'):
        username = request.session['auth_username']
        tokenKey = request.session['auth_token']
        if request.method == 'POST':

            start_date = request.POST['start_date']
            end_date = request.POST['end_date']
            paperID = request.POST['paperID']
            assign_evaluator = request.POST.getlist('assigned_evaluator_Array[]')


            print('assign_evaluator >> ',assign_evaluator)
            resourseIdList = []
            for i in assign_evaluator:
                resourseIdList.append(int(i))

            print('resourseIdList >> ',resourseIdList)
            # =======================================================================================
            DataDict = {}
            DataDict['start_date'] = start_date
            DataDict['end_date'] = end_date
            DataDict['paperID'] = int(paperID)
            DataDict['assign_evaluator'] = resourseIdList

            print(DataDict)

            apiAssignEvaluatorsDetails = postMethod(
                                request = request,
                                method='PUT',
                                task = 'ASSIGNEVALUATORS',
                                pathInfo=update_addEvaluators_URL+str(paperID)+'/'.strip(),
                                dataList = DataDict
                                )
            AssignEvaluatorsData = json.loads(apiAssignEvaluatorsDetails.text)
            print('AssignEvaluatorsData data >> ',AssignEvaluatorsData)
            # =======================================================================================
            return JsonResponse({'result':AssignEvaluatorsData})
    else:
        return redirect('login')


# ===================================================================================================================================================================
#                                    PAGINATION FOR PAPER LIST TO aSSIGN EVALUATORS (with page number)
# ===================================================================================================================================================================
def completedPapersPaginate(request):
    if request.session.has_key('auth_token'):
        username = request.session['auth_username']
        studentSearchString = request.GET['search_String']
        page = request.GET['page']

        print('string : ',studentSearchString,'pgno : ',page)
        apicompletedPapersPaginate = getMethod(
                request=request,
                method='GET',
                task = 'COMPLETEDEXAMS',
                pathInfo=getCompletedExamList_URL+'?page='+str(page).strip(),
                )
        data = json.loads(apicompletedPapersPaginate.text)
        print('paginated data == >>> ',data)

        return JsonResponse({'searchResultList': data})
    else:
        return redirect('login')

# ===================================================================================================================================================================
def completedPapersSearch(request):
    if request.session.has_key('auth_token'):
        username = request.session['auth_username']

        courseID = request.GET['courseID']
        SubjectID = request.GET['SubjectID']
        year = request.GET['year']
        page = request.GET['page']

        print('courseID : ',courseID,'pgno : ',page)
        apicompletedPapersPaginate = getMethod(
                request=request,
                method='GET',
                task = 'COMPLETEDEXAMS',
                pathInfo=getCompletedExamList_URL+'?page='+str(page).strip(),
                )
        data = json.loads(apicompletedPapersPaginate.text)
        print('paginated data == >>> ',data)

        return JsonResponse({'searchResultList': data})
    else:
        return redirect('login')

# ===================================================================================================================================================================
def SearchPapers(request):
    if request.session.has_key('auth_token'):
        username = request.session['auth_username']

        courseID = request.GET['courseID']
        SubjectID = request.GET['SubjectID']
        year = request.GET['year']

        print('courseID : ',courseID,'SubjectID : ',SubjectID,'year : ',year)
        apicompletedPapersPaginate = getMethod(
                request=request,
                method='GET',
                task = 'COMPLETEDEXAMS',
                pathInfo=assignEvaluatorSearch_URL+"?course="+str(courseID)+"&subject="+str(SubjectID)+"&year="+str(year).strip(),
                )
        data = json.loads(apicompletedPapersPaginate.text)
        print('searched data == >>> ',data)
        return JsonResponse({'searchResultList': data})
    else:
        return redirect('login')






def completedExams(request):
    if request.method == 'GET':
        try:
            authority = request.session['authority']
            dictionary = get_authority_list(authority,'resource_login')
        except:
            authority = []
            dictionary = get_authority_list(authority,'admin_login')
        status = checkKey(dictionary,'edit_exam')

        username = request.session['auth_username']
        tokenKey = request.session['auth_token']
        # =======================================================================================
        apiCourseTypeList = getMethod(
                    request=request,
                    method='GET',
                    task = 'GETCOURSETYPELIST',
                    pathInfo=getCourseTypeList_URL.strip(),
                    )
        CourseData = json.loads(apiCourseTypeList.text)
        print('CourseData >> ',CourseData)
        return render(request,'Admin/result-management/completedExams.html',{'authority':dictionary,'courseList':CourseData,})



def completedExamsForEvaluator(request):
    if request.method == 'GET':
        try:
            authority = request.session['authority']
            dictionary = get_authority_list(authority,'resource_login')
        except:
            authority = []
            dictionary = get_authority_list(authority,'admin_login')
        status = checkKey(dictionary,'edit_exam')

        username = request.session['auth_username']
        tokenKey = request.session['auth_token']
        # =======================================================================================
        apiCourseTypeList = getMethod(
                    request=request,
                    method='GET',
                    task = 'GETCOURSETYPELIST',
                    pathInfo=getCourseTypeList_URL.strip(),
                    )
        CourseData = json.loads(apiCourseTypeList.text)
        print('CourseData >> ',CourseData)

        apiCompleteedPapersList = getMethod(
                request=request,
                method='GET',
                task = 'GETCOURSELIST',
                pathInfo=getCompletedExamsEvaluators_URL.strip(),
                )
        completedExams = json.loads(apiCompleteedPapersList.text)
        return render(request,'Admin/result-management/completed-exams-for-evaluators.html',{'authority':dictionary,'courseList':CourseData,'completedExams':completedExams})




# ============================================================================================================================
# ==========================================     REPORT CARD PDF     =========================================================
# ============================================================================================================================

from io import BytesIO
from django.template.loader import get_template
import xhtml2pdf.pisa as pisa

class Render:
    @staticmethod
    def render(path: str, params: dict):
        template = get_template(path)
        html = template.render(params)
        response = BytesIO()
        pdf = pisa.pisaDocument(BytesIO(html.encode("UTF-8")), response)
        if not pdf.err:
            return HttpResponse(response.getvalue(), content_type='application/pdf')
        else:
            return HttpResponse("Error Rendering PDF", status=400)


from django.views.generic import View
from django.utils import timezone
from datetime import date

class GeneratePdf(View):
    def get(self, request):
        today = date.today()
        params = {
            'institute_name' : 'Slateo Institute Of Technology, Lucknow (U.P)',
            'today_date': today,
            'request': request,
            'SNO':"RC2021/BSC/102",
            'student_name' : 'Manohar Deshmukh',
            'student_registration_number':'15BSC101428',
            'course' : 'BSC',
            'session' : '2021-22',
            'percentage' : '62.09%',
            'rank' : '23',
            'passing_status' : 'Passed',
            'SubjectArray' : [{'subject_name':'Mathemeatics','total_marks':100,'passing_marks':65,'marks_obtained':89,'obtained_grade':'A'},
                                {'subject_name':'Science','total_marks':100,'passing_marks':55,'marks_obtained':69,'obtained_grade':'C'},
                                {'subject_name':'Hindi','total_marks':100,'passing_marks':65,'marks_obtained':79,'obtained_grade':'A'},
                                {'subject_name':'English','total_marks':100,'passing_marks':65,'marks_obtained':92,'obtained_grade':'A+'},
                                {'subject_name':'Physical Training','total_marks':100,'passing_marks':65,'marks_obtained':59,'obtained_grade':'B+'}
                            ]
        }
        return Render.render('invoice.html', params)


# ================================================================================================================
# ================================================================================================================
def courseWise_exam(request):
    if request.method == 'GET':
        try:
            authority = request.session['authority']
            dictionary = get_authority_list(authority,'resource_login')
        except:
            authority = []
            dictionary = get_authority_list(authority,'admin_login')
        status = checkKey(dictionary,'edit_exam')

        username = request.session['auth_username']
        tokenKey = request.session['auth_token']
        # =======================================================================================
        apiCourseTypeList = getMethod(
                    request=request,
                    method='GET',
                    task = 'GETCOURSETYPELIST',
                    pathInfo=getCourseTypeList_URL.strip(),
                    )
        CourseData = json.loads(apiCourseTypeList.text)
        print('CourseData >> ',CourseData)

        apiCompleteedPapersList = getMethod(
                request=request,
                method='GET',
                task = 'GETCOURSELIST',
                pathInfo=getCompletedExamsEvaluators_URL.strip(),
                )
        completedExams = json.loads(apiCompleteedPapersList.text)
        return render(request,'Admin/result-management/course-wise-exam.html',{'authority':dictionary,'courseList':CourseData,'completedExams':completedExams})


def exam_wise_papers(request,id):
    if request.session.has_key('auth_token'):
        try:
            authority = request.session['authority']
            dictionary = get_authority_list(authority,'resource_login')
        except:
            authority = []
            dictionary = get_authority_list(authority,'admin_login')
        status = checkKey(dictionary,'assign_evaluator')
        if(status == 'True' or len(authority) == 0):
            username = request.session['auth_username']
            tokenKey = request.session['auth_token']
            # =======================================================================================
            # =======================================================================================
            apiCourseList = getMethod(
                    request=request,
                    method='GET',
                    task = 'GETCOURSELIST',
                    pathInfo=getCourseList_URL.strip(),
                    )
            CourseData = json.loads(apiCourseList.text)
            # print('course data >> ',CourseData)
            # =======================================================================================
            # =======================================================================================
            apiCompletedExamList = getMethod(
                    request=request,
                    method='GET',
                    task = 'COMPLETEDEXAMS',
                    pathInfo=getCompletedExamList_URL+str(id)+'/'.strip(),
                    )
            CompletedExamData = json.loads(apiCompletedExamList.text)

            print('comleted exam data >> ',CompletedExamData)
            # exit()
            resourceIdArray = []
            for i in CompletedExamData:
                year = i['created_at'].split('-')
                i['paper_year'] = year[0]
                i['evaluatorCount'] = len(i['assign_evaluator'])
                idList = []
                for j in range(len(i['assign_evaluator'])):
                    idList.append(int(i['assign_evaluator'][j]['id']))
                resourceIdArray.append(idList)
                i['evaluatorIdList'] = idList

            print('resourceIdArray data >> ',resourceIdArray)
            # =======================================================================================
            # =======================================================================================
            response = headerNotification(request)
            length = response[0]
            requestHeadingData = response[1]
            admin_data = response[2]
            return render(request,'Admin/result-management/exam-wise-papers.html',{'admin_data':admin_data,'dataLength':length,'data':requestHeadingData['data'],'username':username,'tokenKey':tokenKey,'authority':dictionary,'courseList':CourseData,'CompletedExamData':CompletedExamData})
        else:
            return render(request,'403.html')  
    else:
        return redirect('login')