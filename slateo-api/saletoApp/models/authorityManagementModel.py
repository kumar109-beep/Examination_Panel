from django.db import models
from .studentManagementModel import *
from .rolesMangementModel import *

class AuthorityManagement(models.Model):
    authorityName = models.CharField(max_length=50,verbose_name="Authority Name")
    functionalityName = models.TextField(verbose_name="Functionality Name")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def __str__(self):
        return  self.authorityName
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['authorityName','functionalityName'], name='Restrict Duplicate AuthorityManagement')
        ]





class Functionality(models.Model):
    functionality_name = models.CharField(max_length=50,verbose_name="Authority Name")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def __str__(self):
        return  self.functionality_name

class SubAuthority(models.Model):
    sub_authority = models.CharField(max_length=50,verbose_name="Authority Name")
    authorityName = models.ManyToManyField(Functionality,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def __str__(self):
        return  self.sub_authority


class MainAuthority(models.Model):
    main_authority = models.CharField(max_length=50,verbose_name="Authority Name")
    sub_authorityName =  models.ManyToManyField(SubAuthority,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def __str__(self):
        return  self.main_authority


class AlocateAuthority(models.Model):
    allocated_id = models.CharField(max_length=50, verbose_name="Role/Designation ID")
    main_Authorities = models.ManyToManyField(MainAuthority)
    sub_authorites = models.ManyToManyField(SubAuthority)
    function_authorites = models.ManyToManyField(Functionality)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    # class Meta:
    #     constraints = [
    #         models.UniqueConstraint(fields=['role_id','role_name'], name='Restrict Duplicate Authority_RolesManagement')
    #     ]

class RolesAlocateAuthority(models.Model):
    role_id = models.CharField(max_length=50, verbose_name="Role/Designation ID")
    role_name = models.CharField(max_length=50, verbose_name="Role/Designation Name")
    assignAuthority = models.ManyToManyField(AlocateAuthority)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['role_id','role_name'], name='Restrict Duplicate Authority_RolesManagement')
        ]





