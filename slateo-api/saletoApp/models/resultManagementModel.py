from django.db import models
from .reourceManagementModel import *
from .papermanagementModel import *


class AssignEvaluator(models.Model):
    paperID = models.ForeignKey(PaperManagement,on_delete=models.PROTECT)
    start_date = models.CharField(max_length=50, verbose_name="Role/Designation Name")
    end_date = models.CharField(max_length=50, verbose_name="Role/Designation Name")
    assign_evaluator = models.ManyToManyField(ResourceManagement,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def __str__(self):
        return str(self.paperID)



# class AssignEvaluator(models.Model):
#     paperID = models.ForeignKey(PaperManagement,on_delete=models.PROTECT)
#     start_date = models.CharField(max_length=50, verbose_name="Role/Designation Name")
#     end_date = models.CharField(max_length=50, verbose_name="Role/Designation Name")
#     assign_evaluator = models.ManyToManyField(ResourceManagement,blank=True)
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)
#     def __str__(self):
#         return str(self.paperID)
   
