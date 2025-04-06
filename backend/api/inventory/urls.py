from django.urls import path
from .views import (
    ProductCreateView,
    ProductListView,
    ProductUpdateView,
    ProductDeleteView,
)

urlpatterns = [
    path("create", ProductCreateView.as_view(), name="create"),
    path("list", ProductListView.as_view(), name="list"),
    path("update/<slug:slug>/", ProductUpdateView.as_view(), name="update"),
    path("delete/<slug:slug>/", ProductDeleteView.as_view(), name="delete"),
]
