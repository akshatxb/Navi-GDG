from rest_framework.decorators import api_view
from django.http import HttpResponse
from django_ratelimit.decorators import ratelimit


@api_view(["GET"])
@ratelimit(key="ip", rate="10/m", block=True)
def home_view(request):
    return HttpResponse("This is Home Page")


@api_view(["GET"])
@ratelimit(key="ip", rate="10/m", block=True)
def about_view(request):
    return HttpResponse("This is About Page")
