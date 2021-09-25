from django.db import models
from django.contrib.auth.models import User
from .courseManagementModel import *
from .country_state_districtModel import *



class StudentManagement(models.Model):
    referUser = models.OneToOneField(User, on_delete=models.PROTECT)
    fullName = models.CharField(max_length=50, verbose_name="Full Name", default="NA", blank=True)
    mobileNumber = models.CharField(max_length=10, verbose_name="Mobile Number")
    dateOfBirth = models.CharField(max_length=15, verbose_name="Date Of Birth", default="NA", blank=True)
    gender = models.CharField(max_length=10, verbose_name="Gender", default="NA", blank=True)
    handy =  models.CharField(max_length=10, verbose_name="Handy", default="NA", blank=True)
    disability =  models.CharField(max_length=5, verbose_name="Disability", default="NA", blank=True)
    images = models.FileField(upload_to="Upload_Images/studentImages/", null=True)
    signature = models.FileField(upload_to="Upload_Images/studentSignature/", null=True)
    guardianName = models.CharField(max_length=60, verbose_name="Guardian Name", default="NA", blank=True)
    guardianEmail = models.CharField(max_length=60, verbose_name="Guardian Email", default="NA", blank=True)
    relationwithGuardian = models.CharField(max_length=30, verbose_name="Relation With Guardian", default="NA", blank=True)
    guardianMobile = models.CharField(max_length=15, verbose_name="Guardian's Mobile", default="NA", blank=True)
    courseTypeFK = models.ForeignKey(Type_of_Course, on_delete=models.PROTECT, null=True)
    courseFK = models.ForeignKey(Courses, on_delete=models.PROTECT, null=True)
    suject = models.ManyToManyField(Subjects,blank=True)
    temp_countryfk =  models.ForeignKey(Country, related_name='temp_country_name', on_delete=models.PROTECT, null=True)
    temp_statefk =  models.ForeignKey(State, related_name='temp_state_name', on_delete=models.PROTECT, null=True)
    temp_district = models.CharField(max_length=40, verbose_name="Temporary District", default="NA", blank=True)
    temp_address = models.TextField(verbose_name="Temporary Address", default="NA", blank=True)
    temp_pincode = models.CharField(max_length=6, verbose_name="Temporary Pincode", default="NA", blank=True)
    temp_vs_perm = models.CharField(max_length=5, verbose_name="Temprary Vs Current", default="NA", blank=True)
    perm_countryfk =  models.ForeignKey(Country, related_name='perm_country_name' ,on_delete=models.PROTECT, null=True)
    perm_statefk =  models.ForeignKey(State, related_name='perm_state_name' ,on_delete=models.PROTECT, null=True)
    perm_district = models.CharField(max_length=40, verbose_name="Permanant District", default="NA", blank=True)
    perm_address = models.TextField(verbose_name="Permanant Address", default="NA", blank=True)
    perm_pincode = models.CharField(max_length=6, verbose_name="Permanant Pincode", default="NA", blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)




