from django.urls import path
from ..views.adminExamManagementView import *

urlpatterns = [
    path('examlist' , examlist,  name='examlist'),
    path('create-exam' , create_exam,  name='create_exam'),
    path('submitExam' , submitExam,  name='submitExam'),
    path('getResource' , getResource,  name='getResource'),
    path('create-exam-step-4' , create_exam_step_4,  name='create_exam_step_4'),
    path('create-exam-step-5' , create_exam_step_5,  name='create-exam-step-5'),
    path('create-exam-step-6' , create_exam_step_6,  name='create-exam-step-6'),
    path('exam-details/<int:id>' , exam_details,  name='exam-details'),
    path('edit-exam/<int:id>' , edit_exam,  name='edit_exam'),
    path('getSpecificCourseIdPaper',getSpecificCourseIdPaper,name='getSpecificCourseIdPaper'),
    path('examSearch',examSearch,name='examSearch'),
    path('exam_Filter',exam_Filter,name='exam_Filter'),
    path('checkExistence',checkExistence,name='checkExistence'),
    path('filterBatches',filterBatches,name='filterBatches'),

    
    ] 
