from ..views.adminCountDataView import *
from django.urls import path

urlpatterns = [
    path('api/dashStudentCount/', dashStudentCount, name='dashStudentCount'),
]
