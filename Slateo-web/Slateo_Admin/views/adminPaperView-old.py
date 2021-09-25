from django.shortcuts import render,redirect
from django.http import JsonResponse, HttpResponse, HttpResponseRedirect
from .Helper.postMethod import *
from .Helper.getMethod import *
from .Helper.globalURL import *
import json
# =========================================================================================================================================================================
#                                                                   CREATE PAPER : PAGE 01
# =========================================================================================================================================================================
def create_paper(request):
    if request.session.has_key('auth_token'):
        username = request.session['auth_username']
        if request.method == 'GET':
            if request.session.has_key('userUniqueId' and 'userUniqueName' and 'associatedCourse' and 'totalMarks' and 'passingMarks'):
                userUniqueId = request.session['userUniqueId']
                userUniqueName = request.session['userUniqueName']
                associatedCourse = request.session['associatedCourse']
                totalMarks = request.session['totalMarks']
                passingMarks = request.session['passingMarks']
                return render(request,'Admin/paper-management/create-paper.html',{'username':username,'userUniqueId':userUniqueId,'userUniqueName':userUniqueName,'associatedCourse':associatedCourse,'totalMarks':totalMarks,'passingMarks':passingMarks})
            else:
                return render(request,'Admin/paper-management/create-paper.html',{'username':username})
        elif request.method == 'POST':
            userUniqueId = request.POST.get('uniquePaperId')
            userUniqueName = request.POST.get('uniquePaperName')
            associatedCourse = request.POST.get('associatedCourse')
            totalMarks = request.POST.get('totalMarks')
            passingMarks = request.POST.get('passingMarks')
            # Basic Details
            request.session['userUniqueId'] = userUniqueId
            request.session['userUniqueName'] = userUniqueName
            request.session['associatedCourse'] = associatedCourse
            request.session['totalMarks'] = totalMarks
            request.session['passingMarks'] = passingMarks
            return redirect('create_paper_2')
    else:
        return redirect('login')



# =========================================================================================================================================================================
#                                                                   CREATE PAPER : PAGE 02
# =========================================================================================================================================================================
def create_paper_2(request):
    if request.session.has_key('auth_token'):
        username = request.session['auth_username']
        if request.method == 'GET':
            if request.session.has_key('userUniqueId' and 'userUniqueName' and 'associatedCourse' and 'totalMarks' and 'passingMarks' and 'sectionDetails' and 'sectionCount' and 'paperCredit' and 'totalQuestion'):
                sectionDetails = request.session['sectionDetails']
                sectionCount = request.session['sectionCount']
                paperCredit = request.session['paperCredit']
                totalQuestions = request.session['totalQuestion']
                sectionSplitedData = []
                for i in sectionDetails:
                    sectionSplitedData.append(i.split('-'))
                print(sectionSplitedData)
                return render(request,'Admin/paper-management/create-paper-2.html',{'username':username,'sectionDetails':sectionDetails,'sectionCount':sectionCount,'paperCredit':paperCredit,'totalQuestion':totalQuestions})
            else:
                return render(request,'Admin/paper-management/create-paper-2.html',{'username':username})
        elif request.method == 'POST':
            try:
                sectionDetails = request.POST.getlist('sectionDetail[]')
                sectionCount = request.POST['noOfSection']
                paperCredit = request.POST['paperCredit']
                totalQuestion = request.POST['totalQuestions']
                # Paper Sections Details
                request.session['sectionDetails'] = sectionDetails
                request.session['sectionCount'] = sectionCount
                request.session['paperCredit'] = paperCredit
                request.session['totalQuestion'] = totalQuestion
                return HttpResponse('success')
            except:
                return HttpResponse('fail')
    else:
        return redirect('login')


# =========================================================================================================================================================================
#                                                                   CREATE PAPER : PAGE 03
# =========================================================================================================================================================================
def create_paper_3(request):
    if request.session.has_key('auth_token'):
        username = request.session['auth_username']
        if request.method == 'GET':
            if request.session.has_key('sectionDetails' and 'sectionCount' and 'paperCredit' and 'totalQuestion' and 'questionTypeDetail'):
                questionTypeDetail = request.session['questionTypeDetail']
                questionTypeDetailSplitedData = []
                for i in questionTypeDetail:
                    questionTypeDetailSplitedData.append(i.split('-'))      
                return render(request,'Admin/paper-management/create-paper-3.html',{'username':username})
            else:
                return render(request,'Admin/paper-management/create-paper-3.html',{'username':username})
        elif request.method == 'POST':
            try:
                questionTypeDetail = request.POST.getlist('questionTypeDetail[]')
                request.session['questionTypeDetail'] = questionTypeDetail
                return HttpResponse('success')
            except:
                return HttpResponse('fail')
    else:
        return redirect('login')


# =========================================================================================================================================================================
#                                                                   CREATE PAPER : PAGE 04
# =========================================================================================================================================================================
def create_paper_4(request):
    if request.session.has_key('auth_token'):
        username = request.session['auth_username']
        if request.method == 'GET':
            if request.session.has_key('sectionDetails' and 'sectionCount' and 'paperCredit' and 'totalQuestion' and 'questionTypeDetail' and 'setData'):
                setData = request.session['setData']
                setDataSplitedData = []
                for i in setData:
                    setDataSplitedData.append(i.split('-'))      
                return render(request,'Admin/paper-management/create-paper-4.html',{'username':username})
            else:
                return render(request,'Admin/paper-management/create-paper-4.html',{'username':username})

        elif request.method == 'POST':
            try:
                setData = request.POST.getlist('setData[]')
                request.session['setData'] = setData
                return HttpResponse('success')
            except:
                return HttpResponse('fail')
    else:
        return redirect('login')


# =========================================================================================================================================================================
#                                                                   EDIT SPECIFIC PAPER
# =========================================================================================================================================================================
def edit_paper_detail(request,id):
    if request.session.has_key('auth_token'):
        username = request.session['auth_username']
        if request.method == 'GET':
            tokenKey = request.session['auth_token']
            # GET specific paper data
            apiPaperSpecificDetails = getMethod(
                request=request,
                method='GET',
                task = 'GETSPECIFICPAPER',
                pathInfo=updatePaper_URL+str(id)+'/'.strip(),
                )
            data = json.loads(apiPaperSpecificDetails.text)
            setsTypeDetails = data['setsTypeDetails'].split('-')
            res = json.loads(data['questionTypeDetails'])
            str1 = ''
            for i in range(len(res['questionNumer'])):
                str1 += res['questionNumer'][i]
            str2 = str1.replace(',','')
            qData = str2.split('Question ')
            ddata = []
            for i in qData:
                if i not in ddata:
                    ddata.append(i)
            sectionNumbers = res
            
            res['qData'] = ddata[1:]
            res['possibleSets'] = setsTypeDetails[0]
            res['languages'] = setsTypeDetails[1]
            res['allowedOptions'] = setsTypeDetails[2]
            return render(request,'Admin/paper-management/edit-paper.html',{'username':username,'data':data,'res':res,'sectionNumbers':sectionNumbers,'tokenKey':tokenKey})
    else:
        return redirect('login')


# =========================================================================================================================================================================
#                                                                   SHOW ALL PAPER LIST
# =========================================================================================================================================================================
def paper_list(request):
    if request.session.has_key('auth_token'):
        if request.session.has_key('userUniqueId'):
            del request.session['userUniqueId']
        if request.session.has_key('userUniqueName'):
            del request.session['userUniqueName']
        if request.session.has_key('associatedCourse'):
            del request.session['associatedCourse']
        if request.session.has_key('totalMarks'):
            del request.session['totalMarks']
        if request.session.has_key('passingMarks'):
            del request.session['passingMarks']
        if request.session.has_key('sectionCount'):
            del request.session['sectionCount']
        if request.session.has_key('paperCredit'):
            del request.session['paperCredit']
        if request.session.has_key('totalQuestion'):
            del request.session['totalQuestion']
        if request.session.has_key('sectionDetails'):
            del request.session['sectionDetails']
        if request.session.has_key('questionTypeDetail'):
            del request.session['questionTypeDetail']
        if request.session.has_key('setData'):
            del request.session['setData']
        if request.session.has_key('context'):
            del request.session['context']
        username = request.session['auth_username']
        if request.method == 'GET':
            apiPaperList = getMethod(
                request=request,
                method='GET',
                task = 'GETPAPERLIST',
                pathInfo=paper_list_URL.strip(),
                )
            data = json.loads(apiPaperList.text)
            print(data)
            return render(request,'Admin/paper-management/paper-list.html',{'username':username,'data':data})
    else:
        return redirect('login')


# =========================================================================================================================================================================
#                                                                   PREVIEW NEW PAPER DETAILS
# =========================================================================================================================================================================
def preview_paper_data(request):
    if request.session.has_key('auth_token'):
        username = request.session['auth_username']
        if request.method == 'GET':
            if request.session.has_key('userUniqueId' and 'userUniqueName' and 'associatedCourse' and 'totalMarks' and 'passingMarks' and 'sectionDetails' and 'sectionCount' and 'paperCredit' and 'totalQuestion' and 'questionTypeDetail' and 'setData'):
                print('having valid keys!')
                # basic details session Keys
                userUniqueId = request.session['userUniqueId']
                userUniqueName = request.session['userUniqueName']
                associatedCourse = request.session['associatedCourse']
                totalMarks = request.session['totalMarks']
                passingMarks = request.session['passingMarks']
                # sectionwise details session keys
                sectionCount = request.session['sectionCount']
                paperCredit = request.session['paperCredit']
                totalQuestions = request.session['totalQuestion']
                sectionDetails = request.session['sectionDetails']
                sno = []
                nOQ = []
                mPQ = []
                tL = []
                # sectionalTiming = []
                mPS = []
                data = []
                for i in sectionDetails:
                    data.append(i.split('-'))
                for i in data:
                    sno.append(i[0])
                    nOQ.append(i[1])            
                    mPQ.append(i[2])            
                    tL.append(i[3]+i[4])    
                    # sectionalTiming.append(i[4])        
                    mPS.append(i[5])
                    context = {}
                    context['sno'] = sno
                    context['nOQ'] = nOQ
                    context['mPQ'] = mPQ
                    context['tL'] = tL
                    # context['sectionalTiming'] = sectionalTiming
                    context['mPS'] = mPS
                # question type detailsession key
                questionTypeDetail = request.session['questionTypeDetail']
                section = []
                questionNumer = []
                questionType = []
                questionDetailData = []
                splitedQuestions = []
                for i in questionTypeDetail:
                    questionDetailData.append(i.split('-'))
                for i in questionDetailData:
                    section.append(i[0])
                    questionNumer.append(i[1])
                    questionType.append(i[2])            
                    context['section'] = section
                    context['questionNumer'] = questionNumer
                    context['questionType'] = questionType
                # print(context)
                # exit()

                # set creation info session key
                setData = request.session['setData']
                setDataList = []
                for i in setData:
                    setDataList.append(i.split('-'))
                # automated = setDataList[0]
                possibleSets = setDataList[0][0]
                languages = setDataList[0][1]
                allowedOptions = setDataList[0][2]
                request.session['context'] = context

                print(context)
                # exit()
                return render(request,'Admin/paper-management/preview-data.html',{'username':username,'userUniqueId':userUniqueId,'userUniqueName':userUniqueName,'associatedCourse':associatedCourse,'totalMarks':totalMarks,'passingMarks':passingMarks,'paperCredit':paperCredit,'totalQuestions':totalQuestions,'sectionDetails':sectionDetails,'sectionCount':sectionCount,'sno':sno,'nOQ':nOQ,'mPQ':mPQ,'tL':tL,'mPS':mPS,'possibleSets':possibleSets,'languages':languages,'allowedOptions':allowedOptions,'context':context,'sectionDetails':sectionDetails,'questionTypeDetail':questionTypeDetail})
            else:
                return redirect('paper_list')
        if request.method == 'POST':
            print('ajax function called on preview data!')
            # try:
            paperDataDict = {}
            paperDataDict['paperID'] = request.POST['paperID'].strip()
            paperDataDict['paperName'] = request.POST['paperName'].strip()
            paperDataDict['paperAssociateCourse'] = request.POST['paperAssociateCourse'].strip()
            paperDataDict['paperTotalMarks'] = request.POST['paperTotalMarks'].strip()
            paperDataDict['paperPassingMark'] = request.POST['paperPassingMark'].strip() 
            paperDataDict['paperCredit'] = request.POST['paperCredit'].strip()
            paperDataDict['totalSection'] = request.POST['totalSection'].strip()
            paperDataDict['totalnumberOuestion'] = request.POST['totalnumberOuestion'].strip()
            paperDataDict['sectionDetails'] = request.POST['sectionDetails'].strip()
            paperDataDict['automatedSet'] = request.POST['automatedSet'].strip()

            contextData = request.session['context']
            result = json.dumps(contextData) 
            paperDataDict['questionTypeDetails'] = result
            
            paperDataDict['setsTypeDetails'] = request.POST['setsTypeDetails']


            apiCreatePaper = postMethod(
                request=request,
                method='POST',
                task = 'CREATEPAPER',
                pathInfo=createPaper_URL.strip(),
                dataList = paperDataDict
                )
            res = apiCreatePaper
            print(res)
            response_code = res.status_code
            if(response_code == 201):
                success = 'success'
                # deleting the session keys
                del request.session['userUniqueId']
                del request.session['userUniqueName']
                del request.session['associatedCourse']
                del request.session['totalMarks']
                del request.session['passingMarks']
                del request.session['sectionCount']
                del request.session['paperCredit']
                del request.session['totalQuestion']
                del request.session['sectionDetails']
                del request.session['questionTypeDetail']
                del request.session['setData']
                del request.session['context']
                return  JsonResponse({'response':success})
            # else:
            #     paperAPI_Response = json.loads(apiCreatePaper.text)
            #     return JsonResponse({'response':'Fail'})
            # except:
            #     return JsonResponse({'response':'Fail'})
    else:
        return redirect('login')

# =========================================================================================================================================================================
#                                                                   CREATE PAPER : PAGE 02
# =========================================================================================================================================================================
def select_paper_batch_student(request):
    if request.session.has_key('auth_token'):
        username = request.session['auth_username']
        return render(request,'Admin/paper-management/select-batch-student.html',{'username':username})
    else:
        return redirect('login')


# =========================================================================================================================================================================
#                                                                   CREATE PAPER : PAGE 02
# =========================================================================================================================================================================
def paper_student_detail(request):
    if request.session.has_key('auth_token'):
        username = request.session['auth_username']
        return render(request,'Admin/paper-management/student-detail.html',{'username':username})
    else:
        return redirect('login')


# =========================================================================================================================================================================
#                                                                   VIEW SPECIFIC PAPER DETAILS
# =========================================================================================================================================================================
def view_paper_detail(request,id):
    if request.session.has_key('auth_token'):
        username = request.session['auth_username']
        if request.method == 'GET':
            print('this is view page with id : ',id)
            # GET specific batch data
            apiPaperSpecificDetails = getMethod(
                request=request,
                method='GET',
                task = 'GETSPECIFICPAPER',
                pathInfo=updatePaper_URL+str(id)+'/'.strip(),
                )
            data = json.loads(apiPaperSpecificDetails.text)
            setsTypeDetails = data['setsTypeDetails'].split('-')
            res = json.loads(data['questionTypeDetails']) 
            res['possibleSets'] = setsTypeDetails[0]
            res['languages'] = setsTypeDetails[1]
            res['allowedOptions'] = setsTypeDetails[2]

            return render(request,'Admin/paper-management/view-paper-detail.html',{'username':username,'data':data,'res':res})
    else:
        return redirect('login')


# =========================================================================================================================================================================
#                                                                   DELETE SPECIFIC PAPER
# =========================================================================================================================================================================
def delete_paper(request,id):
    if request.session.has_key('auth_token'):
        if request.method == 'GET':
            print('del method called!')
            apiAutoritySpecificDelete = getMethod(
                request=request,
                method='DELETE',
                task = 'DELETESPECIFICPAPER',
                pathInfo=deletePaper_URL+str(id)+'/'.strip(),
                )
            data = apiAutoritySpecificDelete.text
            return redirect('paper_list')
    else:
        return redirect('login')


# =========================================================================================================================================================================
# =========================================================================================================================================================================
    