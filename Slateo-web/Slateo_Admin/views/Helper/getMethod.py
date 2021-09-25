
import requests
from .getAuthTokenKey import *

def getMethod(request='', method='',task = '',pathInfo=''):
    tokenKey = getAuthToken(request)

    if task == 'STUDENTLIST':
        payload = {}
    if task == 'GET_ALL_Language_List':
        payload = {}
    elif task == 'STUDENTDETAIL':
        print('This is the path for studentDetails :>> ',pathInfo)
        payload={}
    elif task == 'GETSTUDENTDETAIL':
        payload={}
    elif task == 'GETBATCHLIST':
        payload={}
    elif task == 'GETSPECIFICBATCH':
        payload={}
    elif task == 'DELETESPECIFICBATCH':
        payload={}
    elif task == 'GETGROUPLIST':
        payload={}
    elif task == 'DELETESPECIFICGROUP':
        payload={}
    elif task == 'GETSPECIFICGROUP':
        payload={}
    elif task == 'GETCLUSTERLIST':
        payload={}
    elif task == 'GETSPECIFICCLUSTER':
        payload={}
    elif task == 'DELETESPECIFICCLUSTER':
        payload={}
    elif task == 'GETPAPERLIST':
        payload={}
    elif task == 'GETSPECIFICPAPER':
        payload={}
    elif task == 'DELETESPECIFICPAPER':
        payload={}
    elif task == 'GETAUTHORITYLIST':
        payload={}
    elif task == 'GETSPECIFICAUTHORITY':
        payload={}
    elif task == 'DELETESPECIFICAUTHORITY':
        payload={}
    elif task == 'GETROLELIST':
        payload={}
    elif task == 'GETSPECIFICROLE':
        payload={}
    elif task == 'GETRESOURCELIST':
        payload={}
    elif task == 'RESOURCEDETAIL':
        payload={}
    elif task == 'DELETESPECIFICRESOURCE':
        payload={}
    elif task == 'GETASSIGNEDAUTHORITY':
        payload={}
    elif task == 'GETAUTHORITYLIST':
        payload={}
    elif task == 'GETASSIGNAUTHORITY':
        payload={}
    elif task == 'GETCOURSELIST':
        payload={}
    elif task == 'DELETESPECIFICCOURSE':
        payload={}
    elif task == 'GETSUBJECTLIST':
        payload={}
    elif task == 'GETCOURSETYPELIST':
        payload={}
    elif task == 'GETCOURSESUBJECTLIST':
        payload={}
    elif task == 'GETCOURSE':
        payload={}
    elif task == 'GETSPECIFICCOURSETYPE':
        payload={}
    elif task == 'GETSUBJECTACCORDINGTOCOURSE':
        payload={}
    elif task == 'GETSPECIFICSUBJECTTOCOURSE':
        payload={}
    elif task == 'GET_PAPER_ACCORDING_TO_COURSE':
        payload={}
    elif task == 'GETSUBJECTTOCOURSELIST':
        payload={}
    elif task == 'GETTOPICLIST':
        payload={}
    elif task == 'SEARCHSTUDENT':
        payload={}
    elif task == 'GETSUBJECTLISTFROMSELECTEDCOURSE':
        payload={}
    elif task == 'GETALLQUESTIONLIST':
        payload={}
    elif task == 'GETSPECIFICQUESTION':
        payload={}
    elif task == 'GETFILTEREDDATA':
        payload={}
    elif task == 'GETSPECIFICADMIN':
        payload={}
    elif task == 'GETQUESTIONLIST':
        payload={}
    elif task == 'GETPAPERLIST':
        payload = {}
    elif task == 'GETEXAMLIST':
        payload = {}
    elif task == 'GETSPECIFICEXAM':
        payload = {}
    elif task == 'GETSPECIFICPAPER':
        payload = {}
    elif task == 'GETPAPERLIST':
        payload = {}
    elif task == 'SEARCHRESOURCE':
        payload = {}
    elif task == 'GETCOURSETYPELIST':
        payload = {}
    elif task == 'SEARCHROLE':
        payload = {}
    elif task == 'SEARCHQUESTION':
        payload = {}
    elif task == 'SEARCHEXAM':
        payload = {}
    elif task == 'GETLANGUAGES':
        payload = {}
    elif task == 'GETCOUNTRY':
        payload = {}
    elif task == 'GETSTATE':
        payload = {}
    elif task == 'GETSPECIFICCOURSE':
        payload = {}
    elif task == 'GETSPECIFICSUBJECT':
        payload = {}
    elif task == 'SEARCHCOURSETYPE':
        payload = {}
    elif task == 'SEARCHSUBJECT':
        payload = {}
    elif task == 'SEARCHCOURSE':
        payload = {}
    elif task == 'SEARCHSUBJECTTOCOURSE':
        payload = {}
    elif task == 'CHECKSTUDENTDATA':
        payload = {}
    elif task == 'CHECKRESOURCEDATA':
        payload = {}
    elif task == 'CHECKADMINPROFILEDATA':
        payload = {}
    elif task == 'DELETECOURSETYPE':
        payload = {}
    elif task == 'DELETECOURSE':
        payload = {}
    elif task == 'DELETESUBJECT':
        payload = {}
    elif task == 'DELETESUBJECTTOCOURSE':
        payload = {}
    elif task == 'DELETESPECIFIROLE':
        payload = {}
    elif task == 'REQUESTHEADING':
        payload = {}
    elif task == 'COMPLETEDEXAMS':
        payload = {}
    elif task == 'GETSELECTEDRESOURCES':
        payload = {}
    elif task == 'VIEWSINGLEQUESTION':
        payload = {}
    elif task == 'MARKALLASREAD':
        payload = {}
    elif task == 'PAGINATENOTIFICATION':
        payload = {}
    elif task == 'FILTEREXAM':
        payload = {}
    elif task == 'CHECKEXISTENCE':
        payload = {}
    ##########################################################################################
    headers = {
            'Authorization': tokenKey,
        # 'Content-Type': 'application/json'
        }
    url = pathInfo
    print('api url info :------>> ',url)
    response = requests.request(method, url, headers=headers, data=payload)
    return response






