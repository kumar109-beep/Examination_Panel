from django.db import models
from django.contrib.auth.models import User
from .courseManagementModel import *
from .languageMangementModel import *


# #########################
# ##################################################################################





class Questions_Type(models.Model):
    questio_type_id = models.CharField(max_length=60,blank=True)
    questio_type_name = models.CharField(max_length=60,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=[
                'questio_type_id',
                'questio_type_name'
                ], name='Questions_Type Constraint')
            ]
    def __str__(self):
        return self.questio_type_name


class Questions_Sub_Type(models.Model):
    questio_sub_type_id = models.CharField(max_length=60,blank=True)
    questio_sub_type_name = models.CharField(max_length=60,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=[
                'questio_sub_type_id',
                'questio_sub_type_name'
                ], name='Questions_Sub_Type Constraint')
            ]

    def __str__(self):
        return self.questio_sub_type_name

class Questions_Level_Type(models.Model):
    questio_level_type_id = models.CharField(max_length=60,blank=True)
    questio_level_type_name = models.CharField(max_length=60,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=[
                'questio_level_type_id',
                'questio_level_type_name'
                ], name='Questions_Level_Type Constraint')
            ]
    def __str__(self):
        return self.questio_level_type_name

  



class QuestionBank_Filters(models.Model):
    selectCourse = models.ForeignKey(Courses, blank=True, on_delete=models.PROTECT)
    selectSubject =models.ForeignKey(Subjects, blank=True, on_delete=models.PROTECT)
    Topic = models.CharField(max_length=150, blank=True)
    questionType = models.ForeignKey(Questions_Type, blank=True, on_delete=models.PROTECT)
    subQuestionType = models.ForeignKey(Questions_Sub_Type, blank=True, on_delete=models.PROTECT)
    selectNoOption = models.CharField(max_length=13,blank=True)
    difficultyLevel = models.ForeignKey(Questions_Level_Type, blank=True, on_delete=models.PROTECT)
    correctMarks = models.CharField(max_length=13, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['selectCourse', 'selectSubject','Topic','questionType'], name='Restrict Duplicate QuestionBank_Filters')
        ]

class QuestionBank_Question(models.Model):
    refrence_Questions_Type_Detail = models.ForeignKey(QuestionBank_Filters,on_delete=models.PROTECT)
    selectLanguage =  models.ForeignKey(LanguageManagement, blank=True, on_delete=models.PROTECT)
    question = models.TextField(blank=True)
    optionList = models.TextField(blank=True)
    sameQuestionrefrence = models.CharField(max_length=60,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=[
                'refrence_Questions_Type_Detail',
                'selectLanguage',
                'question',
                'optionList',
                ], name='QuestionBank_Question Constraint')
        ]

