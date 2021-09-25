from django.shortcuts import render,redirect
from django.http import JsonResponse,HttpResponse

from .Helper.getAuthorityList import *
from Slate_O.validateKey import checkKey

# from .Helper.postMethod import *
from .Helper.getMethod import *
import json,datetime
from .Helper.globalURL import *

from .headerNotification import headerNotification

# ================================== request heading ==========================

def request_heading_detail(request):
    if request.session.has_key('auth_token'):
        try:
            authority = request.session['authority']
            dictionary = get_authority_list(authority,'resource_login')
        except:
            authority = []
            dictionary = get_authority_list(authority,'request_heading')
        status = checkKey(dictionary,'profile_management')
        if(status == 'True' or len(authority) == 0):
            username = request.session['auth_username']
            tokenKey = request.session['auth_token']
            response = headerNotification(request)
            length = response[0]
            # requestHeadingData = response[1]
            admin_data = response[2]
            # exit()
            apiRequestHeadingDetails = getMethod(
                request=request,
                method='GET',
                task = 'REQUESTHEADING',
                pathInfo=request_heading_all_URL.strip(),
                )
            requestHeadingData = json.loads(apiRequestHeadingDetails.text)
            print('requestHeadingData >>>>>> ',requestHeadingData)
            # exit()
            if len(requestHeadingData['data']) >0:
                for i in range(len(requestHeadingData['data'])):
                    timeStamp = requestHeadingData['data'][i]['request_time'].split('T')
                    Date = datetime.datetime.strptime(timeStamp[0],'%Y-%m-%d').strftime('%d %b')
                    requestHeadingData['data'][i]['date'] = Date
                    time = timeStamp[1].split(':')
                    requestHeadingData['data'][i]['time'] = time[0]+':'+time[1]


            # length = len(requestHeadingData['data'])
            return render(request,'Admin/request-heading/request_heading_detail.html',{'admin_data':admin_data,'dataLength':length,'data':requestHeadingData['data'],'username':username,'tokenKey':tokenKey,'authority':dictionary})
        else:
            return render(request,'403.html') 
    else:
        return redirect('login')



def markAllAsRead(request):
    if request.method == 'GET':
        apiMarkAllAsRead = getMethod(
            request=request,
            method='PUT',
            task = 'MARKALLASREAD',
            pathInfo=markAllAsRead_URL.strip(),
            )
        markAllAsReadResponse = json.loads(apiMarkAllAsRead.text)
        return JsonResponse({'api_result': markAllAsReadResponse})



def notificationPagination(request):
    if request.session.has_key('auth_token'):
        username = request.session['auth_username']
        page = request.GET['page']

        print('pgno : ',page)
        apiNotificationPaginationDetails = getMethod(
                request=request,
                method='GET',
                task = 'PAGINATENOTIFICATION',
                pathInfo=request_heading_all_URL+'?page='+str(page).strip(),
                )
        data = json.loads(apiNotificationPaginationDetails.text)
        if('data' in data):
            print('key exist!')
            if len(data['data']) >0:
                for i in range(len(data['data'])):
                    timeStamp = data['data'][i]['request_time'].split('T')
                    Date = datetime.datetime.strptime(timeStamp[0],'%Y-%m-%d').strftime('%d %b')
                    data['data'][i]['date'] = Date
                    time = timeStamp[1].split(':')
                    data['data'][i]['time'] = time[0]+':'+time[1]

        return JsonResponse({'searchResultList': data})
    else:
        return redirect('login')


def deleteAllNotifications(request):
    apiremoveAllAsRead = getMethod(
            request=request,
            method='DELETE',
            task = 'MARKALLASREAD',
            pathInfo=remove_all_notification_URL.strip(),
            )
    markAllAsReadResponse = json.loads(apiremoveAllAsRead.text)
    return JsonResponse({'api_result': markAllAsReadResponse})



def deleteNotifications(request,id):
    apiremoveAllAsRead = getMethod(
            request=request,
            method='DELETE',
            task = 'MARKALLASREAD',
            pathInfo=remove_specific_notification_URL+str(id)+'/'.strip(),
            )
    markAllAsReadResponse = json.loads(apiremoveAllAsRead.text)
    return JsonResponse({'api_result': markAllAsReadResponse})