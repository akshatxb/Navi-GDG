from django.http import HttpResponse


def home_view(request):
    return HttpResponse("Hello, world. You're at the home page.")


def about_view(request):
    return HttpResponse("Hello, world. You're at the about page.")
