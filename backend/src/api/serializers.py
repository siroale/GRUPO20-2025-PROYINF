# api/serializers.py
from rest_framework import serializers
from .models import Usuario, Boletin, Noticia, Fuente

class UsuarioSerializer(serializers.ModelSerializer):
    id_usuario = serializers.IntegerField(read_only=True)
    
    class Meta:
        model = Usuario
        #fields = ['nombre', 'apellido', 'correo', 'contraseña', 'rango']
        fields = '__all__'


class BoletinSerializer(serializers.ModelSerializer):
    class Meta:
        model = Boletin
        fields = '__all__' # Te saca todos los campos de la tabla :V
        
class NoticiaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Noticia
        fields = '__all__'    

class FuenteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fuente
        fields = '__all__'            