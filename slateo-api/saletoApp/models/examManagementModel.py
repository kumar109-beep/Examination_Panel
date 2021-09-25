from django.db import models
from .courseManagementModel import *
from .papermanagementModel import *
from .reourceManagementModel import *
from .batchmanagementModel import *

class ExamManagement(models.Model):
    examName = models.CharField(max_length=50,verbose_name="Exam Name")
    examID = models.CharField(max_length=50,verbose_name="Exam ID")
    examType = models.CharField(max_length=50,verbose_name="Exam Type")
    examAssociateCourseType = models.ForeignKey(Type_of_Course, blank=True, on_delete=models.PROTECT)
    examAssociateCourse = models.ForeignKey(Courses, blank=True, on_delete=models.PROTECT)
    batchManagement_mtwom = models.ManyToManyField(BatchtManagement,blank=False)
    examPassword = models.CharField(max_length=30,verbose_name="Exam Password", null=True, blank=True)
    examStartDate =  models.CharField(max_length=10,verbose_name="Exam Start Date", null=True, blank=True)
    examEndDate =  models.CharField(max_length=10,verbose_name="Exam End Date", null=True, blank=True)
    examStatus = models.CharField(max_length=50,verbose_name="Exam Status", default="Up Coming")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def __str__(self):
        return self.examName
  

class Eaxm_Paper(models.Model):
    exam_management_fk = models.ForeignKey(ExamManagement,blank=True, on_delete=models.PROTECT)
    examPapers = models.ForeignKey(PaperManagement,blank=True, on_delete=models.PROTECT)
    paperStartDate =  models.CharField(max_length=10,verbose_name="Paper Start Date", null=True, blank=True)
    paper_time_start = models.CharField(max_length=10,verbose_name="Start Time", null=True, blank=True)
    paper_procter = models.ForeignKey(ResourceManagement,blank=True, on_delete=models.PROTECT)
    start_date = models.CharField(max_length=50, verbose_name="evaluate start date")
    end_date = models.CharField(max_length=50, verbose_name="evaluate end date")
    assign_evaluator = models.ManyToManyField(ResourceManagement,related_name='assign_evaluator',blank=True)
    editStatus = models.CharField(max_length=50,verbose_name="Edit Status", default="In Progress")
    paperStatus = models.CharField(max_length=50,verbose_name="Paper Status", default="In Progress")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def __str__(self):
        return str(self.exam_management_fk)
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['exam_management_fk','examPapers','paperStartDate'], name='Eaxm_Paper Management')
        ]