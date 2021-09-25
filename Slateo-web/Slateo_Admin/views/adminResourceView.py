from django.shortcuts import render,redirect
from django.http import JsonResponse,HttpResponse
from .Helper.postMethod import *
from .Helper.getMethod import *
import json
from .Helper.globalURL import *
import base64
from datetime import date
import pandas as pd
import csv
from .Helper.getAuthorityList import *
from Slate_O.validateKey import checkKey
from .headerNotification import headerNotification

# from django.db.models import Q
# =========================================================================================================================================================================
#                                                                   ADD STUDENT DETAILS
# =========================================================================================================================================================================
def add_resourse_detail(request):
    if request.session.has_key('auth_token'):
        try:
            authority = request.session['authority']
            dictionary = get_authority_list(authority,'resource_login')
        except:
            authority = []
            dictionary = get_authority_list(authority,'admin_login')
        status = checkKey(dictionary,'add_resources')
        if(status == 'True' or len(authority) == 0):
            username = request.session['auth_username']
            tokenKey = request.session['auth_token']
            print('tokenKey : ',tokenKey)
            apiSubjectList = getMethod(
                request=request,
                method='GET',
                task = 'GETSUBJECTLIST',
                pathInfo=getSubjectList_URL.strip(),
                )
            subjectList = json.loads(apiSubjectList.text)
            print('subjectList : ',subjectList)

            apiGetRoleList = getMethod(
                request=request,
                method='GET',
                task = 'GETROLELIST',
                pathInfo=getRoleList_URL.strip(),
                )
            data = json.loads(apiGetRoleList.text)

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

            return render(request,'Admin/resource-management/add-resource-detail.html',{'admin_data':admin_data,'dataLength':length,'data':requestHeadingData['data'],'stateData':stateData,'countryData':countryData,'username':username,'tokenKey':tokenKey,'data1':data,'subjectList':subjectList,'authority':dictionary})
        else:
            return render(request,'403.html') 
    else:
        return redirect('login')


# =========================================================================================================================================================================
#                                                                  EDIT SPECIFIC STUDENT DETAILS
# =========================================================================================================================================================================
def edit_resource_detail(request,id):
    if request.session.has_key('auth_token'):
        try:
            authority = request.session['authority']
            dictionary = get_authority_list(authority,'resource_login')
        except:
            authority = []
            dictionary = get_authority_list(authority,'admin_login')
        status = checkKey(dictionary,'edit_resource')
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
                subjectLists = json.loads(apiSubjectList.text)
                apiGetRoleList = getMethod(
                    request=request,
                    method='GET',
                    task = 'GETROLELIST',
                    pathInfo=getRoleList_URL.strip(),
                    )
                roleList = json.loads(apiGetRoleList.text)
                apiResourceDetails = getMethod(
                    request=request,
                    method='GET',
                    task = 'RESOURCEDETAIL',
                    pathInfo=resourceDetail_URL+str(id)+'/'.strip(),
                    )
                data = json.loads(apiResourceDetails.text)
                data = data['data']
                if '-' in data['fullName']:
                    fullname = data['fullName'].split('-')
                    data['fname'] = fullname[0]
                    data['lname'] = fullname[1]
                    # print(data)
                elif ' ' in data['fullName']:
                    fullname = data['fullName'].split(' ')
                    data['fname'] = fullname[0]
                    data['lname'] = fullname[1]
                    # print(data)
                else:
                    data['fullname'] = data['fullName']
                for j in roleList:
                    for i in data['role_designation']:
                        if i['id'] == j['id']:
                            j['status'] = 'True'
                for j in subjectLists:
                    if j['id'] == data['subject_speciality']['id']:
                            j['status'] = 'True'
                print('data >>> ',data)
                api_getCountry_list = getMethod(
                    request=request,
                    method='GET',
                    task = 'GETCOUNTRY',
                    pathInfo=getCountry_list.strip(),
                    )
                countryData = json.loads(api_getCountry_list.text)
                for j in countryData:
                    for i in data['country']:
                        if data['country']['id'] == j['id']:
                            j['status'] = 'True'
                print('countryData >>',countryData)
                api_getState_list = getMethod(
                    request=request,
                    method='GET',
                    task = 'GETSTATE',
                    pathInfo=getState_list.strip(),
                    )
                stateData = json.loads(api_getState_list.text)
                for k in stateData:
                    print(k['id'])
                    print(data['state']['id'])
                    for i in data['state']:
                        if data['state']['id'] == k['id']:
                            print('============hello=============')
                            k['status'] = 'True'
                print('stateData >> ',stateData)

                response = headerNotification(request)
                length = response[0]
                requestHeadingData = response[1]
                admin_data = response[2]
                            
                return render(request,'Admin/resource-management/edit-resource-detail.html',{'admin_data':admin_data,'dataLength':length,'data':requestHeadingData['data'],'subjectList':subjectLists,'username':username,'resourceData':data,'tokenKey':tokenKey,'roleList':roleList,'authority':dictionary,'countryData':countryData,'stateData':stateData})
        else:
            return render(request,'403.html') 
    else:
        return redirect('login')

# =========================================================================================================================================================================
#                                                                   PREVIEW STUDENT DATA
# =========================================================================================================================================================================
def preview_resource_data(request,id):
    if request.session.has_key('auth_token'):
        try:
            authority = request.session['authority']
            dictionary = get_authority_list(authority,'resource_login')
        except:
            authority = []
            dictionary = get_authority_list(authority,'admin_login')
        status = checkKey(dictionary,'view_resource')
        if(status == 'True' or len(authority) == 0):
            username = request.session['auth_username']
            apiResourceDetails = getMethod(
                    request=request,
                    method='GET',
                    task = 'RESOURCEDETAIL',
                    pathInfo=resourceDetail_URL+str(id)+'/'.strip(),
                    )
            data = json.loads(apiResourceDetails.text)
            data = data['data']
            if '-' in data['fullName']:
                fullname = data['fullName'].split('-')
                data['fullname'] = fullname[0]+" "+fullname[1]
            else:
                data['fullname'] = data['fullName']
                
            print('data >> ',data)
            response = headerNotification(request)
            length = response[0]
            requestHeadingData = response[1]
            admin_data = response[2]
            return render(request,'Admin/resource-management/preview-data.html',{'admin_data':admin_data,'dataLength':length,'data':requestHeadingData['data'],'username':username,'resource_Data':data,'authority':dictionary})
        else:
            return render(request,'403.html') 
    else:
        return redirect('login')

# =========================================================================================================================================================================
#                                                                   SHOW SPECIFIC STUDENT DETAIL
# =========================================================================================================================================================================
def resource_detail(request,id):
    if request.session.has_key('auth_token'):
        try:
            authority = request.session['authority']
            dictionary = get_authority_list(authority,'resource_login')
        except:
            authority = []
            dictionary = get_authority_list(authority,'admin_login')
        status = checkKey(dictionary,'view_resource')
        if(status == 'True' or len(authority) == 0):
            username = request.session['auth_username']
            if request.method == 'GET':
                response = headerNotification(request)
                length = response[0]
                requestHeadingData = response[1]
                admin_data = response[2]
                return render(request,'Admin/resource-management/resource-detail.html',{'admin_data':admin_data,'dataLength':length,'data':requestHeadingData['data'],'username':username,'resource_Data':data,'authority':dictionary})
        else:
            return render(request,'403.html') 
    else:
        return redirect('login')



# =========================================================================================================================================================================
#                                                                   SHOW ALL STUDENT LIST
# =========================================================================================================================================================================
def resource_list(request):
    if request.session.has_key('auth_token'):
        try:
            authority = request.session['authority']
            dictionary = get_authority_list(authority,'resource_login')
        except:
            authority = []
            dictionary = get_authority_list(authority,'admin_login')
        status = checkKey(dictionary,'resource_list')
        if(status == 'True' or len(authority) == 0):
            username = request.session['auth_username']
            # try:
            if request.method == 'GET':
                apiGetResourceList = getMethod(
                    request=request,
                    method='GET',
                    task = 'GETRESOURCELIST',
                    pathInfo=getResourceList_URL.strip(),
                    )
                print('resource list : >>>>> ',apiGetResourceList.text)
                data = json.loads(apiGetResourceList.text)
                print('resource list : >>>>> ',data)
                data = data['data']
                print(data)
                for i in data:
                    if '-' in i['fullName']:
                        fullname = i['fullName'].split('-')
                        i['fullname'] = fullname[0]+" "+fullname[1]
                    else:
                        i['fullname'] = i['fullName']
                roleStr = []
                for i in data:
                    if(len(i['role_designation'])):
                        x = str(i['role_designation']).replace('[','')
                        y = x.replace(']','')
                        z = y.replace("'",'')
                        
                        i['rolenames'] = z.split(',')
                        print("i['rolenames'] : ",i['rolenames'])
                        roleStr = []
                    else:
                        i['rolenames'] = ['NA']
                subjectList = []
                response = headerNotification(request)
                length = response[0]
                requestHeadingData = response[1]
                admin_data = response[2]
                return render(request,'Admin/resource-management/resource-list.html',{'admin_data':admin_data,'dataLength':length,'data':requestHeadingData['data'],'username':username,'resourceData':data,'authority':dictionary}) 
        else:
            return render(request,'403.html') 
    else:
        return redirect('login')
        

# =========================================================================================================================================================================
#                                                                   ADD STUDENTS VIA LINK : FORM
# =========================================================================================================================================================================
def resource_through_link(request):
    if request.session.has_key('auth_token'):
        try:
            authority = request.session['authority']
            dictionary = get_authority_list(authority,'resource_login')
        except:
            authority = []
            dictionary = get_authority_list(authority,'admin_login')
        status = checkKey(dictionary,'resource_through_link')
        if(status == 'True' or len(authority) == 0):
            username = request.session['auth_username']
            # try:
            #     authority = request.session['authority']
            #     dictionary = get_authority_list(authority,'resource_login')
            # except:
            #         authority = []
            #         dictionary = get_authority_list(authority,'admin_login')
            response = headerNotification(request)
            length = response[0]
            requestHeadingData = response[1]
            admin_data = response[2]
            return render(request,'Admin/resource-management/through-link.html',{'admin_data':admin_data,'dataLength':length,'data':requestHeadingData['data'],'username':username,'authority':dictionary})
        else:
            return render(request,'403.html') 
    else:
        return redirect('login')


# =========================================================================================================================================================================
#                                                                   UPLOAD STUDENTS THROUGH SHEET
# =========================================================================================================================================================================
def upload_excel_resource_data(request):
    if request.session.has_key('auth_token'):
        try:
            authority = request.session['authority']
            dictionary = get_authority_list(authority,'resource_login')
        except:
            authority = []
            dictionary = get_authority_list(authority,'admin_login')
        status = checkKey(dictionary,'upload_excel_resource_data')
        if(status == 'True' or len(authority) == 0):
            username = request.session['auth_username']
            if request.method =='GET':
                response = headerNotification(request)
                length = response[0]
                requestHeadingData = response[1]
                admin_data = response[2]
                return render(request,'Admin/resource-management/upload-excel-resource.html',{'admin_data':admin_data,'dataLength':length,'data':requestHeadingData['data'],'username':username,'authority':dictionary})
            elif request.method == 'POST':
                try:
                    file = request.FILES['browse_csv_file']
                    print('reading your file...')
                    splitedData = str(file).split('.')
                    print(splitedData[-1])

                    if(splitedData[-1] == 'xls'):
                        data = pd.read_excel(file)
                        print(data)
                        dataDict = {}

                        employeeCode = data.EmployeeID.tolist()
                        resourceName = data.EmployeeName.tolist()
                        DOB = data.DOB.tolist()
                        Contact = data.Contact.tolist()
                        Gender = data.Gender.tolist()
                        Email = data.Email.tolist()
                        Address = data.Address.tolist()
                        Country = data.CountryID.tolist()
                        State = data.StateID.tolist()
                        District = data.District.tolist()
                        Pincode = data.Pincode.tolist()
                        Education = data.Education.tolist()
                        role_designation = data.RoleID.tolist()
                        Experience = data.Experience.tolist()
                        subject_speciality = data.Subject_SpecialityID.tolist()


                        employeeCode = checkNAN(employeeCode)
                        resourceName = checkNAN(resourceName)
                        dOB = checkNAN(DOB)
                        contact = checkNAN(Contact)
                        gender = checkNAN(Gender)
                        email = checkNAN(Email)
                        address = checkNAN(Address)
                        country = checkNAN(Country)
                        state = checkNAN(State)
                        district = checkNAN(District)
                        pincode = checkNAN(Pincode)
                        education = checkNAN(Education)
                        role_designation = checkNAN(role_designation)
                        experience = checkNAN(Experience)
                        subject_speciality = checkNAN(subject_speciality)
                        

                    
                        for i in range(len(employeeCode)):
                            if(employeeCode[i] != 'NA'):
                                resourceDataDict = {}
                                # resourceDataDict['employeeCode'] = employeeCode[i]
                                # resourceDataDict['resourceName'] = resourceName[i]
                                # resourceDataDict['role_designation'] = department[i]
                                # resourceDataDict['subject_speciality'] = subjectSpeciality[i]
                                # resourceDataDict['contact'] = contact[i]
                                # resourceDataDict['email'] = email[i]
                                # resourceDataDict['dob'] = dOB[i]
                                # resourceDataDict['gender'] = gender[i]
                                # resourceDataDict['education'] = education[i]
                                # resourceDataDict['experience'] = experience[i]

                                # resourceDataDict['country'] = country[i]
                                # resourceDataDict['state'] = state[i]
                                # resourceDataDict['address'] = address[i]
                                # resourceDataDict['district'] = district[i]
                                # resourceDataDict['pincode'] = pincode[i]
                                resourceDataDict['employeeCode'] = str(employeeCode[i])
                                resourceDataDict['resourceName'] = str(resourceName[i])
                                resourceDataDict['department'] = [int(digit) for digit in str(role_designation[i])]
                                resourceDataDict['subject_speciality'] = int(subject_speciality[i])
                                resourceDataDict['contact'] = str(contact[i])
                                resourceDataDict['email'] = str(email[i])
                                resourceDataDict['dob'] = str((str(dOB[i]).split(' '))[0])
                                resourceDataDict['gender'] = str(gender[i])
                                resourceDataDict['education'] = str(education[i])
                                resourceDataDict['experience'] = str(experience[i])

                                resourceDataDict['country'] = country[i]
                                resourceDataDict['state'] = state[i]
                                resourceDataDict['address'] = str(address[i])
                                resourceDataDict['district'] = str(district[i])
                                resourceDataDict['pincode'] = str(pincode[i])
                        
                                # print('================================')
                                # print('resource csv data list >>',i,' :>> ',resourceDataDict)
                                # print('================================')
                            
                                apiAddResourceDetails = postMethod(
                                request = request,
                                method='POST',
                                task = 'ADDRESOURCEDETAILS',
                                pathInfo=addResource_URL.strip(),
                                dataList = resourceDataDict
                                )

                                res = apiAddResourceDetails
                                response_code = res.status_code
                                print('==========================================')
                                print(response_code)
                                print('\n',res.text)
                                print('==========================================')
                        # exit()
                        return redirect('resource_list')

                    elif(splitedData[-1] == 'csv'):
                        data = pd.read_csv(file)
                        print('csv file reading finished succesfully.')
                        dataDict = {}

                        employeeCode = data.EmployeeID.tolist()
                        resourceName = data.EmployeeName.tolist()
                        DOB = data.DOB.tolist()
                        Contact = data.Contact.tolist()
                        Gender = data.Gender.tolist()
                        Email = data.Email.tolist()
                        Address = data.Address.tolist()
                        Country = data.CountryID.tolist()
                        State = data.StateID.tolist()
                        District = data.District.tolist()
                        Pincode = data.Pincode.tolist()
                        Education = data.Education.tolist()
                        role_designation = data.RoleID.tolist()
                        print('role_designation >> ',role_designation)
                        Experience = data.Experience.tolist()
                        subject_speciality = data.Subject_SpecialityID.tolist()


                        employeeCode = checkNAN(employeeCode)
                        resourceName = checkNAN(resourceName)
                        dOB = checkNAN(DOB)
                        contact = checkNAN(Contact)
                        gender = checkNAN(Gender)
                        email = checkNAN(Email)
                        address = checkNAN(Address)
                        country = checkNAN(Country)
                        state = checkNAN(State)
                        district = checkNAN(District)
                        pincode = checkNAN(Pincode)
                        education = checkNAN(Education)
                        role_designation = checkNAN(role_designation)
                        print('role_designation >> ',role_designation)
                        experience = checkNAN(Experience)
                        subject_speciality = checkNAN(subject_speciality)
                        

                    
                        for i in range(len(employeeCode)):
                            if(employeeCode[i] != 'NA'):
                                resourceDataDict = {}
                                resourceDataDict['employeeCode'] = str(employeeCode[i])
                                resourceDataDict['resourceName'] = str(resourceName[i])
                                resourceDataDict['department'] = [int(digit) for digit in str(role_designation[i])]
                                resourceDataDict['subject_speciality'] = int(subject_speciality[i])
                                resourceDataDict['contact'] = str(contact[i])
                                resourceDataDict['email'] = str(email[i])
                                resourceDataDict['dob'] = str(dOB[i])
                                resourceDataDict['gender'] = str(gender[i])
                                resourceDataDict['education'] = str(education[i])
                                resourceDataDict['experience'] = str(experience[i])

                                resourceDataDict['country'] = country[i]
                                resourceDataDict['state'] = state[i]
                                resourceDataDict['address'] = str(address[i])
                                resourceDataDict['district'] = str(district[i])
                                resourceDataDict['pincode'] = str(pincode[i])
                        
                                # print('================================')
                                # print('resource csv data list >>',i,' :>> ',resourceDataDict)
                                # print('================================')
                            
                                apiAddResourceDetails = postMethod(
                                request = request,
                                method='POST',
                                task = 'ADDRESOURCEDETAILS',
                                pathInfo=addResource_URL.strip(),
                                dataList = resourceDataDict
                                )

                                res = apiAddResourceDetails
                                response_code = res.status_code
                                print('==========================================')
                                print(response_code)
                                print('\n',res.text)
                                print('==========================================')
                        # exit()
                        return redirect('resource_list')
                except:
                    return render(request,'Admin/resource-management/upload-excel-resource.html',{'username':username,'message':'Invalid headers. Please Correct the Headers and try again!','authority':dictionary})
        else:
            return HttpResponse('unauthorized access')

            # except:
            #     return render(request,'Admin/resource-management/upload-excel-resource.html',{'username':username,'message':'Invalid headers. Please Correct the Headers and try again!'})

    else:
        return redirect('login')


def checkNAN(prevList):
    newList = []
    for i in range(len(prevList)):
        if type(prevList[i]) == float:
            newList.append('NA')
        else:
            newList.append(prevList[i])
    return newList
# =========================================================================================================================================================================
# =========================================================================================================================================================================
def delete_resource(request,id):
    if request.session.has_key('auth_token'):
        apideleteResource = getMethod(
            request=request,
                method="DELETE",
                task = 'DELETESPECIFICRESOURCE',
                pathInfo=deleteResource_URL+str(id)+'/'.strip(),
                ) 
        data = apideleteResource.text
        return redirect(resource_list)
    else:
        return redirect('login')

# ===================================================================================================================================================================
#                                                          SEARCH & PAGINATION FOR STUDENT LIST (with querystring or page number)
# ===================================================================================================================================================================
def resourceSearch(request):
    if request.session.has_key('auth_token'):
        username = request.session['auth_username']
        resourceSearchString = request.GET['search_String']
        page = request.GET['page']
        apiSearchResourceDetails = getMethod(
                request=request,
                method='GET',
                task = 'SEARCHRESOURCE',
                pathInfo=searchResources_URl+'?q='+str(resourceSearchString)+'&page='+str(page).strip(),
                )
        data = json.loads(apiSearchResourceDetails.text)
        return JsonResponse({'searchResultList': data})
    else:
        return redirect('login')

#=====================================================================================================================================================================
#                                                   VALIDATE USER AVAILABILTY TO STORE STUDENT DATA
#=====================================================================================================================================================================
def validateResourceUserAvailability(request):
    if request.session.has_key('auth_token'):
        username = request.session['auth_username']
        if request.method == 'GET':
            check = request.GET['check']
            validateString = request.GET['valiadteString']
            print('check value : ',check)
            print('validation string : ',validateString)
            type_validation = ''
            if(check == 'EmployeeCode'):
                type_validation = 'UsernameVal'
            if(check == 'emailID'):
                type_validation = 'EmailVal'
            if(check == 'mobileNumber'):
                type_validation = 'ContactVal'
            print('-------------------------------------------------------------------')
            apiGetSubjectList = getMethod(
                request=request,
                method='GET',
                task = 'CHECKRESOURCEDATA',
                pathInfo=checkExistDataResource_URL+'?q='+str(validateString)+'&type_validation='+str(type_validation),
                )
            data = json.loads(apiGetSubjectList.text)
            print(data)
        return JsonResponse({'resultData': data['data']})
    else:
        return redirect('login')