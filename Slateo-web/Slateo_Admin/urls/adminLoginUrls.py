from django.urls import path
from ..views.adminLoginView import *

urlpatterns = [
    path('login/' , login,  name='login'),
    path('logout/' , logout,  name='logout'),
    path('register/' , register,  name='register'),
    path('recover-password/' , recover_password,  name='recover-password'),
] 
