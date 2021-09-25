from django.db import models


class RolesManagement(models.Model):
    roleID = models.CharField(max_length=50, verbose_name="Role/Designation ID")
    roleName = models.CharField(max_length=50, verbose_name="Role/Designation Name")
    assign_authority = models.TextField(verbose_name="Assign Authority", default='[]')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['roleID','roleName'], name='Restrict Duplicate RolesManagement')
        ]


class RolesUpdateHistory(models.Model):
    courseType = models.ForeignKey(RolesManagement, on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    