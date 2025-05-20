import os
from django.test import TestCase
from rest_framework.test import APIClient
from api.models import Usuario
from django.db import connection

class TestUsuariosListCreateAPI(TestCase):
    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.client = APIClient()

        # Ejecutar script SQL para crear las tablas
        base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        schema_sql_path = os.path.join(base_dir, 'tests', '01_crearTablas.sql')
        with connection.cursor() as cursor:
            with open(schema_sql_path, 'r', encoding='utf-8') as f:
                cursor.execute(f.read())

        # Crear datos de prueba
        cls.admin_user = Usuario.objects.create(
            rango=1,
            correo='admin@example.com',
            contrasena='hashpass',
            nombre='Admin',
            apellido='User',
            activo=1
        )
        cls.regular_user = Usuario.objects.create(
            rango=2,
            correo='user@example.com',
            contrasena='hashpass2',
            nombre='Regular',
            apellido='User',
            activo=1
        )

    @classmethod
    def tearDownClass(cls):
        Usuario.objects.all().delete()
        super().tearDownClass()

    def test_listar_usuarios(self):
        response = self.client.get('/api/usuario/')
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response.data, list)
        self.assertGreaterEqual(len(response.data), 2)
        self.assertTrue(any(u['correo'] == 'admin@example.com' for u in response.data))

    def test_crear_usuario_exitoso(self):
        data = {
            "rango": 3,
            "correo": "nuevo@example.com",
            "contrasena": "passhash",
            "nombre": "Nuevo",
            "apellido": "Usuario",
            "activo": 1
        }
        response = self.client.post('/api/usuario/', data, format='json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data['correo'], data['correo'])
        self.assertTrue(Usuario.objects.filter(correo=data['correo']).exists())


class TestUsuarioDetailDeleteAPI(TestCase):
    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.client = APIClient()

        base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        schema_sql_path = os.path.join(base_dir, 'tests', '01_crearTablas.sql')
        with connection.cursor() as cursor:
            with open(schema_sql_path, 'r', encoding='utf-8') as f:
                cursor.execute(f.read())

        cls.target_user = Usuario.objects.create(
            rango=2,
            correo='detalle@example.com',
            contrasena='hashpass3',
            nombre='Detalle',
            apellido='User',
            activo=1
        )

    @classmethod
    def tearDownClass(cls):
        Usuario.objects.all().delete()
        super().tearDownClass()

    def test_obtener_detalle_usuario_existente(self):
        response = self.client.get(f'/api/usuario/{self.target_user.id_usuario}/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['correo'], self.target_user.correo)

    def test_eliminar_usuario_inexistente(self):
        id_inexistente = self.target_user.id_usuario + 999
        response = self.client.delete(f'/api/usuario/{id_inexistente}/')
        self.assertEqual(response.status_code, 404)
