

from ..views.examManagementView import *
from django.urls import path,include
from knox import views as knox_views

urlpatterns = [
    path('api/examManagement_list/', examManagement_list, name='examManagement_list'),
    path('api/examManagement_detail/<int:pk>/', examManagement_detail, name='examManagement_detail'),
    path('api/getSpecificExamPaper/', getSpecificExamPaper, name='getSpecificExamPaper'),
    path('api/checkexistinExamName/', checkexistinExamName, name='checkexistinExamName'),
    path('api/checkexistinExamNameCode/', checkexistinExamNameCode, name='checkexistinExamNameCode'),
    path('api/check_exam_coming_status/', check_exam_coming_status, name='check_exam_coming_status'),
    
    
]
