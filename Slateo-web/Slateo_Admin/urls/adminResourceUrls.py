from django.urls import path
from ..views.adminResourceView import *

urlpatterns = [
    path('add_resourse_detail' , add_resourse_detail,  name='add_resourse_detail'),
    path('preview_resource_data/<int:id>' , preview_resource_data,  name='preview_resource_data'),
    # path('edit_student_detail' , edit_student_detail,  name='edit_student_detail'),
    path('resource_detail' , resource_detail,  name='resource_detail'),
    path('edit_resource_detail/<int:id>' , edit_resource_detail,  name='edit_resource_detail'),
    path('resourceSearch',resourceSearch,name='resourceSearch'),
    path('resource_list' , resource_list,  name='resource_list'),
    path('resource_through_link' , resource_through_link,  name='resource_through_link'),
    path('upload_excel_resource_data' , upload_excel_resource_data,  name='upload_excel_resource_data'),
    path('delete_resource/<int:id>',delete_resource,name='delete_resource'),
    path('validateResourceUserAvailability',validateResourceUserAvailability,name="validateResourceUserAvailability"),
    ] 
