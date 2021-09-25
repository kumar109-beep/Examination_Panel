

from ..views.adminProfileManagementViews import *
from django.urls import path,include

urlpatterns = [
    path('api/adminProfile_detail/<int:pk>/', adminProfile_detail, name='adminProfile_detail'),
]
