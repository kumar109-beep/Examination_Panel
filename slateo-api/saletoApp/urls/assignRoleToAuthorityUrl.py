

from ..views.assignRoleToAuthorityViews import *
from django.urls import path,include

urlpatterns = [
    path('api/assignRoleToAuthority_list/', assignRoleToAuthority_list, name='assignRoleToAuthority_list'),
    path('api/assignRoleToAuthority_detail/<int:pk>/', assignRoleToAuthority_detail, name='assignRoleToAuthority_detail'),
]
