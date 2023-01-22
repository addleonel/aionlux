from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns
from api.views import ProductListAPIView

app_name = 'api'
urlpatterns = format_suffix_patterns([
    path('products/', ProductListAPIView.as_view(), name='product_list'),
])