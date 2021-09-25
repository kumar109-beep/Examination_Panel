

from ..views.resultManagementView import *
from django.urls import path

urlpatterns = [
    path('api/complete_exam_list/', complete_exam_list, name='complete_exam_list'),
    path('api/complete_exam_detail/<int:pk>/', complete_exam_detail, name='complete_exam_detail'),
    path('api/resource_according_to_subject/<int:pk>/', resource_according_to_subject, name='resource_according_to_subject'),
    path('api/student_list_paper_wise/', student_list_paper_wise, name='student_list_paper_wise'),
    path('api/complete_examList/', complete_examList, name='complete_examList'),
    path('api/getPaperExamList/<int:pk>/', getPaperExamList, name='getPaperExamList'),
    path('api/sendReportCardToStudent/', sendReportCardToStudent, name='sendReportCardToStudent'),
    ]
