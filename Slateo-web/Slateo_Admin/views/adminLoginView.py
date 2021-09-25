from django.shortcuts import render,redirect
from .Helper.postMethod import *
import json
from .Helper.globalURL import *
from .Helper.customDecorator import *
from django.http import HttpResponse

# Custom Import 
from .Helper.getMethod import *
from .Helper.globalURL import *
import json

# =========================================================================================================================================================================
#                                                                   LOGIN FUNCTION
# =========================================================================================================================================================================
def login(request):
    if request.method == 'POST':
        username = request.POST.getlist('username')
        userpassword = request.POST.getlist('userpassword')
        apiLogin = postMethod(
            request=request,
            method='POST',
            task = 'LOGIN',
            pathInfo=login_URL.strip(),
            userName = username[0].strip(),
            userPassword = userpassword[0].strip()
             )
        res = json.loads(apiLogin.text)
        print('>>>>>>>>>>>>>>>>>>>',res)
        if 'non_field_errors' in res.keys():
            msg = 'Incorrect Username Or Password'
            return render(request,'Admin/login/login.html',{'msg':msg})
        else:        
            request.session['auth_token'] = res['token'].strip()
            request.session['auth_username'] = username[0].strip()
            request.session['id'] = res['user']['id']
            try:
                request.session['refID'] = res['user']['refrence_user']['id']
            except:
                request.session['refID'] = res['user']['referUser']['id']
                request.session['resourceName'] = res['user']['fullName']

                authorityLists = eval(res['user']['role_designation'][0]['assign_authority'])
                print('authorityLists >>>> ',authorityLists)
                authorityList = authorityLists
                try:
                    mylist = sorted(set(authorityList))
                    request.session['authority'] = mylist
                    print('authorityList >>>> ',mylist,'\nSessoin created')
                except:
                    pass
            return redirect('home')
    else:
        if request.session.has_key('auth_token'):
            return redirect('home')
        else:
            return render(request,'Admin/login/login.html')

# =========================================================================================================================================================================
#                                                                   LOGOUT FUNCTION
# =========================================================================================================================================================================
def logout(request):
    if request.method == 'GET':
        try:
            if request.session.has_key('auth_token'):
                del request.session['auth_token']
                del request.session['auth_username']
                del request.session['authority']
                del request.session['id']
                del request.session['refID']
        except KeyError:
            return redirect('login')
        return redirect('login')

# =========================================================================================================================================================================
#                                                                   REGISTER NEW USER FUNCTION
# =========================================================================================================================================================================
def register(request):
    if request.method == 'POST':
        username = request.POST.getlist('username')
        userEmail = request.POST.getlist('userEmail')
        userPassword = request.POST.getlist('userPassword')
        apiSign = postMethod(
            request=request,
            method='POST',
            task = 'SIGNIN',
            pathInfo=signup_URL.strip(),
            userName = username[0].strip(),
            userEmail = userEmail[0].strip(),
            userPassword = userPassword[0].strip()
             )
        res = eval(apiSign.text)
        if 'username' in res.keys():
            msg = 'User Name Already Exist'
            return render(request,'Admin/login/register.html',{'msg':msg})
        else:
            return redirect('login')
    else:
        if request.session.has_key('auth_token'):
            return redirect('home')
        else:
            return render(request,'Admin/login/register.html')

# =========================================================================================================================================================================
#                                                                   RECOVER PASSWORD FUNCTION
# =========================================================================================================================================================================
def recover_password(request):
    if request.session.has_key('auth_token'):
        return redirect('home')
    else:
        if request.method == 'POST':
            userEmail = request.POST.getlist('username')
            apiResetPassword = postMethod(
                request=request,
            method='POST',
            task = 'RESETPASSWORD',
            pathInfo=resetPassword_URL.strip(),
            userEmail = userEmail[0].strip(),
             )
            res = eval(apiResetPassword.text)
            if 'email' in res.keys():
                msg = 'Enter Existing OR Valid Email'
                return render(request,'Admin/login/recover-password.html',{'msg':msg})
            else:
                msg = 'Check Your Mail To Reset'
                return render(request,'Admin/login/mailConfirmation.html',{'msg':msg})
        else:
            return render(request,'Admin/login/recover-password.html')

# =========================================================================================================================================================================
# =========================================================================================================================================================================