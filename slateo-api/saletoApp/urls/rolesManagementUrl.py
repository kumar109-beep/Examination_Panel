from ..views.rolesManagementView import *
from django.urls import path

urlpatterns = [
    path('api/role_list/', role_list, name='role_list'),
    path('api/role_detail/<int:pk>/', role_detail, name='role_detail'),
]
