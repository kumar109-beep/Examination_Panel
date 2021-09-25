from django.urls import path
from ..views.adminProfileView import *

urlpatterns = [
    path('edit_profile' , edit_profile,  name='edit_profile'),
    path('adminprofileDataSearch',adminprofileDataSearch,name="adminprofileDataSearch"),
    path('updateUserPassword',updateUserPassword,name="updateUserPassword"),

] 
