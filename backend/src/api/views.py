# api/views.py
from rest_framework import viewsets
from .models import Usuario, Boletin, Noticia, Fuente
from .serializers import UsuarioSerializer, BoletinSerializer, NoticiaSerializer, FuenteSerializer
from django.http import JsonResponse

def api_saludo(request):
    return JsonResponse({'mensaje': 'Hola desde Django 👋'})


class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

class BoletinViewSet(viewsets.ModelViewSet):
    queryset = Boletin.objects.all()
    serializer_class = BoletinSerializer

class NoticiaViewSet(viewsets.ModelViewSet):
    queryset = Noticia.objects.all()
    serializer_class = NoticiaSerializer

class FuenteViewSet(viewsets.ModelViewSet):
    queryset = Fuente.objects.all()
    serializer_class = FuenteSerializer