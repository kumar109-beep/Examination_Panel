from django.shortcuts import render,redirect
from django.http import JsonResponse, HttpResponse, HttpResponseRedirect
from .Helper.postMethod import *
from .Helper.getMethod import *
from .Helper.globalURL import *
import json,datetime

# =============================================================================================================================
#                                                ADD NEW AUTHORITY
# =============================================================================================================================
def add_authority(request):
    if request.session.has_key('auth_token'):
        username = request.session['auth_username']
        if request.method == 'GET':
            return render(request,'Admin/authority-management/add-authority.html',{'username':username})
        elif request.method == 'POST':
            authorityId = request.POST['authorityID'].strip()
            authorityName = request.POST['authorityName'].strip()
            authorityDataDict = {}
            authorityDataDict['authorityID'] = authorityId
            authorityDataDict['authorityName'] = authorityName

            apiCreateAuthority = postMethod(
                request=request,
                method='POST',
                task = 'CREATEAUTHORITY',
                pathInfo=createAuthority_URL.strip(),
                dataList = authorityDataDict
                )

            res = apiCreateAuthority
            response_code = res.status_code
            if(response_code == 201):
                apiRequestHeadingDetails = getMethod(
                request=request,
                method='GET',
                task = 'REQUESTHEADING',
                pathInfo=getrequestHeading_URL.strip(),
                )
                requestHeadingData = json.loads(apiRequestHeadingDetails.text)
                print('requestHeadingData >>>>>> ',requestHeadingData)
                for i in range(len(requestHeadingData['data'])):
                    timeStamp = requestHeadingData['data'][i]['request_time'].split('T')
                    Date = datetime.datetime.strptime(timeStamp[0],'%Y-%m-%d').strftime('%d %b')
                    requestHeadingData['data'][i]['date'] = Date
                    time = timeStamp[1].split(':')
                    requestHeadingData['data'][i]['time'] = time[0]+':'+time[1]


                length = len(requestHeadingData['data'])
                return redirect('authority_list')
            else:
                return render(request,'Admin/authority-management/add-authority.html',{'dataLength':length,'data':requestHeadingData['data'],'username':username,'res':res.text,'authorityID':authorityId,'authorityName':authorityName})
    else:
        return redirect('login')


# =============================================================================================================================
#                                                EDIT AUTHORITY
# =============================================================================================================================
def edit_authority(request,id):
    if request.session.has_key('auth_token'):
        if request.method == 'GET':
            username = request.session['auth_username']
            apiAuthoritySpecificDetails = getMethod(
                request=request,
                method='GET',
                task = 'GETSPECIFICAUTHORITY',
                pathInfo=updateSpecificAuthority_URL+str(id)+'/'.strip(),
                )
            data = json.loads(apiAuthoritySpecificDetails.text)     
            print('auth data >> ',data)       
            apiRequestHeadingDetails = getMethod(
                request=request,
                method='GET',
                task = 'REQUESTHEADING',
                pathInfo=getrequestHeading_URL.strip(),
                )
            requestHeadingData = json.loads(apiRequestHeadingDetails.text)
            print('requestHeadingData >>>>>> ',requestHeadingData)
            for i in range(len(requestHeadingData['data'])):
                timeStamp = requestHeadingData['data'][i]['request_time'].split('T')
                Date = datetime.datetime.strptime(timeStamp[0],'%Y-%m-%d').strftime('%d %b')
                requestHeadingData['data'][i]['date'] = Date
                time = timeStamp[1].split(':')
                requestHeadingData['data'][i]['time'] = time[0]+':'+time[1]


            length = len(requestHeadingData['data'])
            return render(request,'Admin/authority-management/edit-authority.html',{'username':username,'data':data})
        elif request.method == 'POST':
            username = request.session['auth_username']
            authorityId = request.POST['authorityID'].strip()
            authorityName = request.POST['authorityName'].strip()

            data = {}
            data['authorityID'] = authorityId
            data['authorityName'] = authorityName

            apiCreateAuthority = postMethod(
                request=request,
                method='PUT',
                task = 'CREATEAUTHORITY',
                pathInfo=updateSpecificAuthority_URL+str(id)+'/'.strip(),
                dataList = data
                )
            res = apiCreateAuthority
            response_code = res.status_code
            if(response_code == 200):
                return redirect('authority_list')
            else:
                apiRequestHeadingDetails = getMethod(
                request=request,
                method='GET',
                task = 'REQUESTHEADING',
                pathInfo=getrequestHeading_URL.strip(),
                )
                requestHeadingData = json.loads(apiRequestHeadingDetails.text)
                print('requestHeadingData >>>>>> ',requestHeadingData)
                for i in range(len(requestHeadingData['data'])):
                    timeStamp = requestHeadingData['data'][i]['request_time'].split('T')
                    Date = datetime.datetime.strptime(timeStamp[0],'%Y-%m-%d').strftime('%d %b')
                    requestHeadingData['data'][i]['date'] = Date
                    time = timeStamp[1].split(':')
                    requestHeadingData['data'][i]['time'] = time[0]+':'+time[1]


                length = len(requestHeadingData['data'])
                return render(request,'Admin/authority-management/edit-authority.html',{'dataLength':length,'data':requestHeadingData['data'],'username':username,'res':res.text,'data':data})
    else:
        return redirect('login')


# =============================================================================================================================
#                                                 AUTHORITY LIST 
# =============================================================================================================================
def authority_list(request):
    if request.session.has_key('auth_token'):
        username = request.session['auth_username']
        tokenKey = request.session['auth_token']
        apiGetAuthorityList = getMethod(
                request=request,
                method='GET',
                task = 'GETAUTHORITYLIST',
                pathInfo=getAuthorityList_URL.strip(),
                )
        data = json.loads(apiGetAuthorityList.text)
        apiGetRoleList = getMethod(
                request=request,
                method='GET',
                task = 'GETROLELIST',
                pathInfo=getRoleList_URL.strip(),
                )
        roleData = json.loads(apiGetRoleList.text)
        apiRequestHeadingDetails = getMethod(
                request=request,
                method='GET',
                task = 'REQUESTHEADING',
                pathInfo=getrequestHeading_URL.strip(),
                )
        requestHeadingData = json.loads(apiRequestHeadingDetails.text)
        print('requestHeadingData >>>>>> ',requestHeadingData)
        for i in range(len(requestHeadingData['data'])):
            timeStamp = requestHeadingData['data'][i]['request_time'].split('T')
            Date = datetime.datetime.strptime(timeStamp[0],'%Y-%m-%d').strftime('%d %b')
            requestHeadingData['data'][i]['date'] = Date
            time = timeStamp[1].split(':')
            requestHeadingData['data'][i]['time'] = time[0]+':'+time[1]


        length = len(requestHeadingData['data'])
        return render(request,'Admin/authority-management/list.html',{'dataLength':length,'data':requestHeadingData['data'],'username':username,'data':data,'roleData':roleData,'tokenKey':tokenKey})
    else:
        return redirect('login')


# =============================================================================================================================
#                                              VIEW AUTHORITY DETAILS
# =============================================================================================================================
def view_authority_detail(request,id):
    if request.session.has_key('auth_token'):
        if request.method == 'GET':
            username = request.session['auth_username']
            apiRequestHeadingDetails = getMethod(
                request=request,
                method='GET',
                task = 'REQUESTHEADING',
                pathInfo=getrequestHeading_URL.strip(),
                )
            requestHeadingData = json.loads(apiRequestHeadingDetails.text)
            print('requestHeadingData >>>>>> ',requestHeadingData)
            for i in range(len(requestHeadingData['data'])):
                timeStamp = requestHeadingData['data'][i]['request_time'].split('T')
                Date = datetime.datetime.strptime(timeStamp[0],'%Y-%m-%d').strftime('%d %b')
                requestHeadingData['data'][i]['date'] = Date
                time = timeStamp[1].split(':')
                requestHeadingData['data'][i]['time'] = time[0]+':'+time[1]


            length = len(requestHeadingData['data'])
            return render(request,'Admin/authority-management/view-detail.html',{'dataLength':length,'data':requestHeadingData['data'],'username':username})
    else:
        return redirect('login')


# =============================================================================================================================
#                                              VIEW AUTHORITY RESOURCES
# =============================================================================================================================
def view_authority_resources(request,id):
    if request.session.has_key('auth_token'):
        username = request.session['auth_username']
        apiRequestHeadingDetails = getMethod(
                request=request,
                method='GET',
                task = 'REQUESTHEADING',
                pathInfo=getrequestHeading_URL.strip(),
                )
        requestHeadingData = json.loads(apiRequestHeadingDetails.text)
        print('requestHeadingData >>>>>> ',requestHeadingData)
        for i in range(len(requestHeadingData['data'])):
            timeStamp = requestHeadingData['data'][i]['request_time'].split('T')
            Date = datetime.datetime.strptime(timeStamp[0],'%Y-%m-%d').strftime('%d %b')
            requestHeadingData['data'][i]['date'] = Date
            time = timeStamp[1].split(':')
            requestHeadingData['data'][i]['time'] = time[0]+':'+time[1]


        length = len(requestHeadingData['data'])
        return render(request,'Admin/authority-management/view-resources.html',{'dataLength':length,'data':requestHeadingData['data'],'username':username})
    else:
        return redirect('login')


# =============================================================================================================================
#                                              DELETE SPECIFIC AUTHORITY
# =============================================================================================================================
def delete_authority(request,id):
    if request.session.has_key('auth_token'):
        username = request.session['auth_username']
        if request.method == 'GET':
            apiPaperSpecificAuthority = getMethod(
                request=request,
                method='DELETE',
                task = 'DELETESPECIFICAUTHORITY',
                pathInfo=deleteAuthority_URL+str(id)+'/'.strip(),
                )
            data = apiPaperSpecificAuthority.text
            return redirect('authority_list')
    else:
        return redirect('login')

# =============================================================================================================================
# =============================================================================================================================
