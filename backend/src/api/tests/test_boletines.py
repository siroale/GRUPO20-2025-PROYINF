import os
from django.test import TestCase
from rest_framework.test import APIClient
from api.models import Boletin, Usuario
from django.db import connection
from datetime import date

class TestBoletinListCreateAPI(TestCase):
    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.client = APIClient()

        # Ejecutar script para crear las tablas
        base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        schema_sql_path = os.path.join(base_dir, 'tests', '01_crearTablas.sql')
        with connection.cursor() as cursor:
            with open(schema_sql_path, 'r', encoding='utf-8') as f:
                cursor.execute(f.read())

        # Crear usuario autor
        cls.autor = Usuario.objects.create(
            rango=1,
            correo='autor@example.com',
            contrasena='hashpass',
            nombre='Autor',
            apellido='User',
            activo=1
        )

        # Crear boletín
        cls.boletin1 = Boletin.objects.create(
            titulo='Primer boletín',
            fecha=date.today(),
            vistas=10,
            estado=1,
            autor=cls.autor,
            cuerpo='Contenido inicial'
        )

    @classmethod
    def tearDownClass(cls):
        Boletin.objects.all().delete()
        Usuario.objects.all().delete()
        super().tearDownClass()

    def test_listar_boletines(self):
        response = self.client.get('/api/boletin/')
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response.data, list)
        self.assertGreaterEqual(len(response.data), 1)
        self.assertTrue(any(b['titulo'] == 'Primer boletín' for b in response.data))

    def test_crear_boletin_exitoso(self):
        data = {
            "titulo": "Nuevo boletín",
            "fecha": date.today().isoformat(),
            "estado": 1,
            "autor": self.autor.id_usuario,
            "cuerpo": "Cuerpo del boletín",
            "vistas": 0,
            "imagen": "",
            "ruta": "",
            "desde": date.today().isoformat(),
            "hasta": date.today().isoformat(),
            "instruccion": "skibidi toilet vs gigi murin"
        }
        response = self.client.post('/api/boletin/', data, format='json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data['titulo'], data['titulo'])
        self.assertTrue(Boletin.objects.filter(titulo=data['titulo']).exists())


class TestBoletinDetailDeleteAPI(TestCase):
    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.client = APIClient()

        base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        schema_sql_path = os.path.join(base_dir, 'tests', '01_crearTablas.sql')
        with connection.cursor() as cursor:
            with open(schema_sql_path, 'r', encoding='utf-8') as f:
                cursor.execute(f.read())

        cls.autor = Usuario.objects.create(
            rango=1,
            correo='otroautor@example.com',
            contrasena='hash',
            nombre='Otro',
            apellido='Autor',
            activo=1
        )

        cls.boletin = Boletin.objects.create(
            titulo='Boletín Detalle',
            fecha=date.today(),
            estado=1,
            autor=cls.autor,
            cuerpo='Texto para detalle'
        )

    @classmethod
    def tearDownClass(cls):
        Boletin.objects.all().delete()
        Usuario.objects.all().delete()
        super().tearDownClass()

    def test_obtener_detalle_boletin_existente(self):
        response = self.client.get(f'/api/boletin/{self.boletin.id_boletin}/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['titulo'], self.boletin.titulo)

    def test_eliminar_boletin_inexistente(self):
        id_inexistente = self.boletin.id_boletin + 999
        response = self.client.delete(f'/api/boletin/{id_inexistente}/')
        self.assertEqual(response.status_code, 404)
