from django.db import models
from .studentManagementModel import *

class GroupBatchtManagement(models.Model):
    groupID = models.CharField(max_length=50,verbose_name="Group ID")
    groupName = models.CharField(max_length=50,verbose_name="Gacth Name")
    groupDescription = models.CharField(max_length=15,verbose_name="Group Description", null=True, blank=True)
    groupPressor = models.CharField(max_length=50,verbose_name="Group Precessor", null=True, blank=True)
    groupSuccessor = models.CharField(max_length=15,verbose_name="Group Successor", null=True, blank=True)
    groupSuperVisorID = models.CharField(max_length=20,verbose_name="Supervisor ID", null=True, blank=True)
    groupSuperVisorName = models.CharField(max_length=50,verbose_name="Supervisor Name", null=True, blank=True)
    groupStudentFK = models.ManyToManyField(StudentManagement,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)