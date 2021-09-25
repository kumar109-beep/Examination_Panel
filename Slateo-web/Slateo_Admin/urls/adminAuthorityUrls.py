from django.urls import path
from ..views.adminAuthorityView import *

urlpatterns = [
    path('add_authority' , add_authority,  name='add_authority'),
    path('edit_authority/<int:id>' , edit_authority,  name='edit_authority'),
    path('authority_list' , authority_list,  name='authority_list'),
    path('view_authority_detail/<int:id>' , view_authority_detail,  name='view_authority_detail'),
    path('view_authority_resources/<int:id>' , view_authority_resources,  name='view_authority_resources'),
    path('delete_authority/<int:id>' , delete_authority,  name='delete_authority'),

    ] 