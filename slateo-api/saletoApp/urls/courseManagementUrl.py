

from ..views.courseManagementView import *
from django.urls import path

urlpatterns = [

    # Add Course Type
    path('api/courseType_list/', courseType_list, name='courseType_list'),
    path('api/courseTypeType_detail/<int:pk>/', courseType_detail, name='courseType_detail'),

    # Add Couse
    path('api/course_list/', course_list, name='course_list'),
    path('api/course_detail/<int:pk>/', course_detail, name='course_detail'),

    # Add Subject
    path('api/subject_list/', subject_list, name='subject_list'),
    path('api/subject_detail/<int:pk>/', subject_detail, name='subject_detail'),

    # Assign Course TO  Subject
    path('api/assignCourse_list/', assignCourse_list, name='assignCourse_list'),
    path('api/assignCourse_detail/<int:pk>/', assignCourse_detail, name='assignCourse_detail'),


    # Assign Topic TO  Subject
    path('api/assignSubjectTotopic_list/', assignSubjectTotopic_list, name='assignSubjectTotopic_list'),
    path('api/assignSubjectTotopic_detail/<int:pk>/', assignSubjectTotopic_detail, name='assignSubjectTotopic_detail'),

    #Get Subject According To Course 
    path('api/getSubjectList_formCourse/', getSubjectList_formCourse, name='getSubjectList_formCourse'),


    path('api/getSubjectAccordingToCourse/<int:pk>/', getSubjectAccordingToCourse, name='getSubjectAccordingToCourse'),
  


]
