
import requests
from .getAuthTokenKey import *

def getMethod(request='', method='',task = '',pathInfo=''):
    tokenKey = getAuthToken(request)

    if task == 'GETPAPERLIST':
        payload = {}
    if task == 'GET_ALL_Language_List':
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






