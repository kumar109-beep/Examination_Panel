from django.shortcuts import render,redirect
from django.http import JsonResponse, HttpResponse, HttpResponseRedirect
from .Helper.postMethod import *
from .Helper.getMethod import *
from .Helper.globalURL import *
import json
from datetime import date
from .Helper.getAuthorityList import *
from Slate_O.validateKey import checkKey
from .headerNotification import headerNotification


# =========================================================================================================================================================================
#                                                                   ADD ROLES
# =========================================================================================================================================================================
def add_role(request):
    if request.session.has_key('auth_token'):
        try:
            authority = request.session['authority']
            dictionary = get_authority_list(authority,'resource_login')
        except:
            authority = []
            dictionary = get_authority_list(authority,'admin_login')
        status = checkKey(dictionary,'add_roles_designation')
        username = request.session['auth_username']
        if(status == 'True' or len(authority) == 0):
            if request.method == 'GET':
                response = headerNotification(request)
                length = response[0]
                requestHeadingData = response[1]
                admin_data = response[2]
                return render(request,'Admin/role-management/add-role.html',{'admin_data':admin_data,'dataLength':length,'data':requestHeadingData['data'],'username':username,'authority':dictionary})

            elif request.method == 'POST':
                roleId = request.POST['roleID'].strip()
                roleName = request.POST['roleName'].strip()

                roleDataDict = {}
                roleDataDict['roleId'] = roleId
                roleDataDict['roleName'] = roleName
                roleDataDict['assign_authority'] = str([])
                
                apiCreateRole = postMethod(
                    request=request,
                    method='POST',
                    task = 'CREATEROLE',
                    pathInfo=createRole_URL.strip(),
                    dataList = roleDataDict
                    )
                res = apiCreateRole
                response_code = res.status_code
                if(response_code == 201):
                    success_data = "Role Added Successfully"
                    response = headerNotification(request)
                    length = response[0]
                    requestHeadingData = response[1]
                    admin_data = response[2]
                    return render(request,'Admin/role-management/add-role.html',{'admin_data':admin_data,'dataLength':length,'data':requestHeadingData['data'],'username':username,'authority':dictionary,'success_data':success_data})
                else:
                    errorDict = json.loads(res.text) 
                    errDict = {}
                    if(len(errorDict['data'])!=0):
                        try:
                            for i,j in errorDict['data'].items():
                                x = j[0]
                                errDict[i] = x
                        except:
                            errDict = {'roleID':'Role id already exist','roleName':'role name already exist'}
                    response = headerNotification(request)
                    length = response[0]
                    requestHeadingData = response[1]
                    admin_data = response[2]
                    return render(request,'Admin/role-management/add-role.html',{'admin_data':admin_data,'dataLength':length,'data':requestHeadingData['data'],'username':username,'roleId':roleId,'roleName':roleName,'errDict':errDict,'authority':dictionary})

                return redirect('role_list')
        else:
            return render(request,'403.html') 
    else:
        return redirect('login')



# =========================================================================================================================================================================
#                                                                   EDIT AUTHORITY
# =========================================================================================================================================================================
def edit_role_authority(request):
    try:
        authority = request.session['authority']
        dictionary = get_authority_list(authority,'resource_login')
    except:
        authority = []
        dictionary = get_authority_list(authority,'admin_login')
    status = checkKey(dictionary,'edit_role_authority')
    if(status == 'True' or len(authority) == 0):
        response = headerNotification(request)
        length = response[0]
        requestHeadingData = response[1]
        admin_data = response[2]

        return render(request,'Admin/role-management/edit-authority.html',{'admin_data':admin_data,'dataLength':length,'data':requestHeadingData['data'],'username':username,'authority':dictionary})
    else:
            return render(request,'403.html') 
        





# =========================================================================================================================================================================
#                                                                   EDIT ROLES
# =========================================================================================================================================================================
def edit_roles(request,id):
    if request.session.has_key('auth_token'):
        try:
            authority = request.session['authority']
            dictionary = get_authority_list(authority,'resource_login')
        except:
            authority = []
            dictionary = get_authority_list(authority,'admin_login')
        status = checkKey(dictionary,'edit_roles')
        if(status == 'True' or len(authority) == 0):
            if request.method == 'GET':
                username = request.session['auth_username']
                apiRoleSpecificDetails = getMethod(
                    request=request,
                    method='GET',
                    task = 'GETSPECIFICROLE',
                    pathInfo=updateSpecificRole_URL+str(id)+'/'.strip(),
                    )
                data = json.loads(apiRoleSpecificDetails.text)
               
                data['data']['authCount'] = len(eval(data['data']['assign_authority']))
                data['data']['resource_count'] = data['resource_count']
                # print('data : >>> ',data)
                # exit()
                response = headerNotification(request)
                length = response[0]
                requestHeadingData = response[1]
                admin_data = response[2]
                return render(request,'Admin/role-management/edit-roles.html',{'admin_data':admin_data,'dataLength':length,'data':requestHeadingData['data'],'username':username,'data1':data['data'],'authority':dictionary})
            elif request.method == 'POST':
                username = request.session['auth_username']
                roleId = request.POST['roleId'].strip()
                roleName = request.POST['roleName'].strip()
                assignedAuth = request.POST['assignedAuth']
                data = {}
                data['roleId'] = roleId
                data['roleName'] = roleName
                data['assign_authority'] = str(assignedAuth)

                apiEditRole = postMethod(
                    request=request,
                    method='PUT',
                    task = 'CREATEROLE',
                    pathInfo=updateSpecificRole_URL+str(id)+'/'.strip(),
                    dataList = data
                    )
                res = apiEditRole
                response_code = res.status_code
                print('update data::::',res.text,response_code)
                if(response_code == 200):
                    apiRoleSpecificDetails = getMethod(
                    request=request,
                    method='GET',
                    task = 'GETSPECIFICROLE',
                    pathInfo=updateSpecificRole_URL+str(id)+'/'.strip(),
                    )
                    data = json.loads(apiRoleSpecificDetails.text)
                
                    data['data']['authCount'] = len(eval(data['data']['assign_authority']))
                    data['data']['resource_count'] = data['resource_count']
                    success_data = "Role Updated Successfully"
                    return render(request,'Admin/role-management/edit-roles.html',{'username':username,'success_data':success_data,'data1':data['data'],'authority':dictionary}) 
                    # return redirect('/edit_roles/'+str(id))
                else:
                    response = headerNotification(request)
                    length = response[0]
                    requestHeadingData = response[1]
                    admin_data = response[2]
                    return render(request,'Admin/role-management/edit-roles.html',{'admin_data':admin_data,'dataLength':length,'data':requestHeadingData['data'],'username':username,'res':res.text,'data':data,'authority':dictionary})
        else:
            return render(request,'403.html') 
    else:
        return redirect('login')




# =========================================================================================================================================================================
#                                                                   LIST ROLES
# =========================================================================================================================================================================
def role_list(request):
    if request.session.has_key('auth_token'):
        try:
            authority = request.session['authority']
            dictionary = get_authority_list(authority,'resource_login')
        except:
            authority = []
            dictionary = get_authority_list(authority,'admin_login')
        status = checkKey(dictionary,'roles_list')
        if(status == 'True' or len(authority) == 0):
            username = request.session['auth_username']
            apiGetRoleList = getMethod(
                    request=request,
                    method='GET',
                    task = 'GETROLELIST',
                    pathInfo=getRoleList_URL.strip(),
                    )
            data = json.loads(apiGetRoleList.text)
            for i in data:
                authLen = len(eval(i['assign_authority']))
                i['assignAuthCount'] = authLen
            # try:
            #     authority = request.session['authority']
            #     dictionary = get_authority_list(authority,'resource_login')
            # except:
            #     authority = []
            #     dictionary = get_authority_list(authority,'admin_login')
            print('data>>',data)
            response = headerNotification(request)
            length = response[0]
            requestHeadingData = response[1]
            admin_data = response[2]
            return render(request,'Admin/role-management/list.html',{'admin_data':admin_data,'dataLength':length,'data':requestHeadingData['data'],'username':username,'data1':data,'authority':dictionary})
        else:
            return render(request,'403.html') 
    else:
        return redirect('login')


# =========================================================================================================================================================================
#                                                                   PREVIEW ROLES DATA
# =========================================================================================================================================================================
def preview_role_data(request):
    return render(request,'Admin/role-management/preview-data.html')





# =========================================================================================================================================================================
#                                                                   SELECT AUTHORITIES
# =========================================================================================================================================================================
def select_authorities(request):
    return render(request,'Admin/role-management/select-authorities.html')





# =========================================================================================================================================================================
#                                                                   SELECT RESOURCES
# =========================================================================================================================================================================
def select_resources(request):
    if request.session.has_key('auth_token'):
        try:
            authority = request.session['authority']
            dictionary = get_authority_list(authority,'resource_login')
        except:
            authority = []
            dictionary = get_authority_list(authority,'admin_login')
        status = checkKey(dictionary,'view_assigned_resources')
        if(status == 'True' or len(authority) == 0):
            if request.method == 'GET':
                username = request.session['auth_username']
                try:
                    authority = request.session['authority']
                    dictionary = get_authority_list(authority,'resource_login')
                except:
                    authority = []
                    dictionary = get_authority_list(authority,'admin_login')
                return render(request,'Admin/role-management/select-resources.html',{'username':username,'authority':dictionary})
        else:
            return render(request,'403.html') 
    else:
        return redirect('login')





# =========================================================================================================================================================================
#                                                                   VIEW AUTHORITIES
# =========================================================================================================================================================================
def view_assigned_authorities(request,id):
    if request.session.has_key('auth_token'):
        try:
            authority = request.session['authority']
            dictionary = get_authority_list(authority,'resource_login')
        except:
            authority = []
            dictionary = get_authority_list(authority,'admin_login')
        status = checkKey(dictionary,'view_assigned_authorities')
        if(status == 'True' or len(authority) == 0):
            username = request.session['auth_username']
            tokenKey = request.session['auth_token']
            if request.method == 'GET':
                apiGetAssignedRole = getMethod(
                        request=request,
                        method='GET',
                        task = 'GETAUTHORITYLIST',
                        pathInfo=getAuthorityList_URL,
                        )
                data = json.loads(apiGetAssignedRole.text)
                # print('authority list >>> ',data)

                apiGetAssignAuthority = getMethod(
                    request=request,
                    method='GET',
                    task = 'GETASSIGNAUTHORITY',
                    pathInfo=getAssignAuthority.strip() + str(id) + '/',
                    )
                data_1 = json.loads(apiGetAssignAuthority.text)
                authorityRoleName = data_1['data']['roleName']
                authorityLen = len(eval(data_1['data']['assign_authority']))
                # print('data_1 >>> ',data_1)
                # exit()

                try:
                    authority = request.session['authority']
                    dictionary = get_authority_list(authority,'resource_login')
                except:
                    authority = []
                    dictionary = get_authority_list(authority,'admin_login')
                response = headerNotification(request)
                length = response[0]
                requestHeadingData = response[1]
                admin_data = response[2]
                return render(request,'Admin/role-management/view-authorities.html',{'admin_data':admin_data,'dataLength':length,'data':requestHeadingData['data'],'authorityRoleName':authorityRoleName,'authorityLen':authorityLen,'username':username,'data2':data,'tokenKey':tokenKey,'data_1':data_1,'authority':dictionary})
        else:
            return render(request,'403.html') 
    else:
        return redirect('login')



# =========================================================================================================================================================================
#                                                                   VIEW DETAILS
# =========================================================================================================================================================================
def view_role_detail(request,id):
    if request.session.has_key('auth_token'):
        try:
            authority = request.session['authority']
            dictionary = get_authority_list(authority,'resource_login')
        except:
            authority = []
            dictionary = get_authority_list(authority,'admin_login')
        status = checkKey(dictionary,'view_role_detail')
        if(status == 'True' or len(authority) == 0):
            if request.method == 'GET':
                username = request.session['auth_username']
                apiGetSpecificRole = getMethod(
                    request=request,
                    method='GET',
                    task = 'GETSPECIFICROLE',
                    pathInfo=getSpecificRole_URL+str(id)+'/'.strip(),
                    )
                data = json.loads(apiGetSpecificRole.text)
                print('data ::: >>',data)
                date = data['data']['created_at'].split(':')[0].split('T')[0]
                print('this is data : ',date)
                data['data']['date'] = date
                data['data']['authCount'] = len(eval(data['data']['assign_authority']))
                data['data']['resource_count'] = data['resource_count']
                try:
                    authority = request.session['authority']
                    dictionary = get_authority_list(authority,'resource_login')
                except:
                    authority = []
                    dictionary = get_authority_list(authority,'admin_login')
                response = headerNotification(request)
                length = response[0]
                requestHeadingData = response[1]
                admin_data = response[2]
                return render(request,'Admin/role-management/view-detail.html',{'admin_data':admin_data,'dataLength':length,'data':requestHeadingData['data'],'username':username,'data1':data['data'],'authority':dictionary})    
        else:
            return render(request,'403.html') 
    else:
        return redirect('login')
# =========================================================================================================================================================================
#                                                                   VIEW RESOURCES
# =========================================================================================================================================================================
def view_resources(request,id):
    if request.session.has_key('auth_token'):
        try:
            authority = request.session['authority']
            dictionary = get_authority_list(authority,'resource_login')
        except:
            authority = []
            dictionary = get_authority_list(authority,'admin_login')
        status = checkKey(dictionary,'view_resources')
        if(status == 'True' or len(authority) == 0):
            if request.method == 'GET':
                username = request.session['auth_username']
                apiGetSpecificRole = getMethod(
                    request=request,
                    method='GET',
                    task = 'GETSPECIFICROLE',
                    pathInfo=getSpecificRole_URL+str(id)+'/'.strip(),
                    )
                # print(apiGetSpecificRole)
                # exit()
                data = json.loads(apiGetSpecificRole.text)
                data['data']['resource_count'] = data['resource_count']
                data['data']['resources'] = data['resources']
                data = data['data']
                print(data)
                response = headerNotification(request)
                length = response[0]
                requestHeadingData = response[1]
                admin_data = response[2]
                return render(request,'Admin/role-management/view-resources.html',{'admin_data':admin_data,'dataLength':length,'data':requestHeadingData['data'],'username':username,'authority':dictionary,'data1':data})
        else:
            return render(request,'403.html') 
    else:
        return redirect('login')

# =========================================================================================================================================================================
# ===================================================================================================================================================================
#                                                          SEARCH & PAGINATION FOR STUDENT LIST (with querystring or page number)
# ===================================================================================================================================================================
def roleSearch(request):
    if request.session.has_key('auth_token'):
        username = request.session['auth_username']
        roleSearchString = request.GET['search_String']
        page = request.GET['page']

        print('string : ',roleSearchString,'pgno : ',page)
        apiSearchStudentDetails = getMethod(
                request=request,
                method='GET',
                task = 'SEARCHROLE',
                pathInfo=searchRole_URl+'?q='+str(roleSearchString)+'&page='+str(page).strip(),
                )
        data = json.loads(apiSearchStudentDetails.text)
        print('search role daa :: ',data)

        return JsonResponse({'searchResultList': data})
    else:
        return redirect('login')
# =========================================================================================================================================================================
# ==========================================================================================================================================
# ==========================================================================================================================================
def deleteRole(request,id):
    if request.session.has_key('auth_token'):
        apideleteRole = getMethod(
            request=request,
                method="DELETE",
                task = 'DELETESPECIFIROLE',
                pathInfo=deleteRole_URL+str(id)+'/'.strip(),
                ) 
        data = json.loads(apideleteRole.text)
        print('role delete response data >> ',data)
        return JsonResponse({'data':data})
    else:
        return redirect('login')