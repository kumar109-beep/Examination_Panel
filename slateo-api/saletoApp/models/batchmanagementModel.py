from django.db import models
from .studentManagementModel import *
from .courseManagementModel import *

class BatchtManagement(models.Model):
    batchID = models.CharField(max_length=50,verbose_name="Batch ID")
    batchName = models.CharField(max_length=50,verbose_name="Bacth Name")
    batchDescription = models.CharField(max_length=150,verbose_name="Batch Description", null=True, blank=True)
    batchCourseType = models.ForeignKey(Type_of_Course, on_delete=models.PROTECT, null=True,verbose_name="Batch Course Type")
    batchCourseName = models.ForeignKey(Courses, on_delete=models.PROTECT, null=True,verbose_name="Batch Course Name")
    batchStudentFK = models.ManyToManyField(StudentManagement,blank=True)
    batchYear = models.CharField(max_length=15,verbose_name="Batch Year", null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)