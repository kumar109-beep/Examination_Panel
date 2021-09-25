from django.urls import path
from ..views.adminResultManagementView import *

urlpatterns = [
    path('assign_evaluator/<int:id>' , assign_evaluator,  name='assign_evaluator'),
    path('evaluate_answers' , evaluate_answers,  name='evaluate_answers'),
    path('response/<int:id>' , response,  name='response'),

    path('evaluate' , evaluate,  name='evaluate'),
    path('edit-evaluate' , edit_evaluate,  name='edit_evaluate'),
    path('evaluated' , evaluated,  name='evaluated'),
    path('evaluators' , evaluators,  name='evaluators'),

    path('report-card-published' , report_card_published,  name='report_card_published'),
    path('report-card' , report_card,  name='report_card'),
    path('student-report-card' , student_report_card,  name='student_report_card'),
    path('under-evaluation' , under_evaluation,  name='under_evaluation'),
    path('getFilteredResources/<int:id>' , getFilteredResources,  name='getFilteredResources'),
    path('allocateEvaluaters' , allocateEvaluaters,  name='allocateEvaluaters'),

    path('completedPapersPaginate' , completedPapersPaginate,  name='completedPapersPaginate'),
    path('completedPapersSearch' , completedPapersSearch,  name='completedPapersSearch'),
    path('SearchPapers' , SearchPapers,  name='SearchPapers'),

    path('reportCardFilter' , reportCardFilter,  name='reportCardFilter'),
    path('evaluateAnswerFilter' , evaluateAnswerFilter,  name='evaluateAnswerFilter'),
    path('completedExams',completedExams,name='completedExams'),
    path('completed-Exams',completedExamsForEvaluator,name='completedExamsForEvaluator'),

    path('pdf/', GeneratePdf.as_view()),
    path('course-wise-exam',courseWise_exam,name='courseWise_exam'),
    path('exam-wise-paper/<int:id>',exam_wise_papers,name='exam_wise_papers'),

]
# 