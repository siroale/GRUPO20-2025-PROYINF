# Generated by Django 5.2 on 2025-04-19 01:05

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Boletin',
            fields=[
                ('id_boletin', models.AutoField(primary_key=True, serialize=False)),
                ('titulo', models.CharField(max_length=45)),
                ('fecha', models.DateField()),
                ('vistas', models.IntegerField(blank=True, null=True)),
                ('imagen', models.CharField(blank=True, max_length=300, null=True)),
                ('estado', models.SmallIntegerField()),
                ('cuerpo', models.TextField(blank=True, null=True)),
                ('desde', models.DateField(blank=True, null=True)),
                ('hasta', models.DateField(blank=True, null=True)),
                ('instruccion', models.TextField(blank=True, null=True)),
            ],
            options={
                'db_table': 'boletin',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='BoletinCategoria',
            fields=[
                ('pk', models.CompositePrimaryKey('id_boletin', 'id_categoria', blank=True, editable=False, primary_key=True, serialize=False)),
            ],
            options={
                'db_table': 'boletin_categoria',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='BoletinFuente',
            fields=[
                ('pk', models.CompositePrimaryKey('id_boletin', 'id_fuente', blank=True, editable=False, primary_key=True, serialize=False)),
            ],
            options={
                'db_table': 'boletin_fuente',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Categoria',
            fields=[
                ('id_categoria', models.AutoField(primary_key=True, serialize=False)),
                ('categoria', models.CharField(max_length=45)),
            ],
            options={
                'db_table': 'categoria',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Fuente',
            fields=[
                ('id_fuente', models.AutoField(primary_key=True, serialize=False)),
                ('link', models.CharField(max_length=500)),
                ('nombre', models.CharField(max_length=45)),
            ],
            options={
                'db_table': 'fuente',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='FuenteCategoria',
            fields=[
                ('pk', models.CompositePrimaryKey('id_fuente', 'id_categoria', blank=True, editable=False, primary_key=True, serialize=False)),
            ],
            options={
                'db_table': 'fuente_categoria',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Noticia',
            fields=[
                ('id_noticia', models.AutoField(primary_key=True, serialize=False)),
                ('titulo', models.CharField(max_length=45)),
                ('fecha', models.DateField()),
                ('cuerpo', models.TextField()),
            ],
            options={
                'db_table': 'noticia',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Usuario',
            fields=[
                ('id_usuario', models.AutoField(primary_key=True, serialize=False)),
                ('rango', models.IntegerField()),
                ('correo', models.CharField(max_length=45)),
                ('contraseña', models.CharField(max_length=45)),
                ('nombre', models.CharField(max_length=45)),
                ('apellido', models.CharField(max_length=45)),
                ('foto', models.CharField(blank=True, max_length=300, null=True)),
            ],
            options={
                'db_table': 'usuario',
                'managed': False,
            },
        ),
    ]
