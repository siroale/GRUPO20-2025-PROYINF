from django.urls import path
from .views import api_saludo

urlpatterns = [
    path('saludo/', api_saludo, name='api-saludo'),
]
