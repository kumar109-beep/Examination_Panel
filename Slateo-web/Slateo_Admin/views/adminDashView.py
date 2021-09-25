from django.shortcuts import render, redirect
from .Helper.getMethod import *
from .Helper.postMethod import *
from .Helper.globalURL import *
from .Helper.getAuthorityList import *
import json,datetime
from django.http import JsonResponse
from .headerNotification import headerNotification

# Create your views here.
# =========================================================================================================================================================================
#                                                                   ADMIN DASHBOARD
# =========================================================================================================================================================================
def home(request):
    if request.session.has_key('auth_token'):
        username = request.session['auth_username']
        tokenKey = request.session['auth_token']
        response = headerNotification(request)
        length = response[0]
        requestHeadingData = response[1]
        admin_data = response[2]
        apiExamList = getMethod(
                request=request,
                method='GET',
                task = 'GETEXAMLIST',
                pathInfo=getExamList_URL.strip(),
                )
        examList = json.loads(apiExamList.text)
        print('exam list data >>>',examList)
        # exit()
        flag = 0
        if(len(examList['data']) > 0):
            flag = 1

        if "detail" in examList:
            del request.session['auth_token']
            return redirect('login')
        for i in examList['data']:
            startDate = datetime.datetime.strptime(i['examStartDate'],'%m/%d/%Y').strftime('%d %b')
            endDate = datetime.datetime.strptime(i['examEndDate'],'%m/%d/%Y').strftime('%d %b')

            i['startDate'] = startDate
            i['endDate'] = endDate
        try:
            authority = request.session['authority']
            dictionary = get_authority_list(authority,'resource_login')
        except:
            authority = []
            dictionary = get_authority_list(authority,'admin_login')
        return render(request,'Admin/dashboard/dashboard.html',{'admin_data':admin_data,'dataLength':length,'data':requestHeadingData['data'],'flag':flag,'username':username,'tokenKey':tokenKey,'examList':examList['data'],'authority':dictionary})
    else:
        return redirect('login')


def updateNotificationStatus(request):
    if request.session.has_key('auth_token'):
        requestID = request.GET['requestID']
        authorName = request.GET['authorName']
        request_view_status = request.GET['request_view_status']
        notifyID = request.GET['notifyID']
        data = {}
        data['requestID'] = requestID.strip()
        data['authorName'] = authorName.strip()
        data['request_view_status'] = request_view_status.strip()
        apiRequestHeadingDetails = postMethod(
            request=request,
            method='PUT',
            task = 'UPADTEREQUESTHEADING',
            pathInfo=updaterquestHeading_URL.strip() + str(notifyID) + '/' ,
            dataList = data
            )
        requestHeadingData = json.loads(apiRequestHeadingDetails.text)
        return JsonResponse({'searchResultList': "Done"})
    else:
        return redirect('login')


def resource_Dashboard(request):
    if request.session.has_key('auth_token'):
        try:
            authority = request.session['authority']
            dictionary = get_authority_list(authority,'resource_login')
        except:
            authority = []
            dictionary = get_authority_list(authority,'admin_login')
        username = request.session['auth_username']
        tokenKey = request.session['auth_token']
        refID = request.session['refID']
        response = headerNotification(request)
        length = response[0]
        requestHeadingData = response[1]
        return render(request,'Admin/dashboard/resourceDash.html',{'dataLength':length,'data':requestHeadingData['data'],'username':username,'tokenKey':tokenKey,'refID':refID,'authority':dictionary})

    else:
        return redirect('login')
