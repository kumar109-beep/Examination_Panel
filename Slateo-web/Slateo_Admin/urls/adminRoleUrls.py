from django.urls import path
from ..views.adminRoleView import *

urlpatterns = [
    path('add_role' , add_role,  name='add_role'),
    path('edit_role_authority' , edit_role_authority,  name='edit_role_authority'),
    path('edit_roles/<int:id>' , edit_roles,  name='edit_roles'),
    path('role_list' , role_list,  name='role_list'),
    path('preview_role_data' , preview_role_data,  name='preview_role_data'),
    path('select_authorities' , select_authorities,  name='select_authorities'),
    path('select_resources' , select_resources,  name='select_resources'),
    path('view_assigned_authorities/<int:id>' , view_assigned_authorities,  name='view_assigned_authorities'),
    path('view_role_detail/<int:id>' , view_role_detail,  name='view_role_detail'),
    path('view_resources/<int:id>' , view_resources,  name='view_resources'),
    path('roleSearch',roleSearch,name='roleSearch'),
    path('deleteRole/<int:id>',deleteRole,name='deleteRole'),

    ] 