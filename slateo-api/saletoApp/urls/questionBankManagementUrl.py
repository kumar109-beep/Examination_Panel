from ..views.questionBankManagementViews import *
from django.urls import path,include

urlpatterns = [
    path('api/questionBank_list/', questionBank_list, name='questionBank_list'),
    path('api/questionBank_detail/<int:pk>/', questionBank_detail, name='questionBank_detail'),
    path('api/questions_type/', questions_type, name='questions_type'),
    path('api/questions_sub_type/', questions_sub_type, name='questions_sub_type'),
    path('api/questionBank_level_type/', questionBank_level_type, name='questionBank_level_type'),
    path('api/questionBank_view/<int:pk>/', questionBank_view, name='questionBank_view'),
]
