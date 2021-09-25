from django.urls import path
from ..views.adminPaperView import *

urlpatterns = [
    path('create_paper' , create_paper,  name='create_paper'),
    path('create_paper_2' , create_paper_2,  name='create_paper_2'),
    path('create_paper_3' , create_paper_3,  name='create_paper_3'),
    path('create_paper_4' , create_paper_4,  name='create_paper_4'),
    path('edit_paper_detail/<int:id>' , edit_paper_detail,  name='edit_paper_detail'),
    path('paper_list' , paper_list,  name='paper_list'),
    path('preview_paper_data' , preview_paper_data,  name='preview_paper_data'),
    path('select_paper_batch_student' , select_paper_batch_student,  name='select_paper_batch_student'),
    path('paper_student_detail' , paper_student_detail,  name='paper_student_detail'),
    path('view_paper_detail/<int:id>' , view_paper_detail,  name='view_paper_detail'),
    path('delete_paper/<int:id>' , delete_paper,  name='delete_paper'),

] 