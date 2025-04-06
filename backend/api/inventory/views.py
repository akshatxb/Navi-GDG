from rest_framework import generics
from .models import Product
from .serializers import ProductSerializer
from django.utils.decorators import method_decorator
from django_ratelimit.decorators import ratelimit


@method_decorator(ratelimit(key="ip", rate="50/m", block=True), name="dispatch")
class ProductCreateView(generics.CreateAPIView):

    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


@method_decorator(ratelimit(key="ip", rate="50/m", block=True), name="dispatch")
class ProductListView(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        queryset = Product.objects.filter(owner=self.request.user)
        n = self.request.query_params.get("limit", None)
        if n is not None:
            n = int(n)
            queryset = queryset[:n]
        return queryset


@method_decorator(ratelimit(key="ip", rate="50/m", block=True), name="dispatch")
class ProductUpdateView(generics.UpdateAPIView):
    serializer_class = ProductSerializer
    lookup_field = "slug"

    def get_queryset(self):
        queryset = Product.objects.filter(owner=self.request.user)
        return queryset


@method_decorator(ratelimit(key="ip", rate="50/m", block=True), name="dispatch")
class ProductDeleteView(generics.DestroyAPIView):
    serializer_class = ProductSerializer
    lookup_field = "slug"

    def get_queryset(self):
        queryset = Product.objects.filter(owner=self.request.user)
        return queryset
