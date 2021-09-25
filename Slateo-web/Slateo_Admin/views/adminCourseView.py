from django.shortcuts import render,redirect
from django.http import JsonResponse, HttpResponse, HttpResponseRedirect
from .Helper.postMethod import *
from .Helper.getMethod import *
from .Helper.globalURL import *
import json,datetime
import pandas as pd
import csv
from django.urls import reverse
from .Helper.getAuthorityList import *
from Slate_O.validateKey import checkKey
from .headerNotification import headerNotification

# ==========================================================================================================================================
# ==========================================================================================================================================
def add_course(request):
    if request.session.has_key('auth_token'):
        try:
            authority = request.session['authority']
            dictionary = get_authority_list(authority,'resource_login')
        except:
            authority = []
            dictionary = get_authority_list(authority,'admin_login')
        status = checkKey(dictionary,'add_courses')
        if(status == 'True' or len(authority) == 0):
            username = request.session['auth_username']
            if request.method == 'GET':
                apiCourseTypeList = getMethod(
                    request=request,
                    method='GET',
                    task = 'GETCOURSETYPELIST',
                    pathInfo=getCourseTypeList_URL.strip(),
                    )
                data = json.loads(apiCourseTypeList.text)
                print('this is authority : >> ',authority,type(authority))
                response = headerNotification(request)
                length = response[0]
                requestHeadingData = response[1]
                admin_data = response[2]
                return render(request,'Admin/course-management/add-courses.html',{'admin_data':admin_data,'dataLength':length,'data':requestHeadingData['data'],'username':username,'data1':data,'authority':dictionary})
            elif request.method == 'POST':
                courseId = request.POST['courseID']
                courseType = request.POST['courseType']
                courseName = request.POST['courseName']

                data = {}
                data['courseID'] = courseId.strip()
                data['courseType'] = courseType.strip()
                data['courseName'] = courseName.strip()

                apiCreateCourse = postMethod(
                    request=request,
                    method='POST',
                    task = 'CREATECOURSE',
                    pathInfo=addCourse_URL.strip(),
                    dataList = data
                    )
                res = apiCreateCourse
                apiCourseTypeList = getMethod(
                    request=request,
                    method='GET',
                    task = 'GETCOURSETYPELIST',
                    pathInfo=getCourseTypeList_URL.strip(),
                    )
                data1 = json.loads(apiCourseTypeList.text)
                response_code = res.status_code
                if(response_code == 201):
                    success_data = "Course Added Successfully"
                    response = headerNotification(request)
                    length = response[0]
                    requestHeadingData = response[1]
                    admin_data = response[2]
                    return render(request,'Admin/course-management/add-courses.html',{'admin_data':admin_data,'dataLength':length,'data':requestHeadingData['data'],'username':username,'authority':dictionary,'data1':data1,'success_data':success_data})
                else:
                    errorDict = json.loads(res.text) 
                    errDict = {}
                    if(len(errorDict)!=0):
                        for i,j in errorDict.items():
                            x = j[0]
                            errDict[i] = x
                    response = headerNotification(request)
                    length = response[0]
                    requestHeadingData = response[1]
                    admin_data = response[2]
                    return render(request,'Admin/course-management/add-courses.html',{'admin_data':admin_data,'dataLength':length,'data':requestHeadingData['data'],'username':username,'data':data,'errDict':errDict,'data1':data1,'authority':dictionary})     
        else:
            return render(request,'403.html')       
    else:
        return redirect('login')


# ==========================================================================================================================================
# ==========================================================================================================================================
def add_course_type(request):
    if request.session.has_key('auth_token'):
        try:
            authority = request.session['authority']
            dictionary = get_authority_list(authority,'resource_login')
        except:
            authority = []
            dictionary = get_authority_list(authority,'admin_login')
        status = checkKey(dictionary,'add_course_type')
        if(status == 'True' or len(authority) == 0):
            username = request.session['auth_username']
            if request.method == 'GET':
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
                return render(request,'Admin/course-management/add-course-type.html',{'admin_data':admin_data,'admin_data':admin_data,'dataLength':length,'data':requestHeadingData['data'],'username':username,'authority':dictionary})
            elif request.method == 'POST':
                courseTypeId = request.POST['courseTypeID']
                courseTypeName = request.POST['courseTypeName']

                data = {}
                data['courseTypeId'] = courseTypeId.strip()
                data['courseTypeName'] = courseTypeName.strip()

                apiCreateCourseType = postMethod(
                    request=request,
                    method='POST',
                    task = 'CREATECOURSETYPE',
                    pathInfo=addCourseType_URL.strip(),
                    dataList = data
                    )
                res = apiCreateCourseType
                response_code = res.status_code
                response =''
                if(response_code == 201):
                    success_data = "Course Type Added Successfully"
                    response = headerNotification(request)
                    length = response[0]
                    requestHeadingData = response[1]
                    admin_data = response[2]
                    return render(request,'Admin/course-management/add-course-type.html',{'admin_data':admin_data,'admin_data':admin_data,'dataLength':length,'data':requestHeadingData['data'],'username':username,'authority':dictionary,'success_data':success_data})
                else:
                    errorDict = json.loads(res.text) 
                
                    errDict = {}
                    if(len(errorDict) != 0 ):
                        for i,j in errorDict.items():
                            x = j[0]
                            errDict[i] = x
                    response = headerNotification(request)
                    length = response[0]
                    requestHeadingData = response[1]
                    admin_data = response[2]
                    return render(request,'Admin/course-management/add-course-type.html',{'admin_data':admin_data,'admin_data':admin_data,'dataLength':length,'data':requestHeadingData['data'],'username':username,'errDict':errDict,'data':data,'authority':dictionary})   
        else:
            return render(request,'403.html')  
    else:
        return redirect('login')


# ==========================================================================================================================================
# ==========================================================================================================================================
def add_subjects_to_course(request):
    if request.session.has_key('auth_token'):
        try:
            authority = request.session['authority']
            dictionary = get_authority_list(authority,'resource_login')
        except:
            authority = []
            dictionary = get_authority_list(authority,'admin_login')
        status = checkKey(dictionary,'add_subjects_to_course')
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
                apiSubjectList = getMethod(
                    request=request,
                    method='GET',
                    task = 'GETSUBJECTLIST',
                    pathInfo=getSubjectList_URL.strip(),
                    )
                subjectList = json.loads(apiSubjectList.text)
                apiCourseTypeList = getMethod(
                    request=request,
                    method='GET',
                    task = 'GETCOURSETYPELIST',
                    pathInfo=getCourseTypeList_URL.strip(),
                    )
                courseType = json.loads(apiCourseTypeList.text)
                response = headerNotification(request)
                length = response[0]
                requestHeadingData = response[1]
                admin_data = response[2]
                return render(request,'Admin/course-management/add-subjects-to-course.html',{'admin_data':admin_data,'admin_data':admin_data,'dataLength':length,'data':requestHeadingData['data'],'username':username,'data1':data,'subjectList':subjectList,'courseType':courseType,'tokenKey':tokenKey,'authority':dictionary})  
        else:
            return render(request,'403.html')      
    else:
        return redirect('login')


# ==========================================================================================================================================
# ==========================================================================================================================================
def edit_subjects_to_course(request,id):
    if request.session.has_key('auth_token'):
        try:
            authority = request.session['authority']
            dictionary = get_authority_list(authority,'resource_login')
        except:
            authority = []
            dictionary = get_authority_list(authority,'admin_login')
        status = checkKey(dictionary,'edit_subjects_to_course')
        if(status == 'True' or len(authority) == 0):
            username = request.session['auth_username']
            if request.method == 'GET':
                tokenKey = request.session['auth_token']
                apiSpecificSubjecttoCourse = getMethod(
                    request=request,
                    method='GET',
                    task = 'GETSPECIFICSUBJECTTOCOURSE',
                    pathInfo=getSpecificSubjectToCourse_URL+str(id)+'/'.strip(),
                    )
                data = json.loads(apiSpecificSubjecttoCourse.text)
                apiSubjectList = getMethod(
                    request=request,
                    method='GET',
                    task = 'GETSUBJECTLIST',
                    pathInfo=getSubjectList_URL.strip(),
                    )
                subjectList = json.loads(apiSubjectList.text)
                
                for j in subjectList:
                    for i in data['subjectNameFK']:
                        if i['subjectID'] == j['subjectID']:
                            j['status'] = 'True'
                response = headerNotification(request)
                length = response[0]
                requestHeadingData = response[1]
                admin_data = response[2]
                return render(request,'Admin/course-management/edit-subject-to-course.html',{'admin_data':admin_data,'admin_data':admin_data,'dataLength':length,'data':requestHeadingData['data'],'username':username,'data1':data,'subjectList':subjectList,'tokenKey':tokenKey,'authority':dictionary})      
        else:
            return render(request,'403.html')  
    else:
        return redirect('login')


# ==========================================================================================================================================
# ==========================================================================================================================================
def add_subjects(request):
    if request.session.has_key('auth_token'):
        try:
            authority = request.session['authority']
            dictionary = get_authority_list(authority,'resource_login')
        except:
            authority = []
            dictionary = get_authority_list(authority,'admin_login')
        status = checkKey(dictionary,'add_subjects')
        if(status == 'True' or len(authority) == 0):
            username = request.session['auth_username']
            if request.method == 'GET':
                response = headerNotification(request)
                length = response[0]
                requestHeadingData = response[1]
                admin_data = response[2]
                return render(request,'Admin/course-management/add-subjects.html',{'admin_data':admin_data,'admin_data':admin_data,'dataLength':length,'data':requestHeadingData['data'],'username':username,'authority':dictionary})
            elif request.method == 'POST':
                subjectId = request.POST['subjectID']
                subjectName = request.POST['subjectName']

                data = {}
                data['subjectID'] = subjectId.strip()
                data['subjectName'] = subjectName.strip()

                apiCreateSubject = postMethod(
                    request=request,
                    method='POST',
                    task = 'CREATESUBJECT',
                    pathInfo=addSubject_URL.strip(),
                    dataList = data
                    )
                res = apiCreateSubject
                response_code = res.status_code
                if(response_code == 201):
                    success_data = "Subject Added Successfully"
                    response = headerNotification(request)
                    length = response[0]
                    requestHeadingData = response[1]
                    admin_data = response[2]
                    return render(request,'Admin/course-management/add-subjects.html',{'admin_data':admin_data,'admin_data':admin_data,'dataLength':length,'data':requestHeadingData['data'],'username':username,'res':res.text,'authority':dictionary,'success_data':success_data})
                else:
                    errorDict = json.loads(res.text) 
                
                    errDict = {}
                    if(len(errorDict)!=0):
                        for i,j in errorDict.items():
                            x = j[0]
                            errDict[i] = x
                    response = headerNotification(request)
                    length = response[0]
                    requestHeadingData = response[1]
                    admin_data = response[2]
                    return render(request,'Admin/course-management/add-subjects.html',{'admin_data':admin_data,'admin_data':admin_data,'dataLength':length,'data':requestHeadingData['data'],'username':username,'res':res.text,'data':data,'errDict':errDict,'authority':dictionary})      
        else:
            return render(request,'403.html')       
    else:
        return redirect('login')


# ==========================================================================================================================================
# ==========================================================================================================================================
def course_list(request):
    if request.session.has_key('auth_token'):
        try:
            authority = request.session['authority']
            dictionary = get_authority_list(authority,'resource_login')
        except:
            authority = []
            dictionary = get_authority_list(authority,'admin_login')
        status = checkKey(dictionary,'course_list')
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
                for i in data:
                    apiSpeificCourseType = getMethod(
                    request=request,
                    method='GET',
                    task = 'GETSPECIFICCOURSETYPE',
                    pathInfo=getSpecificCourseType_URL+str(i['courseType'])+'/'.strip(),
                    )
                    dataCtype = json.loads(apiSpeificCourseType.text)
                    i['courseTypename'] = dataCtype['courseTypeName']
                response = headerNotification(request)
                length = response[0]
                requestHeadingData = response[1]
                admin_data = response[2]
                return render(request,'Admin/course-management/course-list.html',{'admin_data':admin_data,'dataLength':length,'data':requestHeadingData['data'],'username':username,'data1':data,'authority':dictionary})  
        else:
            return render(request,'403.html')      
    else:
        return redirect('login')


# ==========================================================================================================================================
# ==========================================================================================================================================
def preview_data(request):
    try:
        authority = request.session['authority']
        dictionary = get_authority_list(authority,'resource_login')
    except:
        authority = []
        dictionary = get_authority_list(authority,'admin_login')
    status = checkKey(dictionary,'course_list')
    if(status == 'True' or len(authority) == 0):
        response = headerNotification(request)
        length = response[0]
        requestHeadingData = response[1]
        admin_data = response[2]
        return render(request,'Admin/course-management/preview-data.html',{'admin_data':admin_data,'dataLength':length,'data':requestHeadingData['data'],'username':username,'authority':dictionary})
    else:
        return render(request,'403.html')  


# ==========================================================================================================================================
# ==========================================================================================================================================
def select_batch_student(request):
    try:
        authority = request.session['authority']
        dictionary = get_authority_list(authority,'resource_login')
    except:
        authority = []
        dictionary = get_authority_list(authority,'admin_login')
    data = json.loads(apiCourseSubjectList.text)
    response = headerNotification(request)
    length = response[0]
    requestHeadingData = response[1]
    admin_data = response[2]
    return render(request,'Admin/course-management/select-batch-student.html',{'admin_data':admin_data,'dataLength':length,'data':requestHeadingData['data'],'username':username,'authority':dictionary})


# ==========================================================================================================================================
# ==========================================================================================================================================
def subject_list(request):
    if request.session.has_key('auth_token'):
        try:
            authority = request.session['authority']
            dictionary = get_authority_list(authority,'resource_login')
        except:
            authority = []
            dictionary = get_authority_list(authority,'admin_login')
        status = checkKey(dictionary,'subject_list')
        if(status == 'True' or len(authority) == 0):
            username = request.session['auth_username']
            if request.method == 'GET':
                apiCourseSubjectList = getMethod(
                    request=request,
                    method='GET',
                    task = 'GETCOURSESUBJECTLIST',
                    pathInfo=getCourseSubjectList_URL.strip(),
                    )
                data = json.loads(apiCourseSubjectList.text)
                response = headerNotification(request)
                length = response[0]
                requestHeadingData = response[1]
                admin_data = response[2]
                return render(request,'Admin/course-management/subject-list.html',{'admin_data':admin_data,'dataLength':length,'data':requestHeadingData['data'],'username':username,'data':data,'authority':dictionary})   
        else:
            return render(request,'403.html')    
    else:
        return redirect('login')
# ==========================================================================================================================================
# ==========================================================================================================================================
def topic_list(request):
    if request.session.has_key('auth_token'):
        try:
            authority = request.session['authority']
            dictionary = get_authority_list(authority,'resource_login')
        except:
            authority = []
            dictionary = get_authority_list(authority,'admin_login')
        status = checkKey(dictionary,'topic_list')
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
                return render(request,'Admin/course-management/topic-list.html',{'admin_data':admin_data,'dataLength':length,'data':requestHeadingData['data'],'username':username,'data':data,'authority':dictionary})
        else:
            return render(request,'403.html')  
    else:
        return redirect('login')



# ==========================================================================================================================================
# ==========================================================================================================================================
def add_topic(request):
    if request.session.has_key('auth_token'):
        try:
            authority = request.session['authority']
            dictionary = get_authority_list(authority,'resource_login')
        except:
            authority = []
            dictionary = get_authority_list(authority,'admin_login')
        status = checkKey(dictionary,'add_topic')
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
                response = headerNotification(request)
                length = response[0]
                requestHeadingData = response[1]
                admin_data = response[2]
                return render(request,'Admin/course-management/add-topic.html',{'admin_data':admin_data,'dataLength':length,'data':requestHeadingData['data'],'username':username,'data':data,'tokenKey':tokenKey,'authority':dictionary})      
            if request.method == 'POST':
                courseID = request.POST['sheetCoursenameId']
                subjectID = request.POST['sheetSubjectNameID']
                file = request.FILES['browse_csv_file']
                splitedData = str(file).split('.')
                if(splitedData[-1] == 'xls'):
                    data = pd.read_excel(file)
                    dataDict = {}
                    topicName = data.Topic_Name.tolist()

                    TopicStr = ''
                    for i in topicName:
                        TopicStr += i+','
                    # "topicsList": array2.toString(), "select_courseFK": parseInt(courseId), "selectsubjectFK": parseInt(subjectId)
                    data = {}
                    data['courseID'] = int(courseID.strip())
                    data['subjectID'] = int(subjectID.strip())
                    data['topicsList'] = TopicStr[:len(TopicStr)-1].strip()

                    apiTopic = postMethod(
                        request=request,
                        method='POST',
                        task = 'CREATETOPICS',
                        pathInfo=addtopic_list_URL.strip(),
                        dataList = data
                        )
                    return redirect('add_topic')
                elif(splitedData[-1] == 'csv'):
                    data = pd.read_csv(file)
                    dataDict = {}
                    topicName = data.Topic_Name.tolist()

                    TopicStr = ''
                    for i in topicName:
                        TopicStr += i+','
                    # "topicsList": array2.toString(), "select_courseFK": parseInt(courseId), "selectsubjectFK": parseInt(subjectId)
                    data = {}
                    data['courseID'] = int(courseID.strip())
                    data['subjectID'] = int(subjectID.strip())
                    data['topicsList'] = TopicStr[:len(TopicStr)-1].strip()

                    apiTopic = postMethod(
                        request=request,
                        method='POST',
                        task = 'CREATETOPICS',
                        pathInfo=addtopic_list_URL.strip(),
                        dataList = data
                        )
                    return redirect('add_topic')
        else:
            return render(request,'403.html')  
    else:
        return redirect('login')


# ==========================================================================================================================================
# ==========================================================================================================================================
def deleteCourse(request,id):
    if request.session.has_key('auth_token'):
        apideleteCourse = getMethod(
            request=request,
                method="DELETE",
                task = 'DELETESPECIFICCOURSE',
                pathInfo=deleteCourse_URL+str(id)+'/'.strip(),
                ) 
        data = apideleteCourse.text
        return redirect(course_list)
    else:
        return redirect('login')
    


# ==========================================================================================================================================
def chainedCourses(request):
    if request.session.has_key('auth_token'):
        ctypeID = request.GET['courseTypeId']
        apiCourseList = getMethod(
                request=request,
                method='GET',
                task = 'GETCOURSELIST',
                pathInfo=getCourseList_URL.strip(),
                )
        data = json.loads(apiCourseList.text)
        courseList = []
        for i in data:
            if(i['courseType'] == int(ctypeID)):
                courseList.append(i)
        return JsonResponse({'courseList':courseList})
    else:
        return redirect('login')



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
        return JsonResponse({'subjectList':dataSubject})
    else:
        return redirect('login')


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
        
        
        if(len(dataTopic)!=0):
            for i in dataTopic:
                topicdata = i['topicsList'].split(',')
        else:
            topicdata = []
            topicdata.append('<b>- No topic available for selected course and subject!</b>')
        return JsonResponse({'topicList':topicdata,'topicId':dataTopic['id']})
    else:
        return redirect('login')


# ==========================================================================================================================================
def course_type_list(request):
    if request.session.has_key('auth_token'):
        try:
            authority = request.session['authority']
            dictionary = get_authority_list(authority,'resource_login')
        except:
            authority = []
            dictionary = get_authority_list(authority,'admin_login')
        status = checkKey(dictionary,'course_type_list')
        if(status == 'True' or len(authority) == 0):
            username = request.session['auth_username']
            if request.method == 'GET':
                tokenKey = request.session['auth_token']
                apiCourseTypeApi = getMethod(
                    request=request,
                    method='GET',
                    task = 'GETCOURSETYPELIST',
                    pathInfo=getCourseTypeList.strip(),
                    )
                data = json.loads(apiCourseTypeApi.text)
                print('course type list data ::: ',data)
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
                return render(request,'Admin/course-management/course-type-list.html',{'admin_data':admin_data,'dataLength':length,'data':requestHeadingData['data'],'username':username,'data1':data,'authority':dictionary})
        else:
            return render(request,'403.html')  
    else:
        return redirect('login')


# ==========================================================================================================================================
def allSubjects_list(request):
    if request.session.has_key('auth_token'):
        try:
            authority = request.session['authority']
            dictionary = get_authority_list(authority,'resource_login')
        except:
            authority = []
            dictionary = get_authority_list(authority,'admin_login')
        status = checkKey(dictionary,'course_type_list')
        if(status == 'True' or len(authority) == 0):
            username = request.session['auth_username']
            if request.method == 'GET':
                tokenKey = request.session['auth_token']
                apiSubjectList = getMethod(
                    request=request,
                    method='GET',
                    task = 'GETSUBJECTLIST',
                    pathInfo=getSubjectList_URL.strip(),
                    )
                subjectList = json.loads(apiSubjectList.text)
                print('subject list data ::: ',subjectList)
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
                return render(request,'Admin/course-management/subjectList.html',{'admin_data':admin_data,'dataLength':length,'data':requestHeadingData['data'],'username':username,'data':subjectList,'authority':dictionary})
        else:
            return render(request,'403.html')  
    else:
        return redirect('login')



# ==========================================================================================================================================
def edit_topic(request):
    if request.session.has_key('auth_token'):
        try:
            authority = request.session['authority']
            dictionary = get_authority_list(authority,'resource_login')
        except:
            authority = []
            dictionary = get_authority_list(authority,'admin_login')
        status = checkKey(dictionary,'edit_topic')
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
                response = headerNotification(request)
                length = response[0]
                requestHeadingData = response[1]
                admin_data = response[2]
                return render(request,'Admin/course-management/edit-topic.html',{'admin_data':admin_data,'dataLength':length,'data':requestHeadingData['data'],'username':username,'data':data,'tokenKey':tokenKey,'authority':dictionary})    
        else:
                return render(request,'403.html')  
    else:
        return redirect('login')  

# ==========================================================================================================================================
# ==========================================================================================================================================
def edit_course_type(request,id):
    if request.session.has_key('auth_token'):
        try:
            authority = request.session['authority']
            dictionary = get_authority_list(authority,'resource_login')
        except:
            authority = []
            dictionary = get_authority_list(authority,'admin_login')
        status = checkKey(dictionary,'edit_course_type')
        if(status == 'True' or len(authority) == 0):
            username = request.session['auth_username']
            if request.method == 'GET':
                tokenKey = request.session['auth_token']
                getapiSpecificCourseType = getMethod(
                    request=request,
                    method='GET',
                    task = 'GETSPECIFICCOURSETYPE',
                    pathInfo=getSpecificCourseType+str(id)+'/'.strip(),
                    )
                data = json.loads(getapiSpecificCourseType.text)
                print(data)
                response = headerNotification(request)
                length = response[0]
                requestHeadingData = response[1]
                admin_data = response[2]
                return render(request,'Admin/course-management/edit-courseType.html',{'admin_data':admin_data,'dataLength':length,'data':requestHeadingData['data'],'username':username,'data':data,'tokenKey':tokenKey,'authority':dictionary})      
            if request.method == 'POST':
                tokenKey = request.session['auth_token']
                courseTypeId = request.POST['courseTypeID']
                courseTypeName = request.POST['courseTypeName']

                data = {}
                data['courseTypeId'] = courseTypeId.strip()
                data['courseTypeName'] = courseTypeName.strip()
                
                updateapiSpecificCourseType = postMethod(
                    request=request,
                    method='PUT',
                    task = 'UPDATECOURSETYPE',
                    pathInfo=getSpecificCourseType+str(id)+'/'.strip(),
                    dataList = data
                    )
                data = json.loads(updateapiSpecificCourseType.text)
                print(data)
                res = updateapiSpecificCourseType
                response_code = res.status_code
                response =''
                if(response_code == 200):
                    success_data = "Course Type Updated Successfully"
                    return render(request,'Admin/course-management/edit-courseType.html',{'username':username,'success_data':success_data,'data':data,'authority':dictionary}) 
                    # return redirect('/edit-course-type/'+str(id))
                else:
                    errorDict = json.loads(res.text) 
                
                    errDict = {}
                    if(len(errorDict) != 0 ):
                        for i,j in errorDict.items():
                            x = j[0]
                            errDict[i] = x
                    response = headerNotification(request)
                    length = response[0]
                    requestHeadingData = response[1]
                    admin_data = response[2]
                    return render(request,'Admin/course-management/edit-courseType.html',{'admin_data':admin_data,'dataLength':length,'data':requestHeadingData['data'],'username':username,'errDict':errDict,'data':data,'authority':dictionary})   
        else:
            return render(request,'403.html')  
    else:
        return redirect('login')


# ==========================================================================================================================================
# ==========================================================================================================================================
def edit_course(request,id):
    if request.session.has_key('auth_token'):
        try:
            authority = request.session['authority']
            dictionary = get_authority_list(authority,'resource_login')
        except:
            authority = []
            dictionary = get_authority_list(authority,'admin_login')
        status = checkKey(dictionary,'edit_course')
        if(status == 'True' or len(authority) == 0):
            username = request.session['auth_username']
            if request.method == 'GET':
                tokenKey = request.session['auth_token']
                getapiSpecificCourse = getMethod(
                    request=request,
                    method='GET',
                    task = 'GETSPECIFICCOURSE',
                    pathInfo=getSpecificCourse+str(id)+'/'.strip(),
                    )
                data = json.loads(getapiSpecificCourse.text)
                print(data)

                getapiSpecificCourseType = getMethod(
                    request=request,
                    method='GET',
                    task = 'GETSPECIFICCOURSETYPE',
                    pathInfo=getSpecificCourseType+str(data['courseType'])+'/'.strip(),
                    )
                ctypeData = json.loads(getapiSpecificCourseType.text)
                print(ctypeData,id)
                data['courseTypeName'] = ctypeData['courseTypeName']
                response = headerNotification(request)
                length = response[0]
                requestHeadingData = response[1]
                admin_data = response[2]
                return render(request,'Admin/course-management/edit-course.html',{'admin_data':admin_data,'dataLength':length,'data':requestHeadingData['data'],'username':username,'data':data,'tokenKey':tokenKey,'authority':dictionary})      
            if request.method == 'POST':
                tokenKey = request.session['auth_token']
                courseId = request.POST['courseID']
                courseType = request.POST['courseTypeId']
                courseName = request.POST['courseName']

                dataDict = {}
                dataDict['courseID'] = courseId.strip()
                dataDict['courseType'] = courseType.strip()
                dataDict['courseName'] = courseName.strip()
                
                updateapiSpecificCourse = postMethod(
                    request=request,
                    method='PUT',
                    task = 'UPDATECOURSE',
                    pathInfo=getSpecificCourse+str(id)+'/'.strip(),
                    dataList = dataDict
                    )
                data = json.loads(updateapiSpecificCourse.text)
                print(data)
                res = updateapiSpecificCourse
                response_code = res.status_code
                print('response code :>> ',response_code)
                print('response text :>> ',res.text)
                # exit()
                getapiSpecificCourseType = getMethod(
                    request=request,
                    method='GET',
                    task = 'GETSPECIFICCOURSETYPE',
                    pathInfo=getSpecificCourseType+str(courseType)+'/'.strip(),
                    )
                ctypeData = json.loads(getapiSpecificCourseType.text)
                print(ctypeData,id)
                dataDict['courseTypeName'] = ctypeData['courseTypeName']
                # exit()

                response =''
                if(response_code == 200):
                    success_data = "Course Updated Successfully"
                    return render(request,'Admin/course-management/edit-course.html',{'username':username,'success_data':success_data,'data':dataDict,'authority':dictionary})   
                # return redirect('/edit-course/'+str(id))
                else:
                    errorDict = json.loads(res.text) 
                
                    errDict = {}
                    if(len(errorDict) != 0 ):
                        for i,j in errorDict.items():
                            x = j[0]
                            errDict[i] = x
                    print('data >> ',dataDict)
                    # exit()
                    return render(request,'Admin/course-management/edit-course.html',{'username':username,'errDict':errDict,'data':dataDict,'authority':dictionary})   
        else:
            return render(request,'403.html')  
    else:
        return redirect('login')

# ==========================================================================================================================================
# ==========================================================================================================================================
def edit_subject(request,id):
    if request.session.has_key('auth_token'):
        try:
            authority = request.session['authority']
            dictionary = get_authority_list(authority,'resource_login')
        except:
            authority = []
            dictionary = get_authority_list(authority,'admin_login')
        status = checkKey(dictionary,'edit_subject')
        if(status == 'True' or len(authority) == 0):
            username = request.session['auth_username']
            if request.method == 'GET':
                tokenKey = request.session['auth_token']
                getapiSpecificCourse = getMethod(
                    request=request,
                    method='GET',
                    task = 'GETSPECIFICSUBJECT',
                    pathInfo=getSpecificSubject_URL+str(id)+'/'.strip(),
                    )
                data = json.loads(getapiSpecificCourse.text)
                print(data)
                response = headerNotification(request)
                length = response[0]
                requestHeadingData = response[1]
                admin_data = response[2]
                return render(request,'Admin/course-management/edit-subject.html',{'admin_data':admin_data,'dataLength':length,'data':requestHeadingData['data'],'username':username,'data':data,'tokenKey':tokenKey,'authority':dictionary})      
            if request.method == 'POST':
                tokenKey = request.session['auth_token']
                subjectId = request.POST['subjectID']
                subjectName = request.POST['subjectName']

                data = {}
                data['subjectID'] = subjectId.strip()
                data['subjectName'] = subjectName.strip()
                
                updateapiSpecificSubject = postMethod(
                    request=request,
                    method='PUT',
                    task = 'UPDATESUBJECT',
                    pathInfo=getSpecificSubject_URL+str(id)+'/'.strip(),
                    dataList = data
                    )
                data = json.loads(updateapiSpecificSubject.text)
                print(data)
                res = updateapiSpecificSubject
                response_code = res.status_code
                response =''
                if(response_code == 200):
                    success_data = "Subject Updated Successfully"
                    return render(request,'Admin/course-management/edit-subject.html',{'username':username,'success_data':success_data,'data':data,'authority':dictionary}) 
                # return redirect('/edit-subject/'+str(id))
                # else:
                #     errorDict = json.loads(res.text) 
                
                #     errDict = {}
                #     if(len(errorDict) != 0 ):
                #         for i,j in errorDict.items():
                #             x = j[0]
                #             errDict[i] = x
                #     return render(request,'Admin/course-management/edit-course.html',{'username':username,'errDict':errDict,'data':data,'authority':dictionary})   
        else:
            return render(request,'403.html')  
    else:
        return redirect('login')

# ===================================================================================================================================================================
#                                                          SEARCH & PAGINATION FOR COURSETYPE LIST (with querystring or page number)
# ===================================================================================================================================================================
def courseTypeSearch(request):
    if request.session.has_key('auth_token'):
        username = request.session['auth_username']
        courseTypeSearchString = request.GET['search_String']
        page = request.GET['page']

        print('string : ',courseTypeSearchString,'pgno : ',page)
        apiSearchCourseTypeDetail = getMethod(
                request=request,
                method='GET',
                task = 'SEARCHCOURSETYPE',
                pathInfo=searchCourseType_URL+'?q='+str(courseTypeSearchString)+'&page='+str(page).strip(),
                )
        data = json.loads(apiSearchCourseTypeDetail.text)
        print('this is exam search data before >>>> ',data)

        return JsonResponse({'searchResultList': data})
    else:
        return redirect('login')

# ===================================================================================================================================================================
#                                                          SEARCH & PAGINATION FOR COURSE LIST (with querystring or page number)
# ===================================================================================================================================================================
def courseSearch(request):
    if request.session.has_key('auth_token'):
        username = request.session['auth_username']
        courseSearchString = request.GET['search_String']
        page = request.GET['page']

        print('string : ',courseSearchString,'pgno : ',page)
        apiSearchCourseDetail = getMethod(
                request=request,
                method='GET',
                task = 'SEARCHCOURSE',
                pathInfo=searchCourse_URL+'?q='+str(courseSearchString)+'&page='+str(page).strip(),
                )
        data = json.loads(apiSearchCourseDetail.text)
        print('this is exam search data before >>>> ',data)

        return JsonResponse({'searchResultList': data})
    else:
        return redirect('login')

# ===================================================================================================================================================================
#                                                          SEARCH & PAGINATION FOR SUBJECT LIST (with querystring or page number)
# ===================================================================================================================================================================
def subjectSearch(request):
    if request.session.has_key('auth_token'):
        username = request.session['auth_username']
        subjectSearchString = request.GET['search_String']
        page = request.GET['page']

        print('string : ',subjectSearchString,'pgno : ',page)
        apiSearchSubjectDetail = getMethod(
                request=request,
                method='GET',
                task = 'SEARCHSUBJECT',
                pathInfo=searchSubjectType_URL+'?q='+str(subjectSearchString)+'&page='+str(page).strip(),
                )
        data = json.loads(apiSearchSubjectDetail.text)
        print('this is exam search data before >>>> ',data)

        return JsonResponse({'searchResultList': data})
    else:
        return redirect('login')

# ===================================================================================================================================================================
#                                                          SEARCH & PAGINATION FOR COURSE TYPE LIST (with querystring or page number)
# ===================================================================================================================================================================
def subjectToCourseSearch(request):
    if request.session.has_key('auth_token'):
        username = request.session['auth_username']
        SubjectToCourseSearchString = request.GET['search_String']
        page = request.GET['page']

        print('string : ',SubjectToCourseSearchString,'pgno : ',page)
        apiSearchSubjectToCourseDetail = getMethod(
                request=request,
                method='GET',
                task = 'SEARCHSUBJECTTOCOURSE',
                pathInfo=searchSubjectToCourse_URL+'?q='+str(SubjectToCourseSearchString)+'&page='+str(page).strip(),
                )
        data = json.loads(apiSearchSubjectToCourseDetail.text)
        print('this is exam search data before >>>> ',data)

        return JsonResponse({'searchResultList': data})
    else:
        return redirect('login')



# ==========================================================================================================================================
#                                                     DELETION FUNCTIONALITY
# ==========================================================================================================================================
def deleteCourseType(request,id):
    if request.session.has_key('auth_token'):
        apideleteCourseType = getMethod(
            request=request,
                method="DELETE",
                task = 'DELETESPECIFICCOURSE',
                pathInfo=deleteCourseType_URL+str(id)+'/'.strip(),
                ) 
        data = json.loads(apideleteCourseType.text)
        print('data >> ',data)
        return JsonResponse({'data':data})
    else:
        return redirect('login')

# ==========================================================================================================================================
# ==========================================================================================================================================
def deleteCourse(request,id):
    if request.session.has_key('auth_token'):
        apideleteCourse = getMethod(
            request=request,
                method="DELETE",
                task = 'DELETESPECIFICCOURSE',
                pathInfo=deleteCourse_URL+str(id)+'/'.strip(),
                ) 
        data = json.loads(apideleteCourse.text)
        print('data >> ',data)
        return JsonResponse({'data':data})
    else:
        return redirect('login')
    
# ==========================================================================================================================================
# ==========================================================================================================================================
def deleteSubject(request,id):
    if request.session.has_key('auth_token'):
        apideleteSubject = getMethod(
            request=request,
                method="DELETE",
                task = 'DELETESPECIFICCOURSE',
                pathInfo=deleteSubject_URL+str(id)+'/'.strip(),
                ) 
        data = json.loads(apideleteSubject.text)
        print('data >> ',data)
        return JsonResponse({'data':data})
    else:
        return redirect('login')


# ==========================================================================================================================================
# ==========================================================================================================================================
def deleteSubjectToCourse(request,id):
    if request.session.has_key('auth_token'):
        apideleteSubjectToCourse = getMethod(
            request=request,
                method="DELETE",
                task = 'DELETESPECIFICCOURSE',
                pathInfo=deleteSubjectToCourse_URL+str(id)+'/'.strip(),
                ) 
        data = json.loads(apideleteSubjectToCourse.text)
        print('data >> ',data)
        return JsonResponse({'data':data})
    else:
        return redirect('login')



# ==========================================================================================================================================
#                                              GET ASSIGNED TOPICS VIA SUBJECT SELECTION
# ==========================================================================================================================================
def search_Topic(request):
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
            return JsonResponse({'topicList':topicdata,'topicId':dataTopic[0]['id']}) 
        else:
            topicdata = []
            topicdata.append('<b>- No topic available for selected course and subject!</b>')
            return JsonResponse({'topicList':topicdata})
    else:
        return redirect('login')