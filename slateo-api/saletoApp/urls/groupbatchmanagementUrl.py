

from ..views.groupbatchmanagementView import *
from django.urls import path,include
from knox import views as knox_views

urlpatterns = [
    path('api/group_list/', group_list, name='group_list'),
    path('api/group_detail/<int:pk>/', group_detail, name='group_detail'),
    # path('api/getListCourse/', getListCourse, name='degree_type'),
    # path('api/add_course/', add_course, name='add_course'),
    # path('api/getListsubject/', getListsubject, name='degree_type'),
    # path('api/add_subject/', add_subject, name='add_subject'),
]
