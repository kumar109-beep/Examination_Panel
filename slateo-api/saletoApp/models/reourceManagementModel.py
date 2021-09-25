from django.db import models
from .rolesMangementModel import *
from .courseManagementModel import *
from .country_state_districtModel import *
from django.contrib.auth.models import User



class ResourceManagement(models.Model):
    referUser = models.OneToOneField(User, on_delete=models.PROTECT)
    fullName = models.CharField(max_length=50, verbose_name="Resource Full Name", default="NA", blank=False)
    dateOfBirth = models.CharField(max_length=15, verbose_name="Date Of Birth", default="NA", blank=False)
    gender = models.CharField(max_length=10, verbose_name="Gender", default="NA", blank=False)
    role_designation = models.ManyToManyField(RolesManagement,blank=True)
    subject_speciality =  models.ForeignKey(Subjects, on_delete=models.PROTECT, null=True)
    mobileNumber = models.CharField(max_length=10, verbose_name="Mobile Number")
    country =  models.ForeignKey(Country, on_delete=models.PROTECT, null=True)
    state =  models.ForeignKey(State, on_delete=models.PROTECT, null=True)
    address = models.TextField(verbose_name="Addresss", default="NA", blank=False)
    district = models.CharField(max_length=30, verbose_name="District", default="NA", blank=False)
    pincode = models.CharField(max_length=6, verbose_name="Pin Code", default="NA", blank=False)
    # Education && Experience
    education = models.TextField(verbose_name="Education", default="NA", blank=True)
    experience = models.TextField(verbose_name="Experience", default="NA", blank=True)
    # Photo && Images
    images = models.FileField(upload_to="Upload_Images/resourceImages/", null=True)
    signature = models.FileField(upload_to="Upload_Images/resourceSignature/", null=True)
    # Created Time
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
