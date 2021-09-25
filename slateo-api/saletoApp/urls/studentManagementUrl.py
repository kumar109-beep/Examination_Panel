

from ..views.studentManagementView import *
from django.urls import path

urlpatterns = [
    path('api/student_list/', student_list, name='get_student_list'),
    path('api/student_detail/<int:pk>/', student_detail, name='update_student_information'), 
    path('api/sendingEmail/', sendingEmail, name='getSendingEmail'),
    path('api/student_paper/<int:pk>/', student_paper, name='student_paper'), 
    path('api/student_credential/', student_credential, name='student_credential'),
    path('api/sendBulkSmsToStudents/', sendBulkSmsToStudents, name='sendBulkSmsToStudents'),
    path('api/student_csv_without_email/', student_csv_without_email, name='student_csv_without_email'),
    
    
    
]
