

from ..views.authorityManagementView import *
from django.urls import path,include
from knox import views as knox_views

urlpatterns = [
    path('api/authority_list/', authority_list, name='authority_list'),
    path('api/authority_detail/<int:pk>/', authority_detail, name='authority_detail'),
    path('api/authorityrole_list/', authorityrole_list, name='authorityrole_list'),
]
