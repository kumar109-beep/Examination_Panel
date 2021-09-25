from django.urls import path
from ..views.adminDashView import *
# from django.conf.urls import handler400, handler403, handler404, handler500


urlpatterns = [
    path('' , home,  name='home'),
    path('updateNotificationStatus',updateNotificationStatus,name='updateNotificationStatus'),
    path('resource-Dashboard',resource_Dashboard,name='resource_Dashboard')

    ] 

# handler404 = '../Slateo_Admin/ErrorViews/handler404'