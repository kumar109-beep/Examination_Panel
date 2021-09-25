from django.db import models


class RequestHeading(models.Model):
    requestID = models.CharField(max_length=50, verbose_name="Request ID")
    request_author = models.CharField(max_length=50, verbose_name="Request Author", null=False)
    request_action_description = models.TextField(verbose_name="Request Action", default='[]')
    request_action_url = models.CharField(max_length=50,verbose_name="Request Action URL", default='[]')
    request_view_status = models.CharField(max_length=50,verbose_name="Request View Status", default='True')
    request_time = models.DateTimeField(auto_now_add=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

   
