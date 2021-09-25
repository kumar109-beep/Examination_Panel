baseURL = 'http://13.233.247.133/'
# baseURL = 'http://127.0.0.1:5000/'
signup_URL = baseURL + 'api/register/'
login_URL = baseURL + 'api/login/'
resetPassword_URL = baseURL + 'api/password_reset/'

# Student Management URLS
registerStudent_URL = baseURL + 'api/student_list/'
studentList_URL = baseURL + 'api/student_list/'
studentDetail_URL = baseURL + 'api/student_detail/'
updateStudentDetail_URL = baseURL + 'api/student_detail/'
getSubjectFROMCOURSESelected_URL = baseURL + 'api/getSubjectList_formCourse/'
sendCredential_URL = baseURL + 'api/student_credential/'
sendBulkCredential_URL = baseURL + 'api/sendBulkSmsToStudents/'

# Batch Management URLS
createBatch_URL = baseURL + 'api/batch_list/'
getBatchList_URL = baseURL + 'api/batch_list/'
updateBatch_URL = baseURL + 'api/batch_detail/'
deleteBatch_URL = baseURL + 'api/batch_detail/'

createGroup_URL = baseURL + 'api/group_list/'
getGroupList_URL = baseURL + 'api/group_list/'
updateGroup_URL = baseURL + 'api/group_detail/'
deleteGroup_URL = baseURL + 'api/group_detail/'

createcluster_URL = baseURL + 'api/cluster_list/'
getClusterList_URL = baseURL + 'api/cluster_list/'
updateCluster_URL = baseURL + 'api/cluster_detail/'
filterStudent_URL = baseURL + 'api/searchStudent_yeariwse/'
add_new_searchStudent_URL = baseURL + 'api/searchStudent_regis_or_mob/'



# Paper management URLS
createPaper_URL = baseURL + 'api/paper_list/'
paper_list_URL = baseURL + 'api/paper_list/'
search_paper_list_URL = baseURL + 'api/examPaper_search/'

updatePaper_URL = baseURL + 'api/paper_detail/'
deletePaper_URL = baseURL + 'api/paper_detail/'

getSpecificQuestionList_URL = baseURL + 'api/questionAddTo_paper/'
addExampaper_URl = baseURL + 'api/paper_list/'
getSpecificPaper_URL = baseURL + 'api/paper_detail/'
upadateSpecificPaper_URL = baseURL + 'api/paper_detail/'
updatePaperStatus_URL = baseURL + 'api/paper_aprove/'



# Authority management URLS
createAuthority_URL = baseURL + 'api/authority_list/'
getAuthorityList_URL = baseURL + 'api/authority_list/'
updateSpecificAuthority_URL = baseURL + 'api/authority_detail/'
deleteAuthority_URL = baseURL + 'api/authority_detail/'

# Role/Designation Management URLS
createRole_URL = baseURL + 'api/role_list/'
getRoleList_URL = baseURL + 'api/role_list/'
getAssignAuthority = baseURL + 'api/role_detail/'
getSpecificRole_URL = baseURL + 'api/role_detail/'
updateSpecificRole_URL = baseURL + 'api/role_detail/'
getSpecificAssignedRole_URL = baseURL + 'api/assignRoleToAuthority_detail/'



# Resource Management URLS 
addResource_URL = baseURL + 'api/resource_list/'
getResourceList_URL = baseURL + 'api/resource_list/'
resourceDetail_URL = baseURL + 'api/resource_detail/'
deleteResource_URL = baseURL + 'api/resource_detail/'


# Course Management URLS 
addCourse_URL = baseURL + 'api/course_list/'
getCourseList_URL = baseURL + 'api/course_list/'
deleteCourse_URL = baseURL + 'api/course_detail/'
getSubjectAccordingToCourse_URL = baseURL + 'api/getSubjectAccordingToCourse/'


# Course Management URLS 
addSubject_URL = baseURL + 'api/subject_list/'
getSubjectList_URL = baseURL + 'api/subject_list/'
deleteSubject_URL = baseURL + 'api/subject_detail/'
addCourseType_URL = baseURL + 'api/courseType_list/'
getCourseTypeList_URL = baseURL + 'api/courseType_list/'
getCourseSubjectList_URL = baseURL + 'api/assignCourse_list/'
getSpecificCourse_URL = baseURL + 'api/course_detail/'
getSpecificCourseType_URL = baseURL + 'api/courseTypeType_detail/'
getSpecificSubject_URL = baseURL + 'api/subject_detail/'
getSpecificSubjectToCourse_URL = baseURL + 'api/assignCourse_detail/'
getSubjectToCourseList_URL = baseURL + 'api/assignCourse_list/'
getassignSubjectTotopic_list_URL = baseURL + 'api/assignSubjectTotopic_list/'
addtopic_list_URL = baseURL + 'api/assignSubjectTotopic_list/'
getCourseTypeList = baseURL + 'api/courseType_list/'
getSpecificCourseType = baseURL + 'api/courseTypeType_detail/'
getSpecificCourse = baseURL + 'api/course_detail/'



# Serach APIs URLS
searchStudent_URl = baseURL + 'api/studentSearch/'
searchBatch_URl = baseURL + 'api/batchSearch/'
searchResources_URl = baseURL + 'api/resourceSearch/'
searchRole_URl = baseURL + 'api/roleSearch/'
searchQuestion_URl = baseURL + 'api/questionFilterBar/'
searchExam_URL = baseURL + 'api/examManagementSearch/'
searchCourseType_URL = baseURL + 'api/courseTypeSearch/'
searchSubjectType_URL = baseURL + 'api/SubjectsSearch/'
searchCourse_URL = baseURL + 'api/CourseSearch/'
searchSubjectToCourse_URL = baseURL + 'api/AssignSubjectToCourseSearch/'
checkExistDataStudent_URL = baseURL + 'api/checkExistDataStudent/'
checkExistDataResource_URL = baseURL + 'api/checkExistDataResource/'
checkExistDataAdminProfile_URL = baseURL + 'api/checkExistDataAdmin/'
assignEvaluatorSearch_URL = baseURL + 'api/resultFilterData/'


# QUESTION BANK MANAGEMENT URLS
addQuestion_URl = baseURL + 'api/questionBank_list/'
getQuestionList_URl = baseURL + 'api/questionBank_list/'
getspecificQuestion_list_URL = baseURL + 'api/questionBank_detail/'
updateSpecificQuestion_URL = baseURL + 'api/questionBank_detail/'
viewSpecificQuestion_URL = baseURL + 'api/questionBank_view/'

filterQuestion_URL = baseURL + 'api/questionFilterData'


# ADMIN PROFILE APIs URLS
getSpecificAdmin_URl = baseURL + 'api/adminProfile_detail/'
updatePasswordAdmin_URl = baseURL + 'api/change-password/'



# EXAM MANAGEMENT URLS
getPaperList_URL = baseURL + 'api/paper_list/'
createExam_URL = baseURL + 'api/examManagement_list/'
getExamList_URL = baseURL + 'api/examManagement_list/'
getSpecificExam_URL = baseURL + 'api/examManagement_detail/'
updateExam_URL = baseURL + 'api/examManagement_detail/'
papers_accor_course_URL = baseURL + 'api/getPaperAccordingToCourse/'
filterExam_URL = baseURL + 'api/check_exam_coming_status/'
checkExamName_URL = baseURL + 'api/checkexistinExamName/'
checkExamId_URL = baseURL + 'api/checkexistinExamNameCode/'
filterBatch_URL = baseURL + 'api/searchBatchCourse_CourseType/'



# RESULT MANAGEMENT URLS
getCompletedExamList_URL = baseURL + 'api/getPaperExamList/'
getSelectedResourceList_URL = baseURL + 'api/resource_according_to_subject/'
update_addEvaluators_URL = baseURL + 'api/complete_exam_detail/'
getCompletedExamsEvaluators_URL = baseURL + 'api/complete_examList/'






#Language
getlanguage_list = baseURL + 'api/language_list/'
getquestionType = baseURL + 'api/questions_type/'
getquestionSubType = baseURL + 'api/questions_sub_type/'
getquestionLevel = baseURL + 'api/questionBank_level_type/'




# STATE & COUNTRY URLs
getCountry_list = baseURL + 'api/country_list/'
getState_list = baseURL + 'api/state_list/'




# DELETE URLs
deleteCourseType_URL = baseURL + 'api/courseTypeType_detail/'
deleteCourse_URL = baseURL + 'api/course_detail/'
deleteSubject_URL = baseURL + 'api/subject_detail/'
deleteSubjectToCourse_URL = baseURL + 'api/assignCourse_detail/'
deleteRole_URL = baseURL + 'api/role_detail/'




# REQUEST HEADINg URLs
getrequestHeading_URL = baseURL + 'api/request_heading/'
updaterquestHeading_URL =   baseURL + 'api/request_heading_status/'
markAllAsRead_URL =   baseURL + 'api/status_read_all/'
request_heading_all_URL =   baseURL + 'api/request_heading_all/'
remove_all_notification_URL =   baseURL + 'api/remove_all_notification/'
remove_specific_notification_URL =   baseURL + 'api/request_heading_status/'






