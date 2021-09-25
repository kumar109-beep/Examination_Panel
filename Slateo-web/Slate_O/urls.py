from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('Slateo_Admin.urls.adminDashUrls')),
    path('', include('Slateo_Admin.urls.adminLoginUrls')),
    path('', include('Slateo_Admin.urls.adminBatchUrls')),
    path('', include('Slateo_Admin.urls.adminStudentUrls')),
    path('', include('Slateo_Admin.urls.adminPaperUrls')),
    path('', include('Slateo_Admin.urls.adminAuthorityUrls')),
    path('', include('Slateo_Admin.urls.adminRoleUrls')),
    path('', include('Slateo_Admin.urls.adminResourceUrls')),
    path('', include('Slateo_Admin.urls.adminProfileUrls')),
    path('', include('Slateo_Admin.urls.adminCourseUrls')),
    path('', include('Slateo_Admin.urls.adminQuestionBankUrls')),
    path('', include('Slateo_Admin.urls.adminExamManagementUrls')),
    path('', include('Slateo_Admin.urls.adminResultManagementUrls')),
    path('', include('Slateo_Admin.urls.adminRequestHeadingUrls')),
    path('', include('Slateo_Admin.urls.adminGradeUrls')),


]
