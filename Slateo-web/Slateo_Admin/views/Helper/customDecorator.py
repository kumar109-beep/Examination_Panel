import urllib.request
def connect(host='http://google.com'):
    try:
        urllib.request.urlopen(host) #Python 3.x
        return True
    except:
        return False

def checkInternet(func):
    def function_wrapper():
        flag = connect()
        func(flag)
    return function_wrapper


        
