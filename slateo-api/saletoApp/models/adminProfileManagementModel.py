from django.db import models
from django.contrib.auth.models import User
from .country_state_districtModel import *

class Profile(models.Model):
    refrence_user = models.OneToOneField(User, on_delete=models.PROTECT)
    name = models.CharField(max_length=50, blank=True)
    birth_date =models.CharField(max_length=13, blank=True)
    gender =models.CharField(max_length=10, blank=True)
    mobile_number = models.CharField(max_length=10, blank=True)
    country =  models.ForeignKey(Country, on_delete=models.PROTECT, null=True)
    state =  models.ForeignKey(State, on_delete=models.PROTECT, null=True)
    city = models.CharField(max_length=30, blank=True)
    pincode = models.CharField(max_length=6, blank=True)
    address = models.TextField(blank=True)
    images = models.FileField(upload_to="Upload_Images/adminImages/", null=True)
    signature = models.FileField(upload_to="Upload_Images/adminSignature/", null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)