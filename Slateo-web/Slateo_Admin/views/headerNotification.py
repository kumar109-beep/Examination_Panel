from django.shortcuts import render,redirect
from django.http import JsonResponse,HttpResponse

from .Helper.getAuthorityList import *
from Slate_O.validateKey import checkKey

# from .Helper.postMethod import *
from .Helper.getMethod import *
import json,datetime
from .Helper.globalURL import *


def headerNotification(request):
    print('reques params >> ',request)
    apiRequestHeadingDetails = getMethod(
        request=request,
        method='GET',
        task = 'REQUESTHEADING',
        pathInfo=getrequestHeading_URL.strip(),
        )
    requestHeadingData = json.loads(apiRequestHeadingDetails.text)
    # print('requestHeadingData >>>>>> ',requestHeadingData)
    if len(requestHeadingData['data']) >0:
        for i in range(len(requestHeadingData['data'])):
            timeStamp = requestHeadingData['data'][i]['request_time'].split('T')
            Date = datetime.datetime.strptime(timeStamp[0],'%Y-%m-%d').strftime('%d %b')
            requestHeadingData['data'][i]['date'] = Date
            time = timeStamp[1].split(':')
            requestHeadingData['data'][i]['time'] = time[0]+':'+time[1]


    length = len(requestHeadingData['data'])
    # print('hello world i am notification system!')

    admin_id = request.session['id']
    refID = request.session['refID']
    print('admin_id >>> ',admin_id)
    # print('refID >>> ',refID)

    apiSpecificAdmin = getMethod(
                request=request,
                method='GET',
                task = 'GETSPECIFICADMIN',
                pathInfo=getSpecificAdmin_URl+str(admin_id)+'/'.strip(),
                )
    # print('apiSpecificAdmin.text >>>> ',apiSpecificAdmin.text)
    admin_dataList = []
    try:
        admin_data = json.loads(apiSpecificAdmin.text)
        print('admin_data >>>> ',admin_data)
        return length,requestHeadingData,admin_data

    except:
        resourceName = request.session['resourceName']
        # admin_dataList.append(resourceName)
        # admin_dataList.append(resourceName)
        # admin_dataList.append(resourceName)
        # admin_dataList.append(resourceName)

        print('resourceName >>>> ',resourceName)
        return length,requestHeadingData,resourceName



    # exit()