from django.urls import path
from ..views.adminCourseView import *

urlpatterns = [
    path('add_course', add_course,  name='add_course'),
    path('add_course_type' , add_course_type,  name='add_course_type'),
    path('add_subjects_to_course' , add_subjects_to_course,  name='add_subjects_to_course'),
    path('edit_subjects_to_course/<int:id>' , edit_subjects_to_course,  name='edit_subjects_to_course'),
    path('add_subjects' , add_subjects,  name='add_subjects'),
    path('course_list' , course_list,  name='course_list'),
    path('preview_data' , preview_data,  name='preview_data'),
    path('select_batch_student' , select_batch_student,  name='select_batch_student'),
    path('course-to-subject-list' , subject_list,  name='subject_list'),
    path('topic_list' , topic_list,  name='topic_list'),
    path('add_topic' , add_topic,  name='add_topic'),

    path('chainedCourses',chainedCourses,name='chainedCourses'),
    path('add_topic/chainedSubjects',chainedSubjects,name='chainedSubjects'),
    path('topic_list/chainedSubjects',chainedSubjects,name='chainedSubjects'),
    path('topic_list/searchTopic',searchTopic,name='searchTopic'),
    path('course_type_list',course_type_list,name='course_type_list'),
    path('Subject-list',allSubjects_list,name='allSubjects_list'),
    path('edit-topic',edit_topic,name='edit_topic'),
    path('edit-course-type/<int:id>',edit_course_type,name='edit_course_type'),
    path('edit-course/<int:id>',edit_course,name='edit_course'),
    path('edit-subject/<int:id>',edit_subject,name='edit_subject'),

    # search & pagination urls
    path('courseTypeSearch',courseTypeSearch,name='courseTypeSearch'),
    path('courseSearch',courseSearch,name='courseSearch'),
    path('subjectSearch',subjectSearch,name='subjectSearch'),
    path('subjectToCourseSearch',subjectToCourseSearch,name='subjectToCourseSearch'),
    path('search_Topic',search_Topic,name='search_Topic'),

    # delete urls
    path('deleteCourseType/<int:id>' , deleteCourseType,  name='deleteCourseType'),
    path('deleteCourse/<int:id>' , deleteCourse,  name='deleteCourse'),
    path('deleteSubject/<int:id>' , deleteSubject,  name='deleteSubject'),
    path('deleteSubjectToCourse/<int:id>' , deleteSubjectToCourse,  name='deleteSubjectToCourse'),



] 
# 