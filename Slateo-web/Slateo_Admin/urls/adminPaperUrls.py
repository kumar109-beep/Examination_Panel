from django.urls import path
from ..views.adminPaperView import *

urlpatterns = [
    path('create_paper' , create_paper,  name='create_paper'),
    path('getQues' , getQues,  name='getQues'),
    path('edit_paper_detail/searchTopic' , searchTopic,  name='searchTopic'),
    path('edit_paper_detail/<int:id>' , edit_paper_detail,  name='edit_paper_detail'),
    path('paper_list' , paper_list,  name='paper_list'),
    path('submitPaper' , submitPaper,  name='submitPaper'),
    path('getAllquestionType' , getAllquestionType,  name='getAllquestionType'),
    path('view_paper_detail/<int:id>' , view_paper_detail,  name='view_paper_detail'),
    path('questionSearch' , questionSearch,  name='questionSearch'),
    path('QuestionFilterData' , QuestionFilterData,  name='QuestionFilterData'),
    path('paper-approval-list' , paper_approval_list,  name='paper_approval_list'),
    path('paper-approval-view/<int:id>' , paper_approval_view,  name='paper_approval_view'),
    path('deletePaper/<int:id>' , deletePaper,  name='deletePaper'),
    path('paperSearch',paperSearch,name='paperSearch'),
    path('filter_paper_question_Data',filter_paper_question_Data,name='filter_paper_question_Data'),


] 
# 