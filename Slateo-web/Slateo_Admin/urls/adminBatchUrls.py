from django.urls import path
from ..views.adminBatchView import *

urlpatterns = [
    # ----------------- BATCH URLs ------------------------------
    path('batch_list' , batch_list,  name='batch_list'),
    path('create_batch' , create_batch,  name='create_batch'),
    path('preview_data' , preview_data,  name='preview_data'),
    path('select_batch_student' , select_batch_student,  name='select_batch_student'),
    path('edit_batch_detail/<int:id>' , edit_batch_detail,  name='edit_batch_detail'),
    path('edit_batch_detail' , edit_batch_detail,  name='edit_batch_detail'),
    path('edit_batch_student_detail/<int:id>' , edit_batch_student_detail,  name='edit_batch_student_detail'),
    path('batch_detail/<int:id>' , batch_detail,  name='batch_detail'),
    path('select_batches' , select_batches,  name='select_batches'),
    path('deleteBatch/<int:id>' , deleteBatch,  name='deleteBatch'),
    path('batch_detail/add_more_batch_student' , add_more_batch_student,  name='add_more_batch_student'),
    # ----------------- GROUP URLs ------------------------------
    # path('group_list' , group_list,  name='group_list'),
    path('create_group' , create_group,  name='create_group'),
    path('edit_group_detail' , edit_group_detail,  name='edit_group_detail'),
    path('edit_group_detail/<int:id>' , edit_group_detail,  name='edit_group_detail'),
    path('group_detail' , group_detail,  name='group_detail'),
    path('group_detail/<int:id>' , group_detail,  name='group_detail'),
    path('preview_group_student' , preview_group_student,  name='preview_group_student'),
    path('deleteGroup/<int:id>' , deleteGroup,  name='deleteGroup'),
    path('select_group_student' , select_group_student,  name='select_group_student'),
    path('group_detail/add_more_group_student' , add_more_group_student,  name='add_more_group_student'),


    # ----------------- CLUSTER URLs ------------------------------
    path('create_cluster_batch' , create_cluster_batch,  name='create_cluster_batch'),
    path('cluster_batch_list' , cluster_batch_list,  name='cluster_batch_list'),
    path('cluster_batch_detail/<int:id>',cluster_batch_detail,  name='cluster_batch_detail'),
    path('edit_cluster_detail/<int:id>' , edit_cluster_detail,  name='edit_cluster_detail'),
    path('select_batch',select_batch,name='select_batch'),
    path('deleteCluster/<int:id>',deleteCluster,name='deleteCluster'),
    path('cluster_batch_detail/add_more_batch',add_more_batch,name='add_more_batch'),

    path('filterStudents' , filterStudents,  name='filterStudents'),
    path('loadMoreStudents' , loadMoreStudents,  name='loadMoreStudents'),
    path('searchNewStudents' , searchNewStudents,  name='searchNewStudents'),

    ] 
# searchNewStudents