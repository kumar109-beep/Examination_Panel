
import requests,json
from .getAuthTokenKey import *

def postMethod(request='',method='',task = '',pathInfo='',userName = '', userEmail = '',userPassword = '',dataList = []):
    tokenKey = getAuthToken(request)
    # =================================================================================    CREDENTIALS & LOGIN MODULE  =======================================================================================================================
    if task == 'LOGIN':
        payload="{\r\n    \"username\": \"" + userName.strip() + "\",\r\n    \"password\": \"" + userPassword.strip() + "\"\r\n}"
        headers = {
            'Authorization': tokenKey,
        'Content-Type': 'application/json'
        }
        url = pathInfo
        response = requests.request(method, url, headers=headers, data=payload)
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
    # ========================================================================================================================================================================================================================================
    # ========================================================================================================================================================================================================================================
    # =================================================================================    STUDENT MANAGEMENT MODULE  ========================================================================================================================
    elif task == 'ADDSTUDENTDETAILS':
        print('======================  Task called!  ==================',dataList)
        payload= {
                'registrationNumber': dataList['registration'],
                'fullName': dataList['studentName'],
                'mobileNumber': dataList['mobile'],
                'emailID': dataList['email'],
                'dateOfBirth': dataList['dob'],
                'gender': dataList['gender'],
                'guardianName': dataList['gardionName'],
                'relationwithGuardian': dataList['gargionrelatio'],
                'guardianEmail': dataList['guardianEmail'],
                'guardianMobile': dataList['guardianContact'],
                'handy': dataList['handy'],
                'disability': dataList['diasabe'],

                'temp_countryfk': dataList['currentcountery'],
                'temp_statefk': dataList['currentstate'],
                'temp_district': dataList['currentdistrict'],
                'temp_address': dataList['currentaddress'],
                'temp_pincode': dataList['currentpincode'],

                'perm_countryfk': dataList['permcountery'],
                'perm_statefk': dataList['premstate'],
                'perm_district': dataList['permdistrict'],
                'perm_address': dataList['premanetaddress'],
                'perm_pincode': dataList['prem_pincode'],

                'courseTypeFK': dataList['courseTypeFK'],
                'courseFK': dataList['courseFK'],
                'suject': dataList['suject']
                }
        payload = json.dumps(payload)
        print('payload >> ',payload)
        headers = {
            'Authorization': tokenKey,
            'Content-Type': 'application/json'
        }
        url = pathInfo
        response = requests.request(method, url, headers=headers, data=payload)

    elif task == 'EDITSTUDENTDETAIL':
        payload="{\r\n    \"registrationNumber\": \"" + dataList[0].strip() + "\",\r\n    \"fullName\": \"" + dataList[1].strip() + "\",\r\n    \"mobileNumber\": \"" + dataList[7].strip() + "\",\r\n    \"emailID\": \"" + dataList[6].strip() + "\",\r\n    \"dateOfBirth\": \"" + dataList[2].strip() + "\",\r\n    \"gender\": \"" + dataList[3].strip() + "\",\r\n    \"temp_address\": \"" + dataList[9].strip() + "\",\r\n    \"temp_country\": \"" + dataList[10].strip() + "\",\r\n    \"temp_state\": \"" + dataList[11].strip() + "\",\r\n    \"temp_district\": \"" + dataList[12].strip() + "\",\r\n    \"temp_pincode\": \"" + dataList[13].strip() + "\",\r\n    \"perm_address\": \"" + dataList[19].strip() + "\",\r\n    \"perm_country\": \"" + dataList[20].strip() + "\",\r\n    \"perm_state\": \"" + dataList[21].strip() + "\",\r\n    \"perm_district\": \"" + dataList[22].strip() + "\",\r\n    \"perm_pincode\": \"" + dataList[23].strip() + "\",\r\n    \"guardianEmail\": \"" + dataList[26].strip() + "\",\r\n    \"handy\": \"" + dataList[24].strip() + "\",\r\n    \"disability\": \"" + dataList[25].strip() + "\",\r\n    \"guardianName\": \"" + dataList[4].strip() + "\",\r\n    \"relationwithGuardian\": \"" + dataList[5].strip() + "\",\r\n    \"guardianEmail\": \"" + dataList[6].strip() + "\",\r\n    \"guardianMobile\": \"" + dataList[8].strip() + "\",\r\n    \"course\": \"" + dataList[14].strip() + "\",\r\n    \"branch\": \"" + dataList[15].strip() + "\",\r\n    \"year\": \"" + dataList[16].strip() + "\"\r\n}"
        headers = {
            'Authorization': tokenKey,
        'Content-Type': 'application/json'
        }
        url = pathInfo
        response = requests.request(method, url, headers=headers, data=payload)
    # ========================================================================================================================================================================================================================================
    # ========================================================================================================================================================================================================================================
    # =================================================================================    BATCH MANAGEMENT MODULE : BATCHES ==========================================================================================================================
    elif task == 'CREATEBATCH':
        payload= {
                "batchID": dataList[0].strip(),
                "batchName": dataList[1].strip(),
                "batchDescription":dataList[2].strip(),
                "batchCourseType": dataList[3].strip(),
                "batchCourseName": dataList[4].strip(),
                "batchStudentFK": dataList[5],
                "batchYear": dataList[6]
                }
        payload = json.dumps(payload)
        print('payload data >> ',payload)
        headers = {
            'Authorization': tokenKey,
        'Content-Type': 'application/json'
        }
        url = pathInfo
        response = requests.request(method, url, headers=headers, data=payload)

    elif task == 'UPDATEBATCH':
        payload="{\r\n    \"batchID\": \"" + dataList[0].strip() + "\",\r\n    \"batchName\": \"" + dataList[1].strip() + "\",\r\n    \"batchDescription\": \"" + dataList[2].strip() + "\",\r\n    \"batchPressor\": \"" + dataList[3].strip() + "\",\r\n    \"batchSuccessor\": \"" + dataList[4].strip() + "\",\r\n    \"batchSuperVisorID\": \"" + dataList[0].strip() + "\",\r\n    \"batchSuperVisorName\": \"" + dataList[0].strip() + "\"\r\n}"
        headers = {
            'Authorization': tokenKey,
        'Content-Type': 'application/json'
        }
        url = pathInfo
        response = requests.request(method, url, headers=headers, data=payload)

    elif task == 'ADD_NEW_STUDENT_IN_BATCH':
        payload={
                "batchID":dataList[0],
                "batchName":dataList[1],
                "batchStudentFK":dataList[2]
                }
        payload = json.dumps(payload)
        
        headers = {
            'Authorization': tokenKey,
        'Content-Type': 'application/json'
        }
        url = pathInfo
        response = requests.request(method, url, headers=headers, data=payload)
    # ========================================================================================================================================================================================================================================
    # ========================================================================================================================================================================================================================================
    # =================================================================================    BATCH MANAGEMENT MODULE : GROUPS  ==========================================================================================================================
    elif task == 'CREATEGROUP':
        payload= {
                "groupID": dataList[0].strip(),
                "groupName": dataList[1].strip(),
                "groupDescription":dataList[2].strip(),
                "groupPressor": dataList[3].strip(),
                "groupSuccessor": dataList[4].strip(),
                "groupSuperVisorID": dataList[5].strip(),
                "groupSuperVisorName": dataList[6].strip(),
                "groupStudentFK": dataList[7]
                }
        payload = json.dumps(payload)
        headers = {
            'Authorization': tokenKey,
        'Content-Type': 'application/json'
        }
        url = pathInfo
        response = requests.request(method, url, headers=headers, data=payload)

    elif task == 'UPDATEGROUP':
        payload="{\r\n    \"groupID\": \"" + dataList[0].strip() + "\",\r\n    \"groupName\": \"" + dataList[1].strip() + "\",\r\n    \"groupDescription\": \"" + dataList[2].strip() + "\",\r\n    \"groupPressor\": \"" + dataList[3].strip() + "\",\r\n    \"groupSuccessor\": \"" + dataList[4].strip() + "\",\r\n    \"groupSuperVisorID\": \"" + dataList[5].strip() + "\",\r\n    \"groupSuperVisorName\": \"" + dataList[6].strip() + "\"\r\n}"
        headers = {
            'Authorization': tokenKey,
        'Content-Type': 'application/json'
        }
        url = pathInfo
        response = requests.request(method, url, headers=headers, data=payload)

    elif task == 'ADD_NEW_STUDENT_IN_GROUP':
        payload={
            "groupID":dataList[0],
            "groupName":dataList[1],
            "groupStudentFK":dataList[2]
            }
        payload = json.dumps(payload)
        
        headers = {
            'Authorization': tokenKey,
        'Content-Type': 'application/json'
        }
        url = pathInfo
        response = requests.request(method, url, headers=headers, data=payload)
    # ======================================================================================================================================================================
    # ======================================================================================================================================================================
    # ========================================================    BATCH MANAGEMENT MODULE : CLUSTERS  ======================================================================
    elif task == 'CREATECLUSTER':
        payload= {
                "clusterID": dataList[0].strip(),
                "clusterName": dataList[1].strip(),
                "clusterDescription":dataList[2].strip(),
                "clusterSuperVisorID": dataList[3].strip(),
                "clusterSuperVisorName": dataList[4].strip(),
                "clusterBatchFK": dataList[5]
                }
        payload = json.dumps(payload)
        headers = {
            'Authorization': tokenKey,
        'Content-Type': 'application/json'
        }
        url = pathInfo
        response = requests.request(method, url, headers=headers, data=payload)

    elif task == 'UPDATECLUSTER':
        payload= {
                "clusterID": dataList[0].strip(),
                "clusterName": dataList[1].strip(),
                "clusterDescription":dataList[2].strip(),
                "clusterSuperVisorID": dataList[3].strip(),
                "clusterSuperVisorName": dataList[4].strip(),
                }
        payload = json.dumps(payload)
        headers = {
            'Authorization': tokenKey,
        'Content-Type': 'application/json'
        }
        url = pathInfo
        response = requests.request(method, url, headers=headers, data=payload)

    elif task == 'ADD_NEW_STUDENT_IN_CLUSTER':
        payload={
            "clusterID":dataList[0],
            "clusterName":dataList[1],
            "clusterBatchFK":dataList[2]
            }
        payload = json.dumps(payload)
        
        headers = {
            'Authorization': tokenKey,
        'Content-Type': 'application/json'
        }
        url = pathInfo
        response = requests.request(method, url, headers=headers, data=payload)
    # ======================================================================================================================================================================
    # ======================================================================================================================================================================
    # ========================================================    PAPER MANAGEMENT MODULE  =================================================================================
    elif task == 'CREATEPAPER':
        payload= {
                "paperID": dataList['paperID'] ,
                "paperName": dataList['paperName'] ,
                "paperAssociateCourse": dataList['paperAssociateCourse'] ,
                "paperTotalMarks": dataList['paperTotalMarks'] ,
                "paperPassingMark": dataList['paperPassingMark'] ,
                "paperCredit": dataList['paperCredit'] ,
                "totalSection": dataList['totalSection'] ,
                # "totalPaperTime": null,
                "totalnumberOuestion": dataList['totalnumberOuestion'] ,
                "sectionDetails": dataList['sectionDetails'] ,
                "questionTypeDetails": dataList['questionTypeDetails'] ,
                "automatedSet": dataList['automatedSet'] ,
                "setsTypeDetails": dataList['setsTypeDetails'] 
                }
        payload = json.dumps(payload)
        headers = {
            'Authorization': tokenKey,
        'Content-Type': 'application/json'
        }
        url = pathInfo
        response = requests.request(method, url, headers=headers, data=payload)

    # ======================================================================================================================================================================
    # ======================================================================================================================================================================
    # ========================================================    AUTHORITY MANAGEMENT MODULE  =================================================================================
    elif task == 'CREATEAUTHORITY':
        payload= {
                "authorityID": dataList['authorityID'] ,
                "authorityName": dataList['authorityName'] ,
                }
        payload = json.dumps(payload)
        headers = {
            'Authorization': tokenKey,
        'Content-Type': 'application/json'
        }
        url = pathInfo
        response = requests.request(method, url, headers=headers, data=payload)

    # ======================================================================================================================================================================
    # ======================================================================================================================================================================
    # ========================================================    ROLE/DEGIGNATION MANAGEMENT MODULE  ======================================================================
    elif task == 'CREATEROLE':
        payload= {
                "roleID": dataList['roleId'] ,
                "roleName": dataList['roleName'] ,
                "assign_authority" : dataList['assign_authority']
                }
        payload = json.dumps(payload)
        print('this is role update payload',payload)
        headers = {
            'Authorization': tokenKey,
        'Content-Type': 'application/json'
        }
        url = pathInfo
        response = requests.request(method, url, headers=headers, data=payload)

    # ======================================================================================================================================================================
    # ======================================================================================================================================================================
    # ========================================================    ROLE/DEGIGNATION MANAGEMENT MODULE  ======================================================================
    elif task == 'ADDRESOURCEDETAILS':
        print('======================  Task called!  ==================',dataList)
        payload= {
                'employeeCode': dataList['employeeCode'],
                'fullName': dataList['resourceName'],
                'dateOfBirth': dataList['dob'],
                'gender': dataList['gender'],
                'role_designation': dataList['department'],
                'subject_speciality': dataList['subject_speciality'],
                'emailID': dataList['email'],
                'mobileNumber': dataList['contact'],
                'country': dataList['country'],
                'state': dataList['state'],
                'address': dataList['address'],
                'district': dataList['district'],
                'pincode': dataList['pincode'],
                'education': dataList['education'],
                'experience': dataList['experience'],
                }
        payload = json.dumps(payload)
        print('payload >> ',payload)
        headers = {
            'Authorization': tokenKey,
            'Content-Type': 'application/json'
        }
        url = pathInfo
        response = requests.request(method, url, headers=headers, data=payload)
    # ======================================================================================================================================================================
    # ======================================================================================================================================================================
    # ========================================================    COURSE MANAGEMENT MODULE  ================================================================================
    elif task == 'CREATECOURSE':
        print('======================  Task called!  ==================',dataList)
        payload= {
                'courseID': dataList['courseID'],
                'courseName': dataList['courseName'],
                'courseType': dataList['courseType'],
                }
        payload = json.dumps(payload)
        headers = {
            'Authorization': tokenKey,
            'Content-Type': 'application/json'
        }
        url = pathInfo
        response = requests.request(method, url, headers=headers, data=payload)
# ========================================================================================================================================
    elif task == 'UPDATECOURSE':
        print('======================  Task called!  ==================',dataList)
        payload= {
                'courseID': dataList['courseID'],
                'courseName': dataList['courseName'],
                'courseType': dataList['courseType'],
                }
        payload = json.dumps(payload)
        headers = {
            'Authorization': tokenKey,
            'Content-Type': 'application/json'
        }
        url = pathInfo
        response = requests.request(method, url, headers=headers, data=payload)
    # ======================================================================================================================================================================
    # ======================================================================================================================================================================
    elif task == 'CREATESUBJECT':
        print('======================  Task called!  ==================',dataList)
        payload= {
                'subjectID': dataList['subjectID'],
                'subjectName': dataList['subjectName'],
                }
        payload = json.dumps(payload)
        headers = {
            'Authorization': tokenKey,
            'Content-Type': 'application/json'
        }
        url = pathInfo
        response = requests.request(method, url, headers=headers, data=payload)

    # ======================================================================================================================================================================
    # ======================================================================================================================================================================
    elif task == 'UPDATESUBJECT':
        print('======================  Task called!  ==================',dataList)
        payload= {
                'subjectID': dataList['subjectID'],
                'subjectName': dataList['subjectName'],
                }
        payload = json.dumps(payload)
        headers = {
            'Authorization': tokenKey,
            'Content-Type': 'application/json'
        }
        url = pathInfo
        response = requests.request(method, url, headers=headers, data=payload)
    # ======================================================================================================================================================================
    elif task == 'CREATECOURSETYPE':
        print('======================  Task called!  ==================',dataList)
        payload= {
                'courseTypeID': dataList['courseTypeId'],
                'courseTypeName': dataList['courseTypeName'],
                }
        payload = json.dumps(payload)
        headers = {
            'Authorization': tokenKey,
            'Content-Type': 'application/json'
        }
        url = pathInfo
        print(payload)
        response = requests.request(method, url, headers=headers, data=payload)
    # ======================================================================================================================================================================
    elif task == 'UPDATECOURSETYPE':
        print('======================  Task called!  ==================',dataList)
        payload= {
                'courseTypeID': dataList['courseTypeId'],
                'courseTypeName': dataList['courseTypeName'],
                }
        payload = json.dumps(payload)
        headers = {
            'Authorization': tokenKey,
            'Content-Type': 'application/json'
        }
        url = pathInfo
        print(payload)
        response = requests.request(method, url, headers=headers, data=payload)

    # ======================================================================================================================================================================
    # ======================================================================================================================================================================
    
    # ======================================================================================================================================================================
    # ======================================================================================================================================================================
    # ========================================================    ADD QUESTION MANAGEMENT MODULE  ======================================================================
    elif task == 'ADDSUBJECTIVEQUESTION':
        print('======================  Task called!  ==================',dataList)
        payload= {
                "selectLanguage": dataList['questionLanguage'],
                "questionType": dataList['questionType'],
                "subQuestionType": dataList['questionSubType'],
                "Topic": dataList['topic'],
                "difficultyLevel": dataList['questionDifficultyLevel'],
                "correctMarks": dataList['questionCorrectMark'],
                "selectCourse": dataList['course'],
                "selectSubject": dataList['subject'],
                'question_data' : dataList['question_data'],
                "sameQuestionrefrence": dataList['sameQuestionrefrence'],
                "addType": dataList['addType'],
                "existingQuestionTypeID": dataList['existingQuestionTypeID'],
                "existingQuestionID": dataList['existingQuestionID'],
                 "lang_id": dataList['lang_id']
                }
        payload = json.dumps(payload)
        print(payload)
        headers = {
            'Authorization': tokenKey,
            'Content-Type': 'application/json'
        }
        url = pathInfo
        response = requests.request(method, url, headers=headers, data=payload)
    

    elif task == 'ADDOBJECTIVEQUESTION':
        payload= {
                "selectLanguage": dataList['questionLanguage'],
                "questionType": dataList['questionType'],
                "subQuestionType": dataList['questionSubType'],
                "Topic": dataList['topic'],
                "difficultyLevel": dataList['questionDifficultyLevel'],
                "correctMarks": dataList['questionCorrectMark'],
                "selectCourse": dataList['course'],
                "selectSubject": dataList['subject'],
                "selectNoOption": dataList['optionCount'],
                'question_data' : dataList['question_data'],
                "sameQuestionrefrence": dataList['sameQuestionrefrence'],
                "addType": dataList['addType'],
                "lang_id": dataList['lang_id'],
                "existingQuestionTypeID": dataList['existingQuestionTypeID'],
                "existingQuestionID": dataList['existingQuestionID']
                }
        payload = json.dumps(payload)
        print(payload)
        headers = {
            'Authorization': tokenKey,
            'Content-Type': 'application/json'
        }
        url = pathInfo
        response = requests.request(method, url, headers=headers, data=payload)
# =========================================================================================================================
    elif task == 'CREATETOPICS':
        print('======================  Task called!  ==================',dataList)
        payload= {
                'select_courseFK': dataList['courseID'],
                'selectsubjectFK': dataList['subjectID'],
                'topicsList': dataList['topicsList']
                }
        payload = json.dumps(payload)
        headers = {
            'Authorization': tokenKey,
            'Content-Type': 'application/json'
        }
        url = pathInfo
        response = requests.request(method, url, headers=headers, data=payload)

    elif task == 'UPDATESUBJECTIVEQUESTION':
        print('======================  Task called!  ==================',dataList)
        payload= {
                'question': dataList['question'],
                'questionType': dataList['questionType'],
                'refrence_Questions_Type_Detail': dataList['sameQuestionrefrence'],
                'add_type':dataList['add_type'],
                }
        payload = json.dumps(payload)
        headers = {
            'Authorization': tokenKey,
            'Content-Type': 'application/json'
        }
        url = pathInfo
        response = requests.request(method, url, headers=headers, data=payload)

    elif task == 'UPDATEOBJECTIVEQUESTION':
#         {
#    "refrence_Questions_Type_Detail":1,
#     "question_data": '[{"Question_English": "bgfnhmfhm", "option": "False|True", "optionStatement": "fbfg<<-|->>bngn"}]',
#     "question": "List is whats kind of data typess retb ?"
#    "selectLanguage":"English"
#  }
        payload= {
                'selectLanguage': dataList['selectLanguage'],
                'question_data': dataList['questionData'],
                'question': dataList['question_data'],
                'add_type': dataList['add_type'],
                'refrence_Questions_Type_Detail' :  dataList['sameQuestionrefrence'],
                }
        payload = json.dumps(payload)
        print('======================  Task called!  ==================',payload)
        headers = {
            'Authorization': tokenKey,
            'Content-Type': 'application/json'
        }
        url = pathInfo
        response = requests.request(method, url, headers=headers, data=payload)
    elif task == 'ADDEXAMPAPER':
        payload= {
            "paperID": dataList['paperID'],
            "paperName": dataList['paperName'],
            "paperAssociateCourse": dataList['paperAssociateCourse'],
            "paperAssociateSubject": dataList['paperAssociateSubject'],
            "paperTotalMarks": dataList['paperTotalMarks'],
            "paperPassingMark": dataList['paperPassingMark'],
            "paperStatus": dataList['paperStatus'],
            "paperLanguage": dataList['paperLanguage'],
            "paperGuideLines": dataList['paperGuideLines'],
            "totalPaperTime": dataList['totalPaperTime'],
            "totalNoSection": dataList['totalSection'],
            "totalnumberOuestion": dataList['totalnumberOuestion'],
            "sectionDetails": dataList['sectionDetails'],
            "SectionWiseQuestionList": dataList['SectionWiseQuestionList'],
            "automatedSet": dataList['automatedSet'],
            "noOfSets": dataList['noOfSets'],
            "paperStatus" : "Completed"
            }
        payload = json.dumps(payload)
        print('====================== paper Task called!  ==================',payload)
        headers = {
            'Authorization': tokenKey,
            'Content-Type': 'application/json'
        }
        url = pathInfo
        
        response = requests.request(method, url, headers=headers, data=payload)
    elif task == 'UPDATEEXAMPAPER':
        payload= {
            "paperID": dataList['paperID'],
            "paperName": dataList['paperName'],
            "paperPassingMark": dataList['paperPassingMark'],
            "paperGuideLines": dataList['paperGuideLines'],
            "SectionWiseQuestionList": dataList['SectionWiseQuestionList'],
            "automatedSet": dataList['automatedSet'],
            "noOfSets": dataList['noOfSets'],
            "paperStatus" : "Completed"
            }
        payload = json.dumps(payload)
        print('====================== paper Task called!  ==================',payload)
        headers = {
            'Authorization': tokenKey,
            'Content-Type': 'application/json'
        }
        url = pathInfo
        
        response = requests.request(method, url, headers=headers, data=payload)

    elif task == 'UPDATEEXAMSTATUS':
        payload= {
            "paperID": dataList['paperID'],
            "paperName": dataList['paperName'],
            "paperStatus": dataList['paperStatus'],
            "paperRemark": dataList['paperRemark'],
            }
        payload = json.dumps(payload)
        print('====================== paper Task called!  ==================',payload)
        headers = {
            'Authorization': tokenKey,
            'Content-Type': 'application/json'
        }
        url = pathInfo
        
        response = requests.request(method, url, headers=headers, data=payload)
    elif task == 'CREATEEXAM':
        payload= {
            "examName" : dataList['examName'],
            "examID" : dataList['examID'],
            "examType" : dataList['examType'],
            "examPassword" : dataList['examPassword'],
            "examStartDate" : dataList['examStartDate'],
            "examEndDate" : dataList['examEndDate'],
            "examPaperTimeTable" : dataList['examPaperTimeTable'],
            "examAssociateCourseType" : dataList['examAssociateCourseType'],
            "examAssociateCourse" : dataList['examAssociateCourse'],
            "examPapers" : dataList['examPapers'],
            "batchManagement_mtwom" : dataList['examBatches'],
            "examStatus":"Upcoming"
            }
        payload = json.dumps(payload)
        print('====================== EXAM Task called!  ==================',payload)
        headers = {
            'Authorization': tokenKey,
            'Content-Type': 'application/json'
        }
        url = pathInfo
        response = requests.request(method, url, headers=headers, data=payload)

    
    elif task == 'UPDATEEXAM':
        payload= {
            "examName" : dataList['examName'],
            "examID" : dataList['examID'],
            "examType" : dataList['examType'],
            "examPassword" : dataList['examPassword'],
            "examStartDate" : dataList['examStartDate'],
            "examEndDate" : dataList['examEndDate'],
            "examPaperTimeTable" : dataList['examPaperTimeTable'],
            "examAssociateCourse" : dataList['examAssociateCourse'],
            "examPapers" : dataList['examPapers'],
            "examStatus": "Upcoming" 
            }
        payload = json.dumps(payload)
        print('====================== EXAM Task called!  ==================',payload)
        headers = {
            'Authorization': tokenKey,
            'Content-Type': 'application/json'
        }
        url = pathInfo
        print(url)
        response = requests.request(method, url, headers=headers, data=payload)


    elif task == 'SENDCREDENTAIL':
        payload= {
            "registration" : dataList['registration']
            }
        payload = json.dumps(payload)
        print('====================== EXAM Task called!  ==================',payload)
        headers = {
            'Authorization': tokenKey,
            'Content-Type': 'application/json'
        }
        url = pathInfo
        print(payload,url)
        response = requests.request(method, url, headers=headers, data=payload)
    
    elif task == 'SENDBULKCREDENTAIL':
        payload= {
            "registration" : dataList['registration']
            }
        payload = json.dumps(payload)
        print('====================== EXAM Task called!  ==================',payload)
        headers = {
            'Authorization': tokenKey,
            'Content-Type': 'application/json'
        }
        url = pathInfo
        print(payload,url)
        response = requests.request(method, url, headers=headers, data=payload)

    elif task == 'UPADTEREQUESTHEADING':
        payload= {
            "requestID" : dataList['requestID'],
            "request_author" : dataList['authorName'],
            "request_view_status" : dataList['request_view_status']
            }
        payload = json.dumps(payload)
        print('====================== Update Request Heading!  ==================',payload)
        headers = {
            'Authorization': tokenKey,
            'Content-Type': 'application/json'
        }
        url = pathInfo
        print(payload,url)
        response = requests.request(method, url, headers=headers, data=payload)

    elif task == 'ASSIGNEVALUATORS':
        payload= {
            "start_date" : dataList['start_date'],
            "end_date" : dataList['end_date'],
            "paperID" : dataList['paperID'],
            "assign_evaluator" : dataList['assign_evaluator'],
            "editStatus" : "Saved"
            }
        payload = json.dumps(payload)
        print('====================== Assign evaluators  ==================',payload)
        headers = {
            'Authorization': tokenKey,
            'Content-Type': 'application/json'
        }
        url = pathInfo
        print(payload,url)
        response = requests.request(method, url, headers=headers, data=payload)

    elif task == 'UPDATEUSERPASSWORD':
        payload= {
            "old_password" : dataList['old_password'],
            "new_password" : dataList['new_password'],
            }
        payload = json.dumps(payload)
        print('====================== UPDATE USER PASSWORD  ==================',payload)
        headers = {
            'Authorization': tokenKey,
            'Content-Type': 'application/json'
        }
        url = pathInfo
        print(payload,url)
        response = requests.request(method, url, headers=headers, data=payload)
    return response






