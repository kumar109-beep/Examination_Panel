from django.shortcuts import render,redirect
from django.http import JsonResponse, HttpResponse, HttpResponseRedirect
from .Helper.postMethod import *
from .Helper.getMethod import *
from .Helper.globalURL import *
from .Helper.getAuthorityList import *
import json,datetime
from Slate_O.validateKey import checkKey
from .headerNotification import headerNotification




def grade_list(request):
    if request.session.has_key('auth_token'):
        try:
            authority = request.session['authority']
            dictionary = get_authority_list(authority,'resource_login')
        except:
            authority = []
            dictionary = get_authority_list(authority,'admin_login')
        status = checkKey(dictionary,'create_exam')
        username = request.session['auth_username']
        tokenKey = request.session['auth_token']
        response = headerNotification(request)
        length = response[0]
        requestHeadingData = response[1]
        admin_data = response[2]
        return render(request,'Admin/grade-management/grade-list.html',{'admin_data':admin_data,'dataLength':length,'data':requestHeadingData['data'],'username':username,'tokenKey':tokenKey,'authority':dictionary})
    else:
        return redirect('login')


def edit_grade(request):
    if request.session.has_key('auth_token'):
        try:
            authority = request.session['authority']
            dictionary = get_authority_list(authority,'resource_login')
        except:
            authority = []
            dictionary = get_authority_list(authority,'admin_login')
        status = checkKey(dictionary,'create_exam')
        username = request.session['auth_username']
        tokenKey = request.session['auth_token']
        response = headerNotification(request)
        length = response[0]
        requestHeadingData = response[1]
        admin_data = response[2]
        return render(request,'Admin/grade-management/edit-grade.html',{'admin_data':admin_data,'dataLength':length,'data':requestHeadingData['data'],'username':username,'tokenKey':tokenKey,'authority':dictionary})
    else:
        return redirect('login')



def create_individualGrade(request):
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
                apiCourseList = getMethod(
                        request=request,
                        method='GET',
                        task = 'GETCOURSELIST',
                        pathInfo=getCourseList_URL.strip(),
                        )
                data = json.loads(apiCourseList.text)
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

                apiCourseTypeList = getMethod(
                    request=request,
                    method='GET',
                    task = 'GETCOURSETYPELIST',
                    pathInfo=getCourseTypeList_URL.strip(),
                    )
                courseTypeList = json.loads(apiCourseTypeList.text)

                return render(request,'Admin/grade-management/create-grade.html',{'admin_data':admin_data,'dataLength':length,'data':requestHeadingData['data'],'username':username,'tokenKey':tokenKey,'data1':data,'paperList':paperList,'authority':dictionary,'courseTypeList':courseTypeList})
        else:
            return render(request,'403.html') 
    else:
        return redirect('login')
# =========================================================================================================================================================================

def chainedGradeCourses(request):
    if request.session.has_key('auth_token'):
        ctypeID = int(request.GET['courseTypeId'])
        print('ctypeData >> ',ctypeID,type(ctypeID))
        apiCourseList = getMethod(
                request=request,
                method='GET',
                task = 'GETCOURSELIST',
                pathInfo=getCourseList_URL.strip(),
                )
        data = json.loads(apiCourseList.text)

        print('data >> ',data)
        # exit()
        courseList = []
        for i in data:
            if(i['courseType'] == int(ctypeID)):
                courseList.append(i)
        return JsonResponse({'courseList':courseList})
    else:
        return redirect('login')