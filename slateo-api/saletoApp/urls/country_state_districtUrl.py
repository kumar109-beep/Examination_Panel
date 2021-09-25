

from ..views.country_state_districtView import *
from django.urls import path

urlpatterns = [
    path('api/country_list/', country_list, name='country_list'),
    path('api/state_list/', state_list, name='state_list'),
]
