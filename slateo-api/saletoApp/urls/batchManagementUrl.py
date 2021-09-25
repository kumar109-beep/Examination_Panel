

from ..views.batchManagementView import *
from django.urls import path,include
from knox import views as knox_views

urlpatterns = [
    path('api/batch_list/', batch_list, name='batch_list'),
    path('api/batch_detail/<int:pk>/', batch_detail, name='batch_detail'),
]
