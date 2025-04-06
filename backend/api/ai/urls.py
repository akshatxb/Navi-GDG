from django.urls import path
from .views import assistant_view

urlpatterns = [
    path("generate", assistant_view, name="model-generate"),
]
