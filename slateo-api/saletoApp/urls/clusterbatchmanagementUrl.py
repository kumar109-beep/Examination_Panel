

from ..views.clusterbatchmanagementView import *
from django.urls import path

urlpatterns = [
    path('api/cluster_list/', cluster_list, name='cluster_list'),
    path('api/cluster_detail/<int:pk>/', cluster_detail, name='cluster_detail'),
]
