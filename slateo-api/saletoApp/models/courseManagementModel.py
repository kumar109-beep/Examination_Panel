from django.db import models
from .studentManagementModel import *


class Type_of_Course(models.Model):
    courseTypeID = models.CharField(max_length=50,verbose_name="Course ID")
    courseTypeName = models.CharField(max_length=50,verbose_name="Course Name")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['courseTypeID','courseTypeName'], name='Restrict Duplicate Type Of Course')
        ]
    def __str__(self):
        return self.courseTypeName

        


class Courses(models.Model):
    courseID = models.CharField(max_length=50,verbose_name="Course ID")
    courseType = models.ForeignKey(Type_of_Course, on_delete=models.PROTECT, null=True)
    courseName = models.CharField(max_length=50,verbose_name="Course Name")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['courseID','courseType','courseName'], name='Restrict Duplicate Course')
        ]
    def __str__(self):
        return self.courseName


class Subjects(models.Model):
    subjectID = models.CharField(max_length=50,verbose_name="Subject ID")
    subjectName = models.CharField(max_length=50,verbose_name="Subject Name")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['subjectID','subjectName'], name='Restrict Duplicate Subject')
        ]
    def __str__(self):
        return self.subjectName



class AssignSubjectToCourse(models.Model):
    type_of_courseFK = models.ForeignKey(Type_of_Course, on_delete=models.PROTECT, null=True,verbose_name="Type Of Course")
    courseFK = models.OneToOneField(Courses, on_delete=models.PROTECT, null=True)
    subjectNameFK = models.ManyToManyField(Subjects,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)



class AssignTopicToSubject(models.Model):
    select_courseFK = models.ForeignKey(Courses, on_delete=models.PROTECT, null=True,verbose_name="Type Of Course")
    selectsubjectFK = models.ForeignKey(Subjects, on_delete=models.PROTECT, null=True)
    topicsList = models.TextField(verbose_name="Topic List")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['select_courseFK', 'selectsubjectFK'], name='Restrict Duplicate Entry')
        ]
    def __str__(self):
        return str(self.select_courseFK)