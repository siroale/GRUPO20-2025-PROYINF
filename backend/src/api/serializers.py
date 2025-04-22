# api/serializers.py
from rest_framework import serializers
from .models import Usuario, Boletin, Noticia, Fuente, BoletinFuente
from django.contrib.auth.hashers import make_password

class UsuarioSerializer(serializers.ModelSerializer):
    id_usuario = serializers.IntegerField(read_only=True)
    
    class Meta:
        model = Usuario
        #fields = ['nombre', 'apellido', 'correo', 'contraseña', 'rango']
        fields = '__all__'
        extra_kwargs = {'contrasena': {'write_only': True}}
    def create(self, validated_data):
        # Hash la contraseña antes de guardarla
        validated_data['contrasena'] = make_password(validated_data['contrasena'])
        return super().create(validated_data)

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

class BoletinFuenteSerializer(serializers.ModelSerializer):
    class Meta:
        model = BoletinFuente
        fields = '__all__'


