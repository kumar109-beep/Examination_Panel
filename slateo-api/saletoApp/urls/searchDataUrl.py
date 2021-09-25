

from ..views.searchDataView import *
from django.urls import path

urlpatterns = [
    path('api/studentSearch/', studentSearch, name='studentSearch'),
    path('api/batchSearch/', batchSearch, name='batchSearch'),
    path('api/resourceSearch/', resourceSearch, name='resourceSearch'),
    path('api/roleSearch/', roleSearch, name='roleSearch'),
    path('api/questionFilterData/', questionFilterData, name='questionFilterData'),
    path('api/questionFilterBar/', questionFilterBar, name='questionFilterBar'),
    path('api/questionAddTo_paper/', questionAddTo_paper, name='questionAddTo_paper'),
    path('api/examManagementSearch/', examManagementSearch, name='examManagementSearch'),
    path('api/courseTypeSearch/', courseTypeSearch, name='courseTypeSearch'),
    path('api/SubjectsSearch/', SubjectsSearch, name='SubjectsSearch'),
    path('api/checkExistDataStudent/', checkExistDataStudent, name='checkExistDataStudent'),
    path('api/checkExistDataResource/', checkExistDataResource, name='checkExistDataResource'),
    path('api/checkExistDataAdmin/', checkExistDataAdmin, name='checkExistDataAdmin'),
    path('api/CourseSearch/', CourseSearch, name='CourseSearch'),
    path('api/AssignSubjectToCourseSearch/', AssignSubjectToCourseSearch, name='AssignSubjectToCourseSearch'),
    path('api/resultFilterData/', resultFilterData, name='resultFilterData'),
    path('api/examPaper_search/', examPaper_search, name='examPaper_search'),
    path('api/searchStudent_yeariwse/', searchStudent_yeariwse, name='searchStudent_yeariwse'),
    path('api/searchStudent_regis_or_mob/', searchStudent_regis_or_mob, name='searchStudent_regis_or_mob'),
    path('api/searchBatchCourse_CourseType/', searchBatchCourse_CourseType, name='searchBatchCourse_CourseType'),
    path('api/searchExamCourse_CourseType_year/', searchExamCourse_CourseType_year, name='searchExamCourse_CourseType_year'),
    ]
