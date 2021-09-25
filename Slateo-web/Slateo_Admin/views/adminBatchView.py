from django.shortcuts import render,redirect
from django.http import JsonResponse, HttpResponse, HttpResponseRedirect
from .Helper.postMethod import *
from .Helper.getMethod import *
from .Helper.globalURL import *
import json
from .Helper.getAuthorityList import *
from Slate_O.validateKey import checkKey
from .headerNotification import headerNotification
# =========================================================================================================================================================================
#                                                                   SHOW BATCH LIST
# =========================================================================================================================================================================
def batch_list(request):
    if request.session.has_key('auth_token'):
        username = request.session['auth_username']
        if request.method == 'GET':
            # BATCH LIST
            apiBatchList = getMethod(
                request=request,
                method='GET',
                task = 'GETBATCHLIST',
                pathInfo=getBatchList_URL.strip(),
                )
            data = json.loads(apiBatchList.text)
            print('data >>>>>>> ',data)
            for i in range(len(data)):
                data[i]['noOfStudents'] = len(data[i]['batchStudentFK'])
            # GROUP LIST
            apiGroupList = getMethod(
                request=request,
                method='GET',
                task = 'GETGROUPLIST',
                pathInfo=getGroupList_URL.strip(),
                )
            groupData = json.loads(apiGroupList.text)        
            for i in range(len(groupData)):
                groupData[i]['noOfStudents'] = len(groupData[i]['groupStudentFK'])
            try:
                authority = request.session['authority']
                dictionary = get_authority_list(authority,'resource_login')
            except:
                authority = []
                dictionary = get_authority_list(authority,'admin_login')
            return render(request,'Admin/batch-management/batch-list.html',{'username':username,'data':data,'groupData':groupData,'authority':dictionary})
    else:
        return redirect('login')
# =========================================================================================================================================================================
#                                                                    CREATE BATCH
# =========================================================================================================================================================================
def create_batch(request):
    if request.session.has_key('auth_token'):
        username = request.session['auth_username']
        if request.method == 'GET':
            # apiStudentList = getMethod(
            #     request=request,
            #     method='GET',
            #     task = 'STUDENTLIST',
            #     pathInfo=studentList_URL.strip(),
            #     )
            # data = json.loads(apiStudentList.text)
            apiCourseList = getMethod(
                    request=request,
                    method='GET',
                    task = 'GETCOURSELIST',
                    pathInfo=getCourseList_URL.strip(),
                    )
            data = json.loads(apiCourseList.text)
            apiSubjectList = getMethod(
                request=request,
                method='GET',
                task = 'GETSUBJECTLIST',
                pathInfo=getSubjectList_URL.strip(),
                )
            subjectList = json.loads(apiSubjectList.text)
            apiCourseTypeList = getMethod(
                request=request,
                method='GET',
                task = 'GETCOURSETYPELIST',
                pathInfo=getCourseTypeList_URL.strip(),
                )
            courseType = json.loads(apiCourseTypeList.text)
            response = headerNotification(request)
            length = response[0]
            requestHeadingData = response[1]
            admin_data = response[2]
            try:
                authority = request.session['authority']
                dictionary = get_authority_list(authority,'resource_login')
            except:
                authority = []
                dictionary = get_authority_list(authority,'admin_login')
            return render(request,'Admin/batch-management/create-batch.html',{'admin_data':admin_data,'admin_data':admin_data,'dataLength':length,'data':requestHeadingData['data'],'username':username,'subjectList':subjectList,'courseType':courseType,'authority':dictionary})
        if request.method == 'POST':
            batchID = request.POST['batchID'].strip()
            batchName = request.POST['batchName'].strip()
            batchDescription = request.POST['batchDescription'].strip()
            batchCourseType = request.POST['batchCourseType'].strip()
            batchCourseName = request.POST['batchCourseName'].strip()
            # batchSupervisorID = request.POST['batchSupervisorID'].strip()
            # batchSupervisorName = request.POST['batchSupervisorName'].strip()
            batchStudentFK = request.POST.getlist('batchStudentFK[]')
            batchYear = request.POST['batchYear']

            batchDataList = [batchID,batchName,batchDescription,batchCourseType,batchCourseName,batchStudentFK,batchYear]
            print('batchDataList >> ',batchDataList)
            apiCreateBatch = postMethod(
                request=request,
                method='POST',
                task = 'CREATEBATCH',
                pathInfo=createBatch_URL.strip(),
                dataList = batchDataList
                )
            batchData = json.loads(apiCreateBatch.text)
            print('batchData >> ',batchData)
            return HttpResponse('succes batch created!')
    else:
        return redirect('login')
    
# =========================================================================================================================================================================
#                                                                    PREVIEW DATA
# =========================================================================================================================================================================
def preview_data(request):
    if request.session.has_key('auth_token'):
        username = request.session['auth_username']
        try:
            authority = request.session['authority']
            dictionary = get_authority_list(authority,'resource_login')
        except:
            authority = []
            dictionary = get_authority_list(authority,'admin_login')
        return render(request,'Admin/batch-management/preview-data.html',{'username':username,'authority':dictionary})
    else:
        return redirect('login')
# =========================================================================================================================================================================
#                                                                    SELECT STUDENTS FOR BATCHES
# =========================================================================================================================================================================
def select_batch_student(request):
    if request.session.has_key('auth_token'):
        username = request.session['auth_username']
        if request.method == 'GET':
            studentID = request.GET['studentID']
            print('studentId >> ',studentID)
            apiStudentDetails = getMethod(
                request=request,
                method='GET',
                task = 'STUDENTDETAIL',
                pathInfo=studentDetail_URL+studentID+'/'.strip(),
                )
            data = json.loads(apiStudentDetails.text)
            print('data >> ',data)
            data = data['data']
            if('-' in data['fullName']):
                fullname = data['fullName'].split('-')
                data['fullname'] = fullname[0]+" "+fullname[1]
                return JsonResponse({'data':data})
            else:
                return JsonResponse({'data':data})
    else:
        return redirect('login')
# =========================================================================================================================================================================
#                                                                    EDIT BATCH DETAILS
# =========================================================================================================================================================================
# def edit_batch_detail(request):
#     if request.session.has_key('auth_token'):
#         username = request.session['auth_username']
#         try:
#             authority = request.session['authority']
#             dictionary = get_authority_list(authority,'resource_login')
#         except:
#             authority = []
#             dictionary = get_authority_list(authority,'admin_login')
#         return render(request,'Admin/batch-management/edit-batch-details.html',{'username':username,'authority':dictionary})
#     else:
#         return redirect('login')
# # ========================================================================================================================================================================
def edit_batch_student_detail(request,id):
    if request.session.has_key('auth_token'):
        username = request.session['auth_username']
        try:
            authority = request.session['authority']
            dictionary = get_authority_list(authority,'resource_login')
        except:
            authority = []
            dictionary = get_authority_list(authority,'admin_login')

        apiStudentDetails = getMethod(
                    request=request,
                    method='GET',
                    task = 'STUDENTDETAIL',
                    pathInfo=studentDetail_URL+str(id)+'/'.strip(),
                    )
        data = json.loads(apiStudentDetails.text)
        data = data['data']
        if '-' in data['fullName']:
            fullname = data['fullName'].split('-')
            data['fullname'] = fullname[0]+" "+fullname[1]
        else:
            data['fullname'] = data['fullName']
        print('student data >> ',data)

        return render(request,'Admin/batch-management/edit-batch-student-detail.html',{'username':username,'authority':dictionary,'studentDetail':data,})
    else:
        return redirect('login')
# # ========================================================================================================================================================================
def edit_batch_detail(request,id):
    if request.session.has_key('auth_token'):
        username = request.session['auth_username']
        if request.method == 'GET':
            apiBatchDetails = getMethod(
                request=request,
                method='GET',
                task = 'GETSPECIFICBATCH',
                pathInfo=updateBatch_URL+str(id)+'/'.strip(),
                )
            data = json.loads(apiBatchDetails.text)
            print('data >> ',data)
            try:
                authority = request.session['authority']
                dictionary = get_authority_list(authority,'resource_login')
            except:
                authority = []
                dictionary = get_authority_list(authority,'admin_login')
            return render(request,'Admin/batch-management/edit-batch-details.html',{'username':username,'data': data,'authority':dictionary})
        if request.method == 'POST':
            batchID = request.POST['batchID'].strip()
            batchName = request.POST['batchName'].strip()
            batchDescription = request.POST['batchDescription'].strip()
            batchCourseType = request.POST['batchCourseTypeDetail'].strip()
            batchCourseName = request.POST['batchCourseNameDetail'].strip()
            # batchSupervisorID = request.POST['batchSupervisorID'].strip()
            # batchSupervisorName = request.POST['batchSupervisorName'].strip()
            batchDataList = [batchID,batchName,batchDescription,batchCourseType,batchCourseName]
            apiUpdateBatch = postMethod(
                request=request,
                method='PUT',
                task = 'UPDATEBATCH',
                pathInfo=updateBatch_URL+str(id)+'/'.strip(),
                dataList = batchDataList
                )

            print('api data >> ',apiUpdateBatch.text)
            # exit()
            return redirect(batch_list)
    else:
        return redirect('login')
# # ========================================================================================================================================================================
def deleteBatch(request,id):
    if request.session.has_key('auth_token'):
        apideleteBatch = getMethod(
            request=request,
                method="DELETE",
                task = 'DELETESPECIFICBATCH',
                pathInfo=deleteBatch_URL+str(id)+'/'.strip(),
                ) 
        data = apideleteBatch.text
        return redirect(batch_list)
    else:
        return redirect('login')
# =========================================================================================================================================================================
#                                                                    SHOW BATCH DETAILS
# =========================================================================================================================================================================
def batch_detail(request,id):
    if request.session.has_key('auth_token'):
        username = request.session['auth_username']
        if request.method == 'GET':
            #  GET batch list
            apiBatchList = getMethod(
                request=request,
                method='GET',
                task = 'GETBATCHLIST',
                pathInfo=getBatchList_URL.strip(),
                )
            batchData = json.loads(apiBatchList.text)
            

            
            for i in range(len(batchData)):
                batchData[i]['noOfStudents'] = len(batchData[0]['batchStudentFK'])
            # GET student list
            apiStudentList = getMethod(
                request=request,
                method='GET',
                task = 'STUDENTLIST',
                pathInfo=studentList_URL.strip(),
                )
            studentData = json.loads(apiStudentList.text)
            for i in studentData:
                if '-' in i['fullName']:
                    fullname = i['fullName'].split('-')
                    i['fullname'] = fullname[0]+" "+fullname[1]
                else:
                    i['fullname'] = i['fullName']
            # GET specific batch data
            apiBatchDetails = getMethod(
                request=request,
                method='GET',
                task = 'GETSPECIFICBATCH',
                pathInfo=updateBatch_URL+str(id)+'/'.strip(),
                )
            data = json.loads(apiBatchDetails.text)
            print('batchData >> ',data)
            # exit()
            studentDataList = data['batchStudentFK']
            
            try:
                authority = request.session['authority']
                dictionary = get_authority_list(authority,'resource_login')
            except:
                authority = []
                dictionary = get_authority_list(authority,'admin_login')
            return render(request,'Admin/batch-management/batch-detail.html',{'username':username,'batchData':batchData,'studentData':studentData,'data':data,'specificStudentData':studentDataList,'authority':dictionary})
    else:
        return redirect('login')
# =========================================================================================================================================================================
#                                                                    CLUSTER BATCH LIST
# =========================================================================================================================================================================
def cluster_batch_list(request):
    if request.session.has_key('auth_token'):
        username = request.session['auth_username']
        if request.method == 'GET':
            #  CLUSTER LIST
            apiClusterList = getMethod(
                request=request,
                method='GET',
                task = 'GETCLUSTERLIST',
                pathInfo=getClusterList_URL.strip(),
                )
            clusterData = json.loads(apiClusterList.text)
            for i in range(len(clusterData)):
                totalNoOfStudents = 0
                noOfStudents = 0
                clusterData[i]['noOfStudents'] = totalNoOfStudents
                clusterData[i]['noOfBatches'] = len(clusterData[i]['clusterBatchFK'])
                for j in clusterData[i]['clusterBatchFK']:
                    # BATCH LIST
                    apiBatchList = getMethod(
                        request=request,
                        method='GET',
                        task = 'GETSPECIFICBATCH',
                        pathInfo=updateBatch_URL+str(j)+'/'.strip(),
                        )
                    data = json.loads(apiBatchList.text)
                    clusterData[i]['noOfStudents'] = len(data['batchStudentFK'])
        try:
            authority = request.session['authority']
            dictionary = get_authority_list(authority,'resource_login')
        except:
            authority = []
            dictionary = get_authority_list(authority,'admin_login')
        return render(request,'Admin/batch-management/cluster-batch-list.html',{'username':username,'clusterData':clusterData,'authority':dictionary})
    else:
        return redirect('login')
# # ========================================================================================================================================================================
def cluster_batch_detail(request,id):
    if request.session.has_key('auth_token'):
        username = request.session['auth_username']
        if request.method == 'GET':
            apiGetSpecificCluster = getMethod(
                request=request,
                method="GET",
                task = 'GETSPECIFICCLUSTER',
                pathInfo=updateCluster_URL+str(id)+'/'.strip(),
                ) 
            data = json.loads(apiGetSpecificCluster.text)
            context = {}
            listData = []
            #  getting full batch details
            for batchID in data['clusterBatchFK']:
                apiBatchDetails = getMethod(
                    request=request,
                    method='GET',
                    task = 'GETSPECIFICBATCH',
                    pathInfo=updateBatch_URL+str(batchID)+'/'.strip(),
                    )
                context['id'] = json.loads(apiBatchDetails.text)['id']
                context['batchID'] = json.loads(apiBatchDetails.text)['batchID']
                context['batchName'] = json.loads(apiBatchDetails.text)['batchName']
                context['totalNumberOfStudent'] = len(json.loads(apiBatchDetails.text)['batchStudentFK'])
                context['batchSuperVisorName'] = json.loads(apiBatchDetails.text)['batchSuperVisorName']
                listData.append(context)
                context = {}
            totalStudents = 0
            for i in listData:
                totalStudents += i['totalNumberOfStudent']
            data['totalStudents'] = totalStudents
            # BATCH LIST
            apiBatchList = getMethod(
                request=request,
                method='GET',
                task = 'GETBATCHLIST',
                pathInfo=getBatchList_URL.strip(),
                )
            batchData = json.loads(apiBatchList.text)
            try:
                authority = request.session['authority']
                dictionary = get_authority_list(authority,'resource_login')
            except:
                authority = []
                dictionary = get_authority_list(authority,'admin_login')
            return render(request,'Admin/batch-management/cluster-batch-detail.html',{'username':username,'data':data,'listData':listData,'batchData':batchData,'authority':dictionary})
    else:
        return redirect('login')
# # ========================================================================================================================================================================
def edit_cluster_detail(request,id):
    if request.session.has_key('auth_token'):
        username = request.session['auth_username']
        if request.method == 'GET':
            apiClusterDetails = getMethod(
                request=request,
            method='GET',
            task = 'GETSPECIFICCLUSTER',
            pathInfo=updateCluster_URL+str(id)+'/'.strip(),
            )
            data = json.loads(apiClusterDetails.text)
            try:
                authority = request.session['authority']
                dictionary = get_authority_list(authority,'resource_login')
            except:
                authority = []
                dictionary = get_authority_list(authority,'admin_login')
            return render(request,'Admin/batch-management/edit-cluster-detail.html',{'username':username,'data':data,'authority':dictionary})

        if request.method == 'POST':
            clusterID = request.POST['clusterID'].strip()
            clusterName = request.POST['clusterName'].strip()
            clusterDescription = request.POST['clusterDescription'].strip()
            clusterSupervisorID = request.POST['clusterSupervisorID'].strip()
            clusterSupervisorName = request.POST['clusterSupervisorName'].strip()
            clusterDataList = [clusterID,clusterName,clusterDescription,clusterSupervisorID,clusterSupervisorName]
            apiUpdatecluster = postMethod(
                request=request,
                method='PUT',
                task = 'UPDATECLUSTER',
                pathInfo=updateCluster_URL+str(id)+'/'.strip(),
                dataList = clusterDataList
                )
            return redirect(cluster_batch_list)
    else:
        return redirect('login')
# ===============================================================================================================================================================
#                                                                    CREATE CLUSTER BATCH
# ===============================================================================================================================================================
def create_cluster_batch(request):
    if request.session.has_key('auth_token'):
        username = request.session['auth_username']
        if request.method == 'GET':
            apiBatchList = getMethod(
                request=request,
                method='GET',
                task = 'GETBATCHLIST',
                pathInfo=getBatchList_URL.strip(),
                )
            batchData = json.loads(apiBatchList.text)
            try:
                authority = request.session['authority']
                dictionary = get_authority_list(authority,'resource_login')
            except:
                authority = []
                dictionary = get_authority_list(authority,'admin_login')
            return render(request,'Admin/batch-management/create-cluster-batch.html',{'username':username,'batchData':batchData,'authority':dictionary})
        if request.method == 'POST':
            clusterID = request.POST['clusterID'].strip()
            clusterName = request.POST['clusterName'].strip()
            clusterDescription = request.POST['clusterDescription'].strip()
            clusterSupervisorID = request.POST['clusterSupervisorID'].strip()
            clusterSupervisorName = request.POST['clusterSupervisorName'].strip()
            clusterStudentFK = request.POST.getlist('clusterStudentFK[]')
            clusterDataList = [clusterID,clusterName,clusterDescription,clusterSupervisorID,clusterSupervisorName,clusterStudentFK]
            apiCreatecluster = postMethod(
                request=request,
                method='POST',
                task = 'CREATECLUSTER',
                pathInfo=createcluster_URL.strip(),
                dataList = clusterDataList
                )
            clusterData = json.loads(apiCreatecluster.text)
            return HttpResponse(clusterData)
    else:
        return redirect('login')
# # ========================================================================================================================================================================
def cluster_detail(request,id):
    if request.session.has_key('auth_token'):
        username = request.session['auth_username']
        if request.method == 'GET':
            #  GET batch list
            apiGroupList = getMethod(
                request=request,
                method='GET',
                task = 'GETCLUSTERLIST',
                pathInfo=getGroupList_URL.strip(),
                )
            groupData = json.loads(apiGroupList.text)
            for i in range(len(groupData)):
                groupData[i]['noOfBatches'] = len(groupData[0]['clusterBatchFK'])
            # GET batch list
            apiStudentList = getMethod(
                request=request,
                method='GET',
                task = 'GETBATCHLIST',
                pathInfo=studentList_URL.strip(),
                )
            studentData = json.loads(apiStudentList.text)
            
            for i in studentData:
                if '-' in i['fullName']:
                    fullname = i['fullName'].split('-')
                    i['fullname'] = fullname[0]+" "+fullname[1]
                else:
                    i['fullname'] = i['fullName']
            # GET specific group data
            apigroupDetails = getMethod(
                request=request,
                method='GET',
                task = 'GETSPECIFICGROUP',
                pathInfo=updateGroup_URL+str(id)+'/'.strip(),
                )
            data = json.loads(apigroupDetails.text)
            # GET only group students
            studentDataList = data['groupStudentFK']
            specificStudentData = []
            for i in studentDataList:
                if len(studentDataList) != 0:
                    apiStudentDetails = getMethod(
                        request=request,
                    method='GET',
                    task = 'STUDENTDETAIL',
                    pathInfo=studentDetail_URL+str(i)+'/'.strip(),
                    )
                    specificStudentData.append(json.loads(apiStudentDetails.text))
            try:
                authority = request.session['authority']
                dictionary = get_authority_list(authority,'resource_login')
            except:
                authority = []
                dictionary = get_authority_list(authority,'admin_login')
            return render(request,'Admin/batch-management/group-detail.html',{'username':username,'groupData':groupData,'studentData':studentData,'data':data,'specificStudentData':specificStudentData,'authority':dictionary})
    else:
        return redirect('login')
# # ========================================================================================================================================================================
def select_batch(request):
    if request.session.has_key('auth_token'):
        username = request.session['auth_username']
        if request.method == 'GET':
            studentID = request.GET['batchID']
            apiBatchDetails = getMethod(
                request=request,
                method='GET',
                task = 'GETSPECIFICBATCH',
                pathInfo=updateBatch_URL+studentID+'/'.strip(),
                )
            data = json.loads(apiBatchDetails.text)
            return JsonResponse({'data':data})
    else:
        return redirect('login')
# # ========================================================================================================================================================================
def deleteCluster(request,id):
    if request.session.has_key('auth_token'):
        apideleteCluster = getMethod(
            request=request,
                method="DELETE",
                task = 'DELETESPECIFICCLUSTER',
                pathInfo=updateCluster_URL+str(id)+'/'.strip(),
                ) 
        data = apideleteCluster.text
        return redirect(cluster_batch_list)
    else:
        return redirect('login')
# ==============================================================================================================================================================
#                                                                    CREATE GROUPS
# =============================================================================================================================================================
def create_group(request):
    if request.session.has_key('auth_token'):
        username = request.session['auth_username']
        if request.method == 'GET':
            apiStudentList = getMethod(
                request=request,
                method='GET',
                task = 'STUDENTLIST',
                pathInfo=studentList_URL.strip(),
                )
            data = json.loads(apiStudentList.text)
            try:
                authority = request.session['authority']
                dictionary = get_authority_list(authority,'resource_login')
            except:
                authority = []
                dictionary = get_authority_list(authority,'admin_login')
            return render(request,'Admin/batch-management/create-group.html',{'username':username,'data':data,'authority':dictionary})
        if request.method == 'POST':
            groupID = request.POST['groupID'].strip()
            groupName = request.POST['groupName'].strip()
            groupDescription = request.POST['groupDescription'].strip()
            predec_group = request.POST['predec_group'].strip()
            succec_group = request.POST['succec_group'].strip()
            groupSupervisorID = request.POST['groupSupervisorID'].strip()
            groupSupervisorName = request.POST['groupSupervisorName'].strip()
            groupStudentFK = request.POST.getlist('groupStudentFK[]')
            groupDataList = [groupID,groupName,groupDescription,predec_group,succec_group,groupSupervisorID,groupSupervisorName,groupStudentFK]
            apiCreateGroup = postMethod(
                request=request,
                method='POST',
                task = 'CREATEGROUP',
                pathInfo=createGroup_URL.strip(),
                dataList =groupDataList
                )
            groupData = json.loads(apiCreateGroup.text)
            return HttpResponse('succesgroup created!')
    else:
        return redirect('login')
# # ========================================================================================================================================================================
def deleteGroup(request,id):
    if request.session.has_key('auth_token'):
        apideleteGroup = getMethod(
            request=request,
                method="DELETE",
                task = 'DELETESPECIFICGROUP',
                pathInfo=deleteGroup_URL+str(id)+'/'.strip(),
                ) 
        data = apideleteGroup.text
        return redirect(batch_list)
    else:
        return redirect('login')
# =========================================================================================================================================================================
#                                                                    EDIT GROUP DETAILS
# =========================================================================================================================================================================
def edit_group_detail(request,id):
    if request.session.has_key('auth_token'):
        username = request.session['auth_username']
        if request.method == 'GET':
            apiGroupDetails = getMethod(
                request=request,
                method='GET',
                task = 'GETSPECIFICGROUP',
                pathInfo=updateGroup_URL+str(id)+'/'.strip(),
                )
            data = json.loads(apiGroupDetails.text)
            try:
                authority = request.session['authority']
                dictionary = get_authority_list(authority,'resource_login')
            except:
                authority = []
                dictionary = get_authority_list(authority,'admin_login')
            return render(request,'Admin/batch-management/edit-group-detail.html',{'username':username,'data': data,'authority':dictionary})
        if request.method == 'POST':
            groupID = request.POST['groupID'].strip()
            groupName = request.POST['groupName'].strip()
            groupDescription = request.POST['groupDescription'].strip()
            predec_group = request.POST['predec_group'].strip()
            succec_group = request.POST['succec_group'].strip()
            groupSupervisorID = request.POST['groupSupervisorID'].strip()
            groupSupervisorName = request.POST['groupSupervisorName'].strip()
            groupDataList = [groupID,groupName,groupDescription,predec_group,succec_group,groupSupervisorID,groupSupervisorName]
            apiUpdateGroup = postMethod(
                request=request,
                method='PUT',
                task = 'UPDATEGROUP',
                pathInfo=updateGroup_URL+str(id)+'/'.strip(),
                dataList = groupDataList
                )
            return redirect(batch_list)
    else:
        return redirect('login')
# =========================================================================================================================================================================
#                                                                    SOW GROUP DETAILS
# =========================================================================================================================================================================
def group_detail(request,id):
    if request.session.has_key('auth_token'):
        username = request.session['auth_username']
        if request.method == 'GET':
            #  GET batch list
            apiGroupList = getMethod(
                request=request,
                method='GET',
                task = 'GETGROUPLIST',
                pathInfo=getGroupList_URL.strip(),
                )
            groupData = json.loads(apiGroupList.text)
            for i in range(len(groupData)):
                groupData[i]['noOfStudents'] = len(groupData[0]['groupStudentFK'])
            # GET student list
            apiStudentList = getMethod(
                request=request,
                method='GET',
                task = 'STUDENTLIST',
                pathInfo=studentList_URL.strip(),
                )
            studentData = json.loads(apiStudentList.text)
            for i in studentData:
                if '-' in i['fullName']:
                    fullname = i['fullName'].split('-')
                    i['fullname'] = fullname[0]+" "+fullname[1]
                else:
                    i['fullname'] = i['fullName']
            # GET specific group data
            apigroupDetails = getMethod(
                request=request,
                method='GET',
                task = 'GETSPECIFICGROUP',
                pathInfo=updateGroup_URL+str(id)+'/'.strip(),
                )
            data = json.loads(apigroupDetails.text)
            # GET only group students
            studentDataList = data['groupStudentFK']
            specificStudentData = []
            for i in studentDataList:
                if len(studentDataList) != 0:
                    apiStudentDetails = getMethod(
                        request=request,
                    method='GET',
                    task = 'STUDENTDETAIL',
                    pathInfo=studentDetail_URL+str(i)+'/'.strip(),
                    )
                    specificStudentData.append(json.loads(apiStudentDetails.text))
            try:
                authority = request.session['authority']
                dictionary = get_authority_list(authority,'resource_login')
            except:
                authority = []
                dictionary = get_authority_list(authority,'admin_login')
            return render(request,'Admin/batch-management/group-detail.html',{'username':username,'groupData':groupData,'studentData':studentData,'data':data,'specificStudentData':specificStudentData,'authority':dictionary})
    else:
        return redirect('login')
# =========================================================================================================================================================================
#                                                                    PREVIEW GROUP STUDENTS
# =========================================================================================================================================================================
def preview_group_student(request):
    username = request.session['auth_username']
    return render(request,'Admin/batch-management/preview-group-student.html',{'username':username})
# =========================================================================================================================================================================
#                                                                    SELECT BATCHES FOR CLUSTERS 
# =========================================================================================================================================================================
def select_batches(request):
    username = request.session['auth_username']
    return render(request,'Admin/batch-management/select-batches.html',{'username':username})
# =========================================================================================================================================================================
#                                                                    SELECT STUDENTS FOR GROUP
# =========================================================================================================================================================================
def select_group_student(request):
    username = request.session['auth_username']
    return render(request,'Admin/batch-management/select-group-student.html',{'username':username})
# # ========================================================================================================================================================================
def add_more_batch_student(request):
    if request.session.has_key('auth_token'):
        username = request.session['auth_username']
        if request.method == 'POST':
            batchID = request.POST['batchId']
            batchIDLabel = request.POST['batchIDLabel']
            batchNameLabel = request.POST['batchNameLabel']
            listIDs = request.POST.getlist('listIDs[]')

            batchDataList = [batchIDLabel,batchNameLabel,listIDs]
            apiAddNewStudentBatch = postMethod(
                request=request,
                method='PUT',
                task = 'ADD_NEW_STUDENT_IN_BATCH',
                pathInfo=updateBatch_URL+batchID+'/'.strip(),
                dataList = batchDataList
                )
            batchData = json.loads(apiAddNewStudentBatch.text)
            return HttpResponse('succes batch created!')
    else:
        return redirect('login')
# # ========================================================================================================================================================================
def add_more_group_student(request):
    if request.session.has_key('auth_token'):
        username = request.session['auth_username']
        if request.method == 'POST':
            groupID = request.POST['groupId']
            groupIDLabel = request.POST['groupIDLabel']
            groupNameLabel = request.POST['groupNameLabel']
            listIDs = request.POST.getlist('listIDs[]')
            groupDataList = [groupIDLabel,groupNameLabel,listIDs]
            apiAddNewStudentgroup = postMethod(
                request=request,
                method='PUT',
                task = 'ADD_NEW_STUDENT_IN_GROUP',
                pathInfo=updateGroup_URL+groupID+'/'.strip(),
                dataList = groupDataList
                )
            groupData = json.loads(apiAddNewStudentgroup.text)
            return HttpResponse('succes group created!')
    else:
        return redirect('login')
# # =========================================================================================================================================================================
def add_more_batch(request):
    if request.session.has_key('auth_token'):
        username = request.session['auth_username']
        if request.method == 'POST':
            clusterID = request.POST['clusterId']
            clusterIDLabel = request.POST['clusterIDLabel']
            clusterNameLabel = request.POST['clusterNameLabel']
            listIDs = request.POST.getlist('listIDs[]')
            clusterDataList = [clusterIDLabel,clusterNameLabel,listIDs]
            apiAddNewStudentcluster = postMethod(
                request=request,
                method='PUT',
                task = 'ADD_NEW_STUDENT_IN_CLUSTER',
                pathInfo=updateCluster_URL+clusterID+'/'.strip(),
                dataList = clusterDataList
                )
            clusterData = json.loads(apiAddNewStudentcluster.text)
            return HttpResponse(clusterData)
    else:
        return redirect('login')

def filterStudents(request):
    if request.method == 'GET':
        courseTypeId = request.GET['courseTypeId']
        courseId = request.GET['courseId']
        year = request.GET['year']

        print(courseTypeId,courseId,year)
        apiStudentDetails = getMethod(
            request=request,
            method='GET',
            task = 'STUDENTDETAIL',
            pathInfo=filterStudent_URL+'?courseType='+str(courseTypeId)+'&course='+str(courseId)+'&year='+str(year).strip(),
            )
        filterData = json.loads(apiStudentDetails.text)
        print('filtered data >>> ',filterData)

        return JsonResponse({'responseList':filterData})


def loadMoreStudents(request):
    if request.method == 'GET':
        courseTypeId = request.GET['courseTypeId']
        courseId = request.GET['courseId']
        year = request.GET['year']
        page = request.GET['page']

        print(courseTypeId,courseId,year)
        apiStudentDetails = getMethod(
            request=request,
            method='GET',
            task = 'STUDENTDETAIL',
            pathInfo=filterStudent_URL+'?courseType='+str(courseTypeId)+'&course='+str(courseId)+'&year='+str(year)+'&page='+str(page).strip(),
            )
        filterData = json.loads(apiStudentDetails.text)
        print('filtered data >>> ',filterData)

        return JsonResponse({'responseList':filterData})



def searchNewStudents(request):
    if request.method == 'GET':
        searchString = request.GET['searchString']
        courseType = request.GET['courseTypeId']
        course = request.GET['courseId']
        type_of_search = request.GET['type_of_search']


        print('searchString >> ',searchString)
        print('courseType >> ',courseType)
        print('course >> ',course)
        print('type_of_search >> ',type_of_search)

        apiStudentDetails = getMethod(
            request=request,
            method='GET',
            task = 'STUDENTDETAIL',
            pathInfo=add_new_searchStudent_URL+'?q='+str(searchString)+'&courseType='+str(1)+'&course='+str(1)+'&type_of_search='+str(type_of_search).strip(),
            )
        filterData = json.loads(apiStudentDetails.text)
        print('filtered data >>> ',filterData)

        return JsonResponse({'responseList':filterData})



        