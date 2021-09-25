from django.urls import path
from ..views import *

urlpatterns = [
    path('', loginPanel,name='loginPanel'),
    path('logout', logout,name='logout'),

    path('dashboard', dashboard,name='dashboard'),
    path('exam-instructions-guidelines', instructions,name='instructions'),
    path('exam', exam,name='exam'),
    path('getQuestion', getQuestion,name='getQuestion'),

]
# logout
# handler404 = 'exam_panel_app.views.error_404'