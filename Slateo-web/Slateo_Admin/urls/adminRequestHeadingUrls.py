from django.urls import path
from ..views.adminRequestHeadingView import *

urlpatterns = [
    path('request_heading' , request_heading_detail,  name='request_heading_detail'),
    path('markAllAsRead' , markAllAsRead,  name='markAllAsRead'),
    path('notificationPagination' , notificationPagination,  name='notificationPagination'),
    path('deleteAllNotifications' , deleteAllNotifications,  name='deleteAllNotifications'),
    path('deleteNotifications/<int:id>' , deleteNotifications,  name='deleteNotifications'),

]