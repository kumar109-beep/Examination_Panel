from django.urls import path
from ..views.adminStudentView import *

urlpatterns = [
    path('add_student_detail' , add_student_detail,  name='add_student_detail'),
    path('preview_student_data' , preview_student_data,  name='preview_student_data'),
    path('edit_student_detail' , edit_student_detail,  name='edit_student_detail'),
    path('student_detail' , student_detail,  name='student_detail'),
    path('edit_student_detail/<int:id>' , edit_student_detail,  name='edit_student_detail'),
    path('student_detail/<int:id>' , student_detail,  name='student_detail'),
    path('student_list' , student_list,  name='student_list'),
    path('through_link' , through_link,  name='through_link'),
    path('upload_excel_data' , upload_excel_data,  name='upload_excel_data'),
    path('studentSearch',studentSearch,name='studentSearch'),
    path('getSlectedSubject',getSlectedSubject,name='getSlectedSubject'),
    path('validateUserAvailability',validateUserAvailability,name='validateUserAvailability'),
    path('send_credentail_to_student',send_credentail_to_student,name='send_credentail_to_student'),
    path('send_bulk_credentail_to_student',send_bulk_credentail_to_student,name='send_bulk_credentail_to_student'),

    ] 
