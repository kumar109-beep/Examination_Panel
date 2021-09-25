from django.db import models
from django.contrib.auth.models import User

class Country(models.Model):
    country_code = models.CharField(max_length=50,verbose_name="Country Code")
    country_name = models.CharField(max_length=50,verbose_name="Country Name")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class State(models.Model):
    country_fk = models.ForeignKey(Country, on_delete=models.PROTECT, null=True,verbose_name="County FK")
    country_state = models.CharField(max_length=50,verbose_name="State Name")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)