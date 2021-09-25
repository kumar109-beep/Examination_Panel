from django.urls import path
from ..views.admingradeView import *

urlpatterns = [
    path('create-grade' , create_individualGrade,  name='individualGrade'),
    path('chainedGradeCourses' , chainedGradeCourses,  name='chainedGradeCourses'),
    path('grade-list' , grade_list,  name='grade_list'),
    path('edit-grade' , edit_grade,  name='edit_grade'),
] 
