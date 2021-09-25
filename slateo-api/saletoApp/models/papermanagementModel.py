from django.db import models
from .courseManagementModel import *

# Model to store the list of logged in users
class PaperManagement(models.Model):
    paperID = models.CharField(max_length=50,verbose_name="Paper ID")
    paperName = models.CharField(max_length=50,verbose_name="Paper Name")
    paperAssociateCourse = models.ForeignKey(Courses, blank=True, on_delete=models.PROTECT)
    paperAssociateSubject = models.ForeignKey(Subjects, blank=True, on_delete=models.PROTECT)
    paperTotalMarks = models.CharField(max_length=4,verbose_name="Total Marks", null=True, blank=True)
    paperPassingMark = models.CharField(max_length=4,verbose_name="Passing Marks", null=True, blank=True)
    paperStatus = models.CharField(max_length=15,verbose_name="Paper Status", null=True, blank=True)
    paperDeafaultLanguage = models.CharField(max_length=60,verbose_name="Paper Deafult Language", null=True, blank=True)
    paperLanguage = models.CharField(max_length=60,verbose_name="Paper Language", null=True, blank=True)
    paperGuideLines = models.TextField(verbose_name="Paper Guidelines", null=True, blank=True)
    totalPaperTime = models.CharField(max_length=8,verbose_name="Total Time", null=True, blank=True)
    totalNoSection = models.CharField(max_length=4,verbose_name="Total Section", null=True, blank=True)
    totalnumberOuestion = models.CharField(max_length=4,verbose_name="Total Number Of Question", null=True, blank=True)
    sectionDetails = models.TextField(verbose_name="Section Detail", null=True, blank=True)
    SectionWiseQuestionList = models.TextField(verbose_name="Question Detail", null=True, blank=True)
    automatedSet = models.BooleanField(default=False)
    noOfSets = models.CharField(max_length=4,verbose_name="No of Sets", null=True, blank=True)
    paperRemark = models.TextField(verbose_name="Paper Remarks", default='Done', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def __str__(self):
        return self.paperName

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['paperID'], name='Paper Management')
        ]

