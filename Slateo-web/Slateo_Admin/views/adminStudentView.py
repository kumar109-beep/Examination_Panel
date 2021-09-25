from django.shortcuts import render,redirect
from django.http import JsonResponse,HttpResponse
from .Helper.postMethod import *
from .Helper.getMethod import *
import json
from .Helper.globalURL import *
import base64
import pandas as pd
import csv
from .Helper.getAuthorityList import *
from Slate_O.validateKey import checkKey
from .headerNotification import headerNotification


# from django.db.models import Q
# =========================================================================================================================================================================
#                                                                   ADD STUDENT DETAILS
# =========================================================================================================================================================================
def send_credentail_to_student(request):
    if request.session.has_key('auth_token'):
        username = request.session['auth_username']
        if request.method == 'POST':
            registration = request.POST['registration']
            # rdata = registration.split('_')
            print('reg number >>>> ',registration)
            dataDict = {}
            dataDict['registration'] = registration
            apisendCredental = postMethod(
                request=request,
                method='POST',
                task = 'SENDCREDENTAIL',
                pathInfo=sendCredential_URL.strip(),
                dataList = dataDict
                )
            data = json.loads(apisendCredental.text)
            print(data,apisendCredental.status_code)
            return JsonResponse({'status':apisendCredental.status_code})
    else:
        return redirect('login')

def send_bulk_credentail_to_student(request):
    if request.session.has_key('auth_token'):
        username = request.session['auth_username']
        if request.method == 'POST':
            registration = request.POST['registration']
            # rdata = registration.split('_')
            print('reg number >>>> ',registration)
            dataDict = {}
            dataDict['registration'] = registration
            apisendCredental = postMethod(
                request=request,
                method='POST',
                task = 'SENDBULKCREDENTAIL',
                pathInfo=sendBulkCredential_URL.strip(),
                dataList = dataDict
                )
            data = json.loads(apisendCredental.text)
            print(data,apisendCredental.status_code)
            return JsonResponse({'status':apisendCredental.status_code})
    else:
        return redirect('login')





def add_student_detail(request):
    if request.session.has_key('auth_token'):
        try:
            authority = request.session['authority']
            dictionary = get_authority_list(authority,'resource_login')
        except:
            authority = []
            dictionary = get_authority_list(authority,'admin_login')
        status = checkKey(dictionary,'add_students')
        if(status == 'True' or len(authority) == 0):
            username = request.session['auth_username']
            tokenKey = request.session['auth_token']
            apiCourseList = getMethod(
                request=request,
                method='GET',
                task = 'GETCOURSETYPELIST',
                pathInfo=getCourseTypeList_URL.strip(),
                )
            data = json.loads(apiCourseList.text)
            api_getCountry_list = getMethod(
                    request=request,
                    method='GET',
                    task = 'GETCOUNTRY',
                    pathInfo=getCountry_list.strip(),
                    )
            countryData = json.loads(api_getCountry_list.text)
            print('countryData >>',countryData)
            api_getState_list = getMethod(
                    request=request,
                    method='GET',
                    task = 'GETSTATE',
                    pathInfo=getState_list.strip(),
                    )
            stateData = json.loads(api_getState_list.text)
            print('stateData >> ',stateData)
            response = headerNotification(request)
            length = response[0]
            requestHeadingData = response[1]
            admin_data = response[2]
            return render(request,'Admin/student-management/add-student-detail.html',{'admin_data':admin_data,'dataLength':length,'data':requestHeadingData['data'],'stateData':stateData,'countryData':countryData,'username':username,'tokenKey':tokenKey,'data1':data,'authority':dictionary})
        else:
            return render(request,'403.html') 
    else:
        return redirect('login')


# =========================================================================================================================================================================
#                                                                  EDIT SPECIFIC STUDENT DETAILS
# =========================================================================================================================================================================
def edit_student_detail(request,id):
    if request.session.has_key('auth_token'):
        try:
            authority = request.session['authority']
            dictionary = get_authority_list(authority,'resource_login')
        except:
            authority = []
            dictionary = get_authority_list(authority,'admin_login')
        status = checkKey(dictionary,'edit_student')
        if(status == 'True' or len(authority) == 0):
            username = request.session['auth_username']
            if request.method == 'GET':
                tokenKey = request.session['auth_token']
                apiCourseList = getMethod(
                    request=request,
                    method='GET',
                    task = 'GETCOURSETYPELIST',
                    pathInfo=getCourseTypeList_URL.strip(),
                    )
                courseData = json.loads(apiCourseList.text)
                apiStudentDetails = getMethod(
                    request=request,
                    method='GET',
                    task = 'GETSTUDENTDETAIL',
                    pathInfo=studentDetail_URL+str(id)+'/'.strip(),
                    )
                data = json.loads(apiStudentDetails.text)
                data = data['data']
                print('student data >>> ',data)
                if '-' in data['fullName']:
                    fullname = data['fullName'].split('-')
                    data['fname'] = fullname[0]
                    data['lname'] = fullname[1]
                elif " " in data['fullName']:
                    fullname = data['fullName'].split(' ')
                    data['fname'] = fullname[0]
                    data['lname'] = fullname[1]
                else:
                    data['fname'] = data['fullName']
                    data['lname'] = ''
                for k in data['suject']:
                    print(k['subjectName'])
                subjectList = []
                for i in data['suject']:
                    subjectList.append(i['id'])
                print('>>>>>>>>>>>>>',subjectList)

                api_getCountry_list = getMethod(
                    request=request,
                    method='GET',
                    task = 'GETCOUNTRY',
                    pathInfo=getCountry_list.strip(),
                    )
                countryPermData = json.loads(api_getCountry_list.text)
                countryTempData = json.loads(api_getCountry_list.text)

                for j in countryPermData:
                    if data['perm_countryfk'] != None:
                        for i in data['perm_countryfk']:
                            if data['perm_countryfk']['id'] == j['id']:
                                j['status'] = 'True'
                
                for j in countryTempData:
                    if data['temp_countryfk'] != None:
                        for i in data['temp_countryfk']:
                            if data['temp_countryfk']['id'] == j['id']:
                                j['status'] = 'True'
                api_getState_list = getMethod(
                    request=request,
                    method='GET',
                    task = 'GETSTATE',
                    pathInfo=getState_list.strip(),
                    )
                statePermData = json.loads(api_getState_list.text)
                stateTempData = json.loads(api_getState_list.text)

                for k in statePermData:
                    if data['perm_statefk'] != None:
                        for i in data['perm_statefk']:
                            if data['perm_statefk']['id'] == k['id']:
                                k['status'] = 'True'
                for k in stateTempData:
                    if data['temp_statefk'] != None:
                        for i in data['temp_statefk']:
                            if data['temp_statefk']['id'] == k['id']:
                                k['status'] = 'True'
                print('\nData >>',data)
                response = headerNotification(request)
                length = response[0]
                requestHeadingData = response[1]
                admin_data = response[2]
                return render(request,'Admin/student-management/edit-student-detail.html',{'admin_data':admin_data,'dataLength':length,'data':requestHeadingData['data'],'statePermData':statePermData,'countryPermData':countryPermData,'stateTempData':stateTempData,'countryTempData':countryTempData,'username':username,'studentData' : data,'courseData':courseData,'tokenKey':tokenKey,'authority':dictionary,'subjectList':subjectList})
        else:
            return render(request,'403.html') 
    else:
        return redirect('login')

# =========================================================================================================================================================================
#                                                                   PREVIEW STUDENT DATA
# =========================================================================================================================================================================
def preview_student_data(request):
    if request.session.has_key('auth_token'):
        try:
            authority = request.session['authority']
            dictionary = get_authority_list(authority,'resource_login')
        except:
            authority = []
            dictionary = get_authority_list(authority,'admin_login')
        status = checkKey(dictionary,'profile_management')
        if(status == 'True' or len(authority) == 0):
            username = request.session['auth_username']
            return render(request,'Admin/student-management/preview-data.html',{'username':username,'authority':dictionary})
        else:
            return render(request,'403.html') 
    else:
        return redirect('login')

# =========================================================================================================================================================================
#                                                                   SHOW SPECIFIC STUDENT DETAIL
# =========================================================================================================================================================================
def student_detail(request,id):
    if request.session.has_key('auth_token'):
        try:
            authority = request.session['authority']
            dictionary = get_authority_list(authority,'resource_login')
        except:
            authority = []
            dictionary = get_authority_list(authority,'admin_login')
        status = checkKey(dictionary,'view_student')
        if(status == 'True' or len(authority) == 0):
            username = request.session['auth_username']
            if request.method == 'GET':
                apiStudentDetails = getMethod(
                    request=request,
                    method='GET',
                    task = 'STUDENTDETAIL',
                    pathInfo=studentDetail_URL+str(id)+'/'.strip(),
                    )
                data = json.loads(apiStudentDetails.text)
                data = data['data']
                if '-' in data['fullName']:
                    fullname = data['fullName'].split('-')
                    data['fullname'] = fullname[0]+" "+fullname[1]
                else:
                    data['fullname'] = data['fullName']
                print(data)
            
               
                subjectData = ''
                response = headerNotification(request)
                length = response[0]
                requestHeadingData = response[1]
                admin_data = response[2]
                # ====================================================================================
                return render(request,'Admin/student-management/student-detail.html',{'admin_data':admin_data,'dataLength':length,'data':requestHeadingData['data'],'username':username,'studentDetail':data,'authority':dictionary})
        else:
            return render(request,'403.html') 
    else:
        return redirect('login')

# =========================================================================================================================================================================
#                                                                   SHOW ALL STUDENT LIST
# =========================================================================================================================================================================
def student_list(request):
    if request.session.has_key('auth_token'):
        try:
            authority = request.session['authority']
            dictionary = get_authority_list(authority,'resource_login')
        except:
            authority = []
            dictionary = get_authority_list(authority,'admin_login')
        status = checkKey(dictionary,'student_list')
        if(status == 'True' or len(authority) == 0):
            username = request.session['auth_username']
            if request.method == 'GET':
                apiStudentList = getMethod(
                request=request,
                method='GET',
                task = 'STUDENTLIST',
                pathInfo=studentList_URL.strip(),
                )
                data = json.loads(apiStudentList.text)
                # print(data)
                # exit()
                for i in data:
                    if '-' in i['fullName']:
                        fullname = i['fullName'].split('-')
                        i['fullname'] = fullname[0]+" "+fullname[1]
                    else:
                        i['fullname'] = i['fullName']
                try:
                    authority = request.session['authority']
                    dictionary = get_authority_list(authority,'resource_login')
                    
                except:
                    authority = []
                    dictionary = get_authority_list(authority,'admin_login')

                response = headerNotification(request)
                length = response[0]
                requestHeadingData = response[1]
                admin_data = response[2]
                return render(request,'Admin/student-management/student-list.html',{'admin_data':admin_data,'dataLength':length,'data':requestHeadingData['data'],'username':username,'listData':data,'authority':dictionary})
        else:
            return render(request,'403.html') 
    else:
        return redirect('login')
        

# =========================================================================================================================================================================
#                                                                   ADD STUDENTS VIA LINK : FORM
# =========================================================================================================================================================================
def through_link(request):
    if request.session.has_key('auth_token'):
        try:
            authority = request.session['authority']
            dictionary = get_authority_list(authority,'resource_login')
        except:
            authority = []
            dictionary = get_authority_list(authority,'admin_login')
        status = checkKey(dictionary,'add_Student_through_link')
        if(status == 'True' or len(authority) == 0):
            username = request.session['auth_username']
            try:
                authority = request.session['authority']
                dictionary = get_authority_list(authority,'resource_login')
            except:
                authority = []
                dictionary = get_authority_list(authority,'admin_login')
            response = headerNotification(request)
            length = response[0]
            requestHeadingData = response[1]
            admin_data = response[2]
            return render(request,'Admin/student-management/through-link.html',{'admin_data':admin_data,'dataLength':length,'data':requestHeadingData['data'],'username':username,'authority':dictionary})
        else:
            return render(request,'403.html') 
    else:
        return redirect('login')


# =========================================================================================================================================================================
#                                                                   UPLOAD STUDENTS THROUGH SHEET
# =========================================================================================================================================================================
def upload_excel_data(request):
    if request.session.has_key('auth_token'):
        try:
            authority = request.session['authority']
            dictionary = get_authority_list(authority,'resource_login')
        except:
            authority = []
            dictionary = get_authority_list(authority,'admin_login')
        status = checkKey(dictionary,'upload_excel_data')
        if(status == 'True' or len(authority) == 0):
            username = request.session['auth_username']
            if request.method =='GET':
                response = headerNotification(request)
                length = response[0]
                requestHeadingData = response[1]
                admin_data = response[2]
                return render(request,'Admin/student-management/upload-excel.html',{'admin_data':admin_data,'dataLength':length,'data':requestHeadingData['data'],'username':username,'authority':dictionary})
            elif request.method == 'POST':
                # try:
                file = request.FILES['browse_csv_file']
                splitedData = str(file).split('.')
                if(splitedData[-1] == 'xls'):

                    data = pd.read_excel(file)
                    print(data)

                    dataDict = {}
                    Registration = data.Registration_No.tolist()
                    Student_Name = data.Student_Name.tolist()
                    dob = data.DOB.tolist()
                    gender = data.Gender.tolist()
                    Guardian_Name = data.Guardian_Name.tolist()
                    Guardian_Email = data.guardianEmail.tolist()
                    Relation_with_Guardian = data.Relation_with_Guardian.tolist()
                    Hand_selection = data.Hand_selection.tolist()
                    Disability = data.Disability.tolist()
                    Email = data.Email.tolist()
                    Contact = data.Contact.tolist()
                    Guardian_contact = data.Guardian_contact.tolist()
                    Current_address = data.current_address.tolist()
                    current_Country = data.Current_CountryID.tolist()
                    current_State = data.Current_StateID.tolist()
                    current_district = data.current_district.tolist()
                    current_pincode = data.current_pincode.tolist()
                    permanent_address = data.permanent_address.tolist()
                    permanent_Country = data.Permanent_CountryID.tolist()
                    permanent_State = data.Permanent_StateID.tolist()
                    permanent_district = data.permanent_district.tolist()
                    permanent_pincode = data.permanent_pincode.tolist()
                    courseTypeID = data.CourseTypeID.tolist()
                    courseID = data.CourseID.tolist()
                    subjectID = data.SubjectID.tolist()
                    
                    Registration = checkNAN(Registration)
                    Student_Name = checkNAN(Student_Name)
                    dob = checkNAN(dob)
                    gender = checkNAN(gender)
                    Guardian_Name = checkNAN(Guardian_Name)
                    Relation_with_Guardian = checkNAN(Relation_with_Guardian)
                    Hand_selection = checkNAN(Hand_selection)
                    Disability = checkNAN(Disability)
                    Email = checkNAN(Email)
                    Contact = checkNAN(Contact)
                    Guardian_contact = checkNAN(Guardian_contact)
                    Guardian_Email = checkNAN(Guardian_Email)
                    Current_address = checkNAN(Current_address)
                    current_Country = checkNAN(current_Country)
                    current_state = checkNAN(current_State)
                    current_district = checkNAN(current_district)
                    current_pincode = checkNAN(current_pincode)
                    permanent_address = checkNAN(permanent_address)
                    permanent_Country = checkNAN(permanent_Country)
                    permanent_state = checkNAN(permanent_State)
                    permanent_district = checkNAN(permanent_district)
                    permanent_pincode = checkNAN(permanent_pincode)
                    courseTypeID = checkNAN(courseTypeID)
                    courseID = checkNAN(courseID)
                    subjectID = checkNAN(subjectID)

                    for i in range(len(Registration)):
                        if(Registration[i] != 'NA'):
                            studentDataDict = {}
                            studentDataDict['registration'] = str(Registration[i])
                            studentDataDict['studentName'] = str(Student_Name[i])
                            studentDataDict['dob'] = str((str(dob[i]).split(' '))[0])
                            studentDataDict['gender'] = str(gender[i])
                            studentDataDict['gardionName'] = str(Guardian_Name[i])
                            studentDataDict['gargionrelatio'] = str(Relation_with_Guardian[i])
                            studentDataDict['email'] = str(Email[i])
                            studentDataDict['mobile'] = str(Contact[i])
                            studentDataDict['guardianContact'] = Guardian_contact[i]
                            studentDataDict['currentaddress'] = str(Current_address[i])
                            studentDataDict['currentcountery'] = int(current_Country[i])
                            studentDataDict['currentstate'] = int(current_state[i])
                            studentDataDict['currentdistrict'] = str(current_district[i])
                            studentDataDict['currentpincode'] = str(current_pincode[i])
                            studentDataDict['premanetaddress'] = str(permanent_address[i])
                            studentDataDict['permcountery'] = int(permanent_Country[i])
                            studentDataDict['premstate'] = int(permanent_state[i])
                            studentDataDict['permdistrict'] = str(permanent_district[i])
                            studentDataDict['prem_pincode'] = str(permanent_pincode[i])
                            studentDataDict['handy'] = str(Hand_selection[i])
                            studentDataDict['diasabe'] = str(Disability[i])
                            studentDataDict['guardianEmail'] = str(Guardian_Email[i])

                            studentDataDict['courseTypeFK'] = int(courseTypeID[i])
                            studentDataDict['courseFK'] = int(courseID[i])
                            studentDataDict['suject'] = [int(digit) for digit in str(subjectID[i])]
                                        
                            apiAddStudentDetails = postMethod(
                            request = request,
                            method='POST',
                            task = 'ADDSTUDENTDETAILS',
                            pathInfo=registerStudent_URL.strip(),
                            dataList = studentDataDict
                            )

                            res = apiAddStudentDetails
                            response_code = res.status_code
                            print(response_code)
                            print('\n',res.text)
                    # exit()
                    return redirect('student_list')

                if(splitedData[-1] == 'csv'):
                    # data = pd.read_csv(file)
                    print('file >> ',file)

                    data = pd.read_csv(file, encoding= 'unicode_escape')

                    print('data >> ',data)

                    dataDict = {}
                    Registration = data.Registration_No.tolist()
                    Student_Name = data.Student_Name.tolist()
                    dob = data.DOB.tolist()
                    gender = data.Gender.tolist()
                    Guardian_Name = data.Guardian_Name.tolist()
                    Guardian_Email = data.guardianEmail.tolist()
                    Relation_with_Guardian = data.Relation_with_Guardian.tolist()
                    Hand_selection = data.Hand_selection.tolist()
                    Disability = data.Disability.tolist()
                    Email = data.Email.tolist()
                    Contact = data.Contact.tolist()
                    Guardian_contact = data.Guardian_contact.tolist()
                    Current_address = data.current_address.tolist()
                    current_Country = data.Current_CountryID.tolist()
                    current_State = data.Current_StateID.tolist()
                    current_district = data.current_district.tolist()
                    current_pincode = data.current_pincode.tolist()
                    permanent_address = data.permanent_address.tolist()
                    permanent_Country = data.Permanent_CountryID.tolist()
                    permanent_State = data.Permanent_StateID.tolist()
                    permanent_district = data.permanent_district.tolist()
                    permanent_pincode = data.permanent_pincode.tolist()
                    courseTypeID = data.CourseTypeID.tolist()
                    courseID = data.CourseID.tolist()
                    subjectID = data.SubjectID.tolist()
                    
                    Registration = checkNAN(Registration)
                    Student_Name = checkNAN(Student_Name)
                    dob = checkNAN(dob)
                    gender = checkNAN(gender)
                    Guardian_Name = checkNAN(Guardian_Name)
                    Relation_with_Guardian = checkNAN(Relation_with_Guardian)
                    Hand_selection = checkNAN(Hand_selection)
                    Disability = checkNAN(Disability)
                    Email = checkNAN(Email)
                    Contact = checkNAN(Contact)
                    Guardian_contact = checkNAN(Guardian_contact)
                    Guardian_Email = checkNAN(Guardian_Email)
                    Current_address = checkNAN(Current_address)
                    current_Country = checkNAN(current_Country)
                    current_state = checkNAN(current_State)
                    current_district = checkNAN(current_district)
                    current_pincode = checkNAN(current_pincode)
                    permanent_address = checkNAN(permanent_address)
                    permanent_Country = checkNAN(permanent_Country)
                    permanent_state = checkNAN(permanent_State)
                    permanent_district = checkNAN(permanent_district)
                    permanent_pincode = checkNAN(permanent_pincode)
                    courseTypeID = checkNAN(courseTypeID)
                    courseID = checkNAN(courseID)
                    subjectID = checkNAN(subjectID)

                    for i in range(len(Registration)):
                        if(Registration[i] != 'NA'):
                            studentDataDict = {}
                            studentDataDict['registration'] = str(Registration[i])
                            studentDataDict['studentName'] = str(Student_Name[i])
                            studentDataDict['dob'] = str((str(dob[i]).split(' '))[0])
                            studentDataDict['gender'] = str(gender[i])
                            studentDataDict['gardionName'] = str(Guardian_Name[i])
                            studentDataDict['gargionrelatio'] = str(Relation_with_Guardian[i])
                            studentDataDict['email'] = str(Email[i])
                            studentDataDict['mobile'] = str(Contact[i])
                            studentDataDict['guardianContact'] = Guardian_contact[i]
                            studentDataDict['currentaddress'] = str(Current_address[i])
                            studentDataDict['currentcountery'] = int(current_Country[i])
                            studentDataDict['currentstate'] = int(current_state[i])
                            studentDataDict['currentdistrict'] = str(current_district[i])
                            studentDataDict['currentpincode'] = str(current_pincode[i])
                            studentDataDict['premanetaddress'] = str(permanent_address[i])
                            studentDataDict['permcountery'] = int(permanent_Country[i])
                            studentDataDict['premstate'] = int(permanent_state[i])
                            studentDataDict['permdistrict'] = str(permanent_district[i])
                            studentDataDict['prem_pincode'] = str(permanent_pincode[i])
                            studentDataDict['handy'] = str(Hand_selection[i])
                            studentDataDict['diasabe'] = str(Disability[i])
                            studentDataDict['guardianEmail'] = str(Guardian_Email[i])

                            studentDataDict['courseTypeFK'] = int(courseTypeID[i])
                            studentDataDict['courseFK'] = int(courseID[i])
                            studentDataDict['suject'] = [int(digit) for digit in str(subjectID[i])]
                                        
                            apiAddStudentDetails = postMethod(
                            request = request,
                            method='POST',
                            task = 'ADDSTUDENTDETAILS',
                            pathInfo=registerStudent_URL.strip(),
                            dataList = studentDataDict
                            )

                            res = apiAddStudentDetails
                            response_code = res.status_code
                            print(response_code)
                            print('\n',res.text)
                    return redirect('student_list')
                else:
                    try:
                        authority = request.session['authority']
                        dictionary = get_authority_list(authority,'resource_login')
                    except:
                        authority = []
                        dictionary = get_authority_list(authority,'admin_login')
                # except:
                #     return render(request,'Admin/student-management/upload-excel.html',{'username':username,'message':'Invalid headers. Please Correct the Headers and try again!','authority':dictionary})
        else:
            return render(request,'403.html') 
    else:
        return redirect('login')

# utility functionto check 'nan'
def checkNAN(prevList):
    newList = []
    for i in range(len(prevList)):
        if type(prevList[i]) == float:
            newList.append('NA')
        else:
            newList.append(prevList[i])
    return newList
# ===================================================================================================================================================================
#                                                          SEARCH & PAGINATION FOR STUDENT LIST (with querystring or page number)
# ===================================================================================================================================================================
def studentSearch(request):
    if request.session.has_key('auth_token'):
        username = request.session['auth_username']
        studentSearchString = request.GET['search_String']
        page = request.GET['page']

        print('string : ',studentSearchString,'pgno : ',page)
        apiSearchStudentDetails = getMethod(
                request=request,
                method='GET',
                task = 'SEARCHSTUDENT',
                pathInfo=searchStudent_URl+'?q='+str(studentSearchString)+'&page='+str(page).strip(),
                )
        data = json.loads(apiSearchStudentDetails.text)

        return JsonResponse({'searchResultList': data})
    else:
        return redirect('login')
#=====================================================================================================================================================================
def do_work(list_of_work):
    for work_item in list_of_work:
        do_work_item(work_item)
    return 'work is complete'
#=====================================================================================================================================================================
def my_view(request):
     do_work()
     return HttpResponse('work done!')
#=====================================================================================================================================================================
def getSlectedSubject(request):
    if request.session.has_key('auth_token'):
        username = request.session['auth_username']
        courseTypeID =  request.GET['courseTypeID']
        courseID = request.GET['couseID']
        apiGetSubjectList = getMethod(
            request=request,
            method='GET',
            task = 'GETSUBJECTLISTFROMSELECTEDCOURSE',
            pathInfo=getSubjectFROMCOURSESelected_URL+'?courseType='+str(courseTypeID)+'&courseName='+str(courseID),
            )
        data = json.loads(apiGetSubjectList.text)
        return JsonResponse({'subjectList': data})
    else:
        return redirect('login')

#=====================================================================================================================================================================
#                                                   VALIDATE USER AVAILABILTY TO STORE STUDENT DATA
#=====================================================================================================================================================================
def validateUserAvailability(request):
    if request.session.has_key('auth_token'):
        username = request.session['auth_username']
        if request.method == 'GET':
            check = request.GET['check']
            validateString = request.GET['valiadteString']
            print('check value : ',check)
            print('validation string : ',validateString)
            type_validation = ''
            if(check == 'registrationNumber'):
                type_validation = 'UsernameVal'
            if(check == 'emailID'):
                type_validation = 'EmailVal'
            if(check == 'mobileNumber'):
                type_validation = 'ContactVal'
            print('-------------------------------------------------------------------')
            apiGetSubjectList = getMethod(
                request=request,
                method='GET',
                task = 'CHECKSTUDENTDATA',
                pathInfo=checkExistDataStudent_URL+'?q='+str(validateString)+'&type_validation='+str(type_validation),
                )
            data = json.loads(apiGetSubjectList.text)
            print(data)
        return JsonResponse({'resultData': data['data']})
    else:
        return redirect('login')


        # q=1001&type_validation=UsernameVal