

from ..views.home import *
from django.urls import path

urlpatterns = [
    path('', home, name='home'),
]
