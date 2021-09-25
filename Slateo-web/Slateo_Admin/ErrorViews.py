from django.shortcuts import render_to_response
from django.template import RequestContext

# HTTP Error 400
def handler404(request, exception, template_name="404.html"):
    response = render_to_response(template_name)
    response.status_code = 404
    return response