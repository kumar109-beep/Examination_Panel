from ..views.requestHeadingView import *
from django.urls import path

urlpatterns = [
    path('api/request_heading/', request_heading, name='request_heading'),
    path('api/request_heading_all/', request_heading_all, name='request_heading_all'),
    path('api/request_heading_status/<int:pk>/',request_heading_status, name='request_heading_status'),
    path('api/status_read_all/',status_read_all, name='status_read_all'),
    path('api/remove_all_notification/',remove_all_notification, name='remove_all_notification'),
]
