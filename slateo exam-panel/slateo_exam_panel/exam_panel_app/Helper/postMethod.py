import requests,json
from .getAuthTokenKey import *


def postMethod(request='',method='',task = '',pathInfo='',userName = '', userEmail = '',userPassword = '',dataList = []):
    tokenKey = getAuthToken(request)
    print('tokenKey >>> ',tokenKey)
    # ==================================    STUDENT LOGIN MODULE  ======================================================
    # ==================================================================================================================
    if task == 'LOGIN':
        payload= {
                'username': dataList['userName'],
                'password': dataList['password'],
                'isStudent': dataList['isStudent'],
                }
        payload = json.dumps(payload)
        headers = {
            'Authorization': tokenKey,
        'Content-Type': 'application/json'
        }
        url = pathInfo
        print('url >>> ',url)
        print('headers >>> ',headers)
        print('payload >>> ',payload)
        return requests.request(method, url, headers=headers, data=payload)
    

    elif task == 'SIGNIN':
        payload="{\r\n    \"username\": \" " + userName + "\",\r\n    \"email\": \" "\
        + userEmail + "\",\r\n    \"password\": \"" + userPassword  + "\"\r\n}"
        headers = {
            'Authorization': tokenKey,
        'Content-Type': 'application/json'
        }
        url = pathInfo
        response = requests.request(method, url, headers=headers, data=payload)
    elif task == 'RESETPASSWORD':
        payload="{\r\n    \"email\":\""+userEmail+"\"\r\n}"
        headers = {
            'Authorization': tokenKey,
        'Content-Type': 'application/json'
        }
        url = pathInfo
        response = requests.request(method, url, headers=headers, data=payload)
    # ==================================================================================================================
    # ==================================================================================================================
    # return response

    