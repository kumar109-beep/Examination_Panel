from django.contrib import admin
from django.urls import path, include
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('saletoApp.urls.homeUrl')),
    path('', include('saletoApp.urls.credentialUrl')),
    path('', include('saletoApp.urls.studentManagementUrl')),
    path('', include('saletoApp.urls.batchManagementUrl')),
    path('', include('saletoApp.urls.groupbatchmanagementUrl')),
    path('', include('saletoApp.urls.clusterbatchmanagementUrl')),
    path('', include('saletoApp.urls.paperManagementUrl')),
    path('', include('saletoApp.urls.authorityManagementUrl')),
    path('', include('saletoApp.urls.rolesManagementUrl')),
    path('', include('saletoApp.urls.resourceManagementUrl')),
    path('', include('saletoApp.urls.adminProfileManagementUrl')),
    path('', include('saletoApp.urls.searchDataUrl')),
    path('', include('saletoApp.urls.courseManagementUrl')),
    path('', include('saletoApp.urls.adminCountDataUrl')),
    path('', include('saletoApp.urls.questionBankManagementUrl')),
    path('', include('saletoApp.urls.examManagementUrl')),
    path('', include('saletoApp.urls.resultManagementUrl')),
    path('', include('saletoApp.urls.requestHeadingUrl')),
    path('', include('saletoApp.urls.languageMangementUrl')), 
    path('', include('saletoApp.urls.country_state_districtUrl')), 
    
    
]
