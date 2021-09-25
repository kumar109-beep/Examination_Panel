from django.urls import path
from ..views.adminQuestionBankView import *

urlpatterns = [
    path('add_questions' , add_questions,  name='add_questions'),
    path('add_multiple_questions' , add_multiple_questions,  name='add_multiple_questions'),
    path('question_list' , question_list,  name='question_list'),
    path('chainedSubjects',chainedSubjects,name='chainedSubjects'),
    path('searchTopic',searchTopic,name='searchTopic'),
    path('edit_question/<int:id>',edit_question,name='edit_question'),
    path('filterData',filterData,name='filterData'),
    path('getSpecificQuestion/<int:id>',getSpecificQuestion,name='getSpecificQuestion'),
    path('show_question/<int:id>',show_question,name='show_question'),
    path('question_Search',question_Search,name='question_Search'),
    path('question_show',question_show,name='question_show'),

] 