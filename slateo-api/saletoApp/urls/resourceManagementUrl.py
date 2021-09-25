from ..views.resourceManagementView import *
from django.urls import path

urlpatterns = [
    path('api/resource_list/', resource_list, name='resource_list'),
    path('api/resource_detail/<int:pk>/',resource_detail, name='resource_detail'),
]
