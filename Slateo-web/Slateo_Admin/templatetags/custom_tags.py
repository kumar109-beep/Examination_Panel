from django import template
from datetime import datetime

register = template.Library()

def modify_name(value):
    for i in value:
        return i

def mdy_to_ymd(d):
    # datetime.strptime(d, "%d/%m/%Y").strftime('%a %b %d %y')
    return datetime.strptime(d, "%m/%d/%Y").strftime('%b %d %y')

def chnageInList(value):
    print('auth value :> ',value,'type >> ',type(value))
    dataList = eval(value)
    return dataList


def convertDATEValidFormat(value):
    value = mdy_to_ymd(value)
    return value

def checkType(value):
    # print('SSS',value, type(value))
    # exit()
    for i in value:
        return i.strip()

    
register.filter('modify_name', modify_name)
register.filter('chnageInList', chnageInList)
register.filter('convertDATEValidFormat', convertDATEValidFormat)
register.filter('checkType', checkType)