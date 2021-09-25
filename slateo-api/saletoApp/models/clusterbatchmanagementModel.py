from django.db import models
from .batchmanagementModel import *

class ClusterBatchtManagement(models.Model):
    clusterID = models.CharField(max_length=50,verbose_name="Cluster ID")
    clusterName = models.CharField(max_length=50,verbose_name="Cluster Name")
    clusterDescription = models.CharField(max_length=15,verbose_name="Cluster Description", null=True, blank=True)
    clusterSuperVisorID = models.CharField(max_length=20,verbose_name="Cluster Supervisor ID", null=True, blank=True)
    clusterSuperVisorName = models.CharField(max_length=50,verbose_name="ClusterSupervisor Name", null=True, blank=True)
    clusterBatchFK = models.ManyToManyField(BatchtManagement,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)