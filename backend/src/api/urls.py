from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    UsuarioViewSet, BoletinViewSet, NoticiaViewSet, FuenteViewSet, BoletinFuenteViewSet,
    api_saludo, registro_usuario, login_usuario, incrementar_vistas
)

router = DefaultRouter()
router.register(r'usuario', UsuarioViewSet)
router.register(r'boletin', BoletinViewSet)
router.register(r'noticia', NoticiaViewSet)
router.register(r'fuente', FuenteViewSet)
router.register(r'boletin_fuente', BoletinFuenteViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('saludo/', api_saludo, name='api-saludo'),
    path('registro/', registro_usuario, name='registro'),
    path('login/', login_usuario, name='login'),
    path('boletin/<int:id_boletin>/incrementar-vistas/', incrementar_vistas, name='incrementar_vistas'),
]