

from ..views.paperManagementView import *
from django.urls import path

urlpatterns = [
    path('api/paper_list/', paper_list, name='paper_list'),
    path('api/paper_detail/<int:pk>/', paper_detail, name='paper_detail'),
    path('api/getPaperAccordingToCourse/<int:pk>/', getPaperAccordingToCourse, name='getPaperAccordingToCourse'),
    path('api/paper_aprove/<int:pk>/', paper_detail, name='paper_detail'),
    path('api/getQuestionPaperWise/<int:pk>/', getQuestionPaperWise, name='getQuestionPaperWise'),
    
    
]
