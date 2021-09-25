

from ..views.languageMangementViews import *
from django.urls import path

urlpatterns = [
    path('api/language_list/', language_list, name='language_list'),
]
