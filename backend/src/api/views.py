# api/views.py
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth.hashers import check_password
from .models import Usuario, Boletin, Noticia, Fuente
from .serializers import UsuarioSerializer, BoletinSerializer, NoticiaSerializer, FuenteSerializer
from django.http import JsonResponse
from rest_framework_simplejwt.tokens import RefreshToken
from django.db.models import F


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

@api_view(['POST'])
def registro_usuario(request):
    serializer = UsuarioSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login_usuario(request):
    correo = request.data.get('correo')
    contrasena = request.data.get('contrasena')
    
    try:
        usuario = Usuario.objects.get(correo=correo)
        if check_password(contrasena, usuario.contrasena):
            # Crear payload manualmente
            payload = {
                'user_id': usuario.id_usuario,
                'email': usuario.correo,
                # Otros campos que quieras incluir en el token
            }
            # Generar tokens manualmente
            refresh = RefreshToken()
            
            # Añadir payload al token
            for key, value in payload.items():
                refresh[key] = value
                
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'usuario': {
                    'id_usuario': usuario.id_usuario,
                    'nombre': usuario.nombre,
                    'apellido': usuario.apellido,
                    'correo': usuario.correo,
                    'rango': usuario.rango,
                    'foto': usuario.foto
                }
            })
        return Response({"error": "Credenciales inválidas"}, status=status.HTTP_401_UNAUTHORIZED)
    except Usuario.DoesNotExist:
        return Response({"error": "Usuario no encontrado"}, status=status.HTTP_404_NOT_FOUND)
    
@api_view(['POST'])
def incrementar_vistas(request, id_boletin):
    try:
        updated = Boletin.objects.filter(id_boletin=id_boletin).update(vistas=F('vistas') + 1)
        
        if updated:
            # Obtenemos el boletín actualizado para devolver el valor actualizado
            boletin = Boletin.objects.get(id_boletin=id_boletin)
            return Response({'vistas': boletin.vistas}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Boletín no encontrado'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)