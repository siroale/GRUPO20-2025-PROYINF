# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Boletin(models.Model):
    id_boletin = models.AutoField(primary_key=True)
    titulo = models.CharField(max_length=45)
    fecha = models.DateField()
    vistas = models.IntegerField(blank=True, null=True)
    imagen = models.CharField(max_length=300, blank=True, null=True)
    ruta = models.CharField(max_length=300, blank=True, null=True)
    estado = models.SmallIntegerField()
    cuerpo = models.TextField(blank=True, null=True)
    desde = models.DateField(blank=True, null=True)
    hasta = models.DateField(blank=True, null=True)
    instruccion = models.TextField(blank=True, null=True)
    autor = models.ForeignKey('Usuario', models.DO_NOTHING, db_column='autor')

    class Meta:
        managed = False
        db_table = 'boletin'


class BoletinCategoria(models.Model):
    pk = models.CompositePrimaryKey('id_boletin', 'id_categoria')
    id_boletin = models.ForeignKey(Boletin, models.DO_NOTHING, db_column='id_boletin')
    id_categoria = models.ForeignKey('Categoria', models.DO_NOTHING, db_column='id_categoria')

    class Meta:
        managed = False
        db_table = 'boletin_categoria'
        unique_together = (('id_boletin', 'id_categoria'),)


class BoletinFuente(models.Model):
    pk = models.CompositePrimaryKey('id_boletin', 'id_fuente')
    id_boletin = models.ForeignKey(Boletin, models.DO_NOTHING, db_column='id_boletin')
    id_fuente = models.ForeignKey('Fuente', models.DO_NOTHING, db_column='id_fuente')

    class Meta:
        managed = False
        db_table = 'boletin_fuente'
        unique_together = (('id_boletin', 'id_fuente'),)


class Categoria(models.Model):
    id_categoria = models.AutoField(primary_key=True)
    categoria = models.CharField(max_length=45)

    class Meta:
        managed = False
        db_table = 'categoria'


class Fuente(models.Model):
    id_fuente = models.AutoField(primary_key=True)
    link = models.CharField(max_length=500)
    nombre = models.CharField(max_length=45)

    class Meta:
        managed = False
        db_table = 'fuente'


class FuenteCategoria(models.Model):
    pk = models.CompositePrimaryKey('id_fuente', 'id_categoria')
    id_fuente = models.ForeignKey(Fuente, models.DO_NOTHING, db_column='id_fuente')
    id_categoria = models.ForeignKey(Categoria, models.DO_NOTHING, db_column='id_categoria')

    class Meta:
        managed = False
        db_table = 'fuente_categoria'
        unique_together = (('id_fuente', 'id_categoria'),)


class Noticia(models.Model):
    id_noticia = models.AutoField(primary_key=True)
    titulo = models.CharField(max_length=45)
    fecha = models.DateField()
    cuerpo = models.TextField()
    id_fuente = models.ForeignKey(Fuente, models.DO_NOTHING, db_column='id_fuente')

    class Meta:
        managed = False
        db_table = 'noticia'


class Usuario(models.Model):
    id_usuario = models.AutoField(primary_key=True)
    rango = models.IntegerField()
    correo = models.CharField(max_length=45)
    contrasena = models.CharField(max_length=500)
    nombre = models.CharField(max_length=45)
    apellido = models.CharField(max_length=45)
    foto = models.CharField(max_length=300, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'usuario'
