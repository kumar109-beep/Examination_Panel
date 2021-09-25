from django.shortcuts import render,redirect
from django.http import JsonResponse, HttpResponse, HttpResponseRedirect
from .Helper.postMethod import *
from .Helper.getMethod import *
from .Helper.globalURL import *
import json
from .Helper.getAuthorityList import *
from Slate_O.validateKey import checkKey
from .headerNotification import headerNotification


def edit_profile(request):
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
            tokenKey = request.session['auth_token']
            admin_id = request.session['id']
            refID = request.session['refID']
            apiSpecificAdmin = getMethod(
                        request=request,
                        method='GET',
                        task = 'GETSPECIFICADMIN',
                        pathInfo=getSpecificAdmin_URl+str(admin_id)+'/'.strip(),
                        )
            data = json.loads(apiSpecificAdmin.text)
            print('data >> ',data)
            # data=data[0]
            # data >>  {'id': 1, 'name': 'Administrator', 'birth_date': '1988-12-17', 'gender': 'Male', 'mobile_number': '9793202026', 'city': 'Lucknow', 'pincode': '563256', 'address': 'Gomti nagar', 'images': '/Upload_Images/adminImages/Capture2.PNG', 'signature': '/Upload_Images/adminSignature/Capture.PNG', 'refrence_user': {'id': 3, 'password': 'pbkdf2_sha256$216000$FaTj1Zyukjfu$K3xBOB9Eb/9dZ9fLN/bhUp6XHkmsw1t7vpJk7jtz9Dk=', 'last_login': '2021-05-17T12:12:09.080969Z', 'is_superuser': False, 'username': 'admin_web', 'first_name': '', 'last_name': '', 'email': 'admin@gmail.com', 'is_staff': False, 'is_active': True, 'date_joined': '2021-05-16T16:40:52Z', 'groups': [], 'user_permissions': []}, 'country': None, 'state': None}
            gender = data['gender']

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
            return render(request,'Admin/profile-management/edit-profile.html',{'dataLength':length,'data':requestHeadingData['data'],'stateData':stateData,'countryData':countryData,'username':username,'tokenKey':tokenKey,'admin_id':admin_id,'admin_data':data,'refID':refID,'gender':gender,'authority':dictionary})
        else:
            return render(request,'403.html') 
    else:
        return redirect('login')

# ===================================================================================================================================================================
#                                                          SEARCH & PAGINATION FOR COURSE TYPE LIST (with querystring or page number)
# ===================================================================================================================================================================
def adminprofileDataSearch(request):
    if request.session.has_key('auth_token'):
        username = request.session['auth_username']
        if request.method == 'GET':
            check = request.GET['check']
            validateString = request.GET['valiadteString']
            print('check value : ',check)
            print('validation string : ',validateString)
            type_validation = ''
            if(check == 'emailID'):
                type_validation = 'EmailVal'
            if(check == 'mobileNumber'):
                type_validation = 'ContactVal'
            print('-------------------------------------------------------------------')
            apiGetSubjectList = getMethod(
                request=request,
                method='GET',
                task = 'CHECKADMINPROFILEDATA',
                pathInfo=checkExistDataAdminProfile_URL+'?q='+str(validateString)+'&type_validation='+str(type_validation),
                )
            data = json.loads(apiGetSubjectList.text)
            print(data['data'])
        return JsonResponse({'resultData': data['data']})
    else:
        return redirect('login')




def updateUserPassword(request):
    if request.session.has_key('auth_token'):
        username = request.session['auth_username']
        tokenKey = request.session['auth_token']
        if request.method == 'POST':
            old_password = request.POST['old_password']
            new_password = request.POST['new_password']

            print('old_password string : ',old_password)
            print('new_password string : ',new_password)

            dataDict = {}
            dataDict['old_password'] = old_password
            dataDict['new_password'] = new_password

            apiUpdatepassword = postMethod(
                request=request,
                method='PUT',
                task = 'UPDATEUSERPASSWORD',
                pathInfo=updatePasswordAdmin_URl.strip(),
                dataList = dataDict
                )
            data = json.loads(apiUpdatepassword.text)
            print('response data >> ',data)
        return JsonResponse({'resultData': data})
    else:
        return redirect('login')