from django.db import models
from .studentManagementModel import *

class LanguageManagement(models.Model):
    languageCode = models.CharField(max_length=50,verbose_name="Group ID")
    languageName = models.CharField(max_length=50,verbose_name="Gacth Name")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def __str__(self):
        return self.languageName