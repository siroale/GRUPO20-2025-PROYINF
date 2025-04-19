from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UsuarioViewSet, BoletinViewSet, NoticiaViewSet, FuenteViewSet
from .views import api_saludo

router = DefaultRouter()
router.register(r'usuario', UsuarioViewSet)
router.register(r'boletin', BoletinViewSet)
router.register(r'noticia', NoticiaViewSet)
router.register(r'fuente', FuenteViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('saludo/', api_saludo, name='api-saludo'),
]