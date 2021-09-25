from django.shortcuts import render,redirect
from .Helper.postMethod import *
from .Helper.getMethod import *
import json
from .Helper.globalURL import *
from .Helper.customDecorator import *
from django.http import HttpResponse,JsonResponse

# Custom Import 
# from .Helper.getMethod import *
from .Helper.postMethod import *
import json

# Create your views here.

def loginPanel(request):
    if request.method == 'POST':
        username = request.POST.getlist('student_username')
        userpassword = request.POST.getlist('student_password')

        print(username)
        print(userpassword)

        dataDict = {}
        dataDict['userName'] = username[0].strip()
        dataDict['password'] = userpassword[0].strip()
        dataDict['isStudent'] = 'yes'



        apiLogin = postMethod(
            request=request,
            method='POST',
            task = 'LOGIN',
            pathInfo=studentLogin_URL.strip(),
            dataList = dataDict
             )

        res = json.loads(apiLogin.text)
        print('>>>>>>>>>>>>>>>>>>>',res)
        request.session['studentData'] = str(apiLogin.text)
        # {'data': {}, 'status': False, 'message': 'Provide Correct Username or Password'}
        if res['message'] == 'Provide Correct Username or Password':
            msg = '- Invalid Username Or Password -'
            return render(request,'Student-Exam-Panel/index.html',{'msg':msg})
        else:        
            request.session['auth_token'] = res['token'].strip()
            request.session['auth_username'] = username[0].strip()
            request.session['id'] = res['data']['id']
            try:
                request.session['refID'] = res['data']['refrence_user']['id']
            except:
                request.session['refID'] = res['data']['referUser']['id']
                fullName = res['data']['fullName']
                request.session['resourceName'] = fullName.replace('-',' ')

                # authorityLists = eval(res['data']['role_designation'][0]['assign_authority'])
                # print('authorityLists >>>> ',authorityLists)
                authorityList = []
                try:
                    mylist = sorted(set(authorityList))
                    request.session['authority'] = mylist
                    print('authorityList >>>> ',mylist,'\nSessoin created')
                except:
                    pass
            return redirect('dashboard')
        
    else:
        if request.session.has_key('auth_token'):
            return redirect('dashboard')
        else:
            return render(request,'Student-Exam-Panel/index.html')



def dashboard(request):
    if request.method == 'GET':
        if request.session.has_key('auth_token'):
            studentData = request.session['studentData']
            res = json.loads(studentData)
            print('studentData >> ',res)
            # ==================================================
            #      Student Wise Paper API Call
            studentId = res['data']['id']
            print('studentId >>> ',studentId)
            # # --------------------------------------------------
            apiPaperList = getMethod(
                request=request,
                method='GET',
                task = 'GETPAPERLIST',
                pathInfo=studentWisePaper_URL+str(studentId)+'/'.strip(),
                )
            paperData = json.loads(apiPaperList.text)
            print('this is authority : >> ',paperData,type(paperData))      
            # --------------------------------------------------
            if(len(paperData['data']) == 0):
                print('sessionVal >>> Blank Paper Dictionary')
                request.session['blankPaperDict'] = 'Blank Paper Dictionary'
            else:
                print('sessionVal >>> Not Blank Paper Dictionary')
                request.session['blankPaperDict'] = 'Not Blank Paper Dictionary'
            # ==================================================
            fullName = res['data']['fullName']
            studentName = fullName.replace('-',' ')
            return render(request,'Student-Exam-Panel/dashboard.html',{'studentName':studentName,'studentData':res['data'],'paperData':paperData})
        else:
            return redirect('/')
        

# 

def instructions(request):
    if request.method == 'GET':
        if request.session.has_key('auth_token'):
            id=True
            if id:
                # -------------------------------------------------------------------------
                # -------------------------------------------------------------------------
                apiPaperData = getMethod(
                    request=request,
                    method='GET',
                    task = 'GETPAPERLIST',
                    pathInfo=specificPaper_URL+str(26)+'/'.strip(),
                    )
                paperData = json.loads(apiPaperData.text)
                print('this is paper data : >> ',paperData,type(paperData))              
                # -------------------------------------------------------------------------
                apiSubjectData = getMethod(
                    request=request,
                    method='GET',
                    task = 'GETPAPERLIST',
                    pathInfo=specificSubject_URL+str(paperData['data']['paperAssociateSubject'])+'/'.strip(),
                    )
                subjectData = json.loads(apiSubjectData.text)
                print('this is paper data : >> ',subjectData,type(subjectData))
                # -------------------------------------------------------------------------
                return render(request,'Student-Exam-Panel/instruction.html',{'paperData':paperData['data'],'subjectData':subjectData})
            else:
                return redirect('/')
        else:
            return redirect('/')


def exam(request):
    if request.method == 'GET':
        if request.session.has_key('auth_token'):
            id=True
            print('id >> ',id)
            if id:
                studentData = request.session['studentData']
                res = json.loads(studentData)
                print('studentData >> ',res)
                # -------------------------------------------------------------------------
                # -------------------------------------------------------------------------
                apiPaperData = getMethod(
                    request=request,
                    method='GET',
                    task = 'GETPAPERLIST',
                    pathInfo=specificPaper_URL+str(26)+'/'.strip(),
                    )
                paperData = json.loads(apiPaperData.text)
                print('this is paper data : >> ',paperData,type(paperData))              
                # -------------------------------------------------------------------------
                # [{"Section_1":["637","628"]},{"Section_2":["629","630"]},{"Section_3":["631","632"]},{"Section_4":["634","635"]},{"Section_5":["633","636"]}]
                sectionData = eval(paperData['data']['SectionWiseQuestionList'])
                print('sectional data >> ',sectionData,type(sectionData))
                count = 1
                for i in sectionData:
                    i['count'] = count
                    i['section'] = i['Section_'+str(count)]
                    count = count + 1
                print('sectionData >>> ',sectionData)
                # -------------------------------------------------------------------------
                apiquestionData = getMethod(
                    request=request,
                    method='GET',
                    task = 'GETPAPERLIST',
                    pathInfo=specificQuestion_URL+str(sectionData[0]['Section_1'][0])+'/'.strip(),
                    )
                questionData = json.loads(apiquestionData.text)
                print('this is paper data : >> ',eval(questionData['optionList'])[1],type(eval(questionData['optionList']))) 

                # -------------------------------------------------------------------------
                # -------------------------------------------------------------------------
                apiSubjectData = getMethod(
                    request=request,
                    method='GET',
                    task = 'GETPAPERLIST',
                    pathInfo=specificSubject_URL+str(paperData['data']['paperAssociateSubject'])+'/'.strip(),
                    )
                subjectData = json.loads(apiSubjectData.text)
                print('this is paper data : >> ',subjectData,type(subjectData))
                # -------------------------------------------------------------------------
                # return redirect('/')
                return render(request,'Student-Exam-Panel/exam.html',{'paperData':paperData['data'],'studentData':res['data'],'sectionData':sectionData,'optionList':eval(questionData['optionList'])[1],'questionData':questionData,'subjectData':subjectData})
            else:
                return redirect('/')
        else:
            return redirect('/')




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
                del request.session['blankPaperDict']

        except KeyError:
            return redirect('/')
        return redirect('/')


# # =========================================================================================================================================================================
#                                                                    # get specific question data
# # =========================================================================================================================================================================
def getQuestion(request):
    if request.method == 'GET':
        questionId = request.GET['questionID']
        print('questionId >>> ',questionId)
        apiPaperData = getMethod(
                request=request,
                method='GET',
                task = 'GETPAPERLIST',
                pathInfo=specificQuestion_URL+str(questionId)+'/'.strip(),
                )
        paperData = json.loads(apiPaperData.text)
        print('this is paper data : >> ',paperData,type(paperData))       
        return JsonResponse({'questionAPI_Response':paperData})
