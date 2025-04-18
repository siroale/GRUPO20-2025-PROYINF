from django.db import models


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.BooleanField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.BooleanField()
    is_active = models.BooleanField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class Boletin(models.Model):
    id_boletin = models.IntegerField(primary_key=True)
    titulo = models.CharField(max_length=45)
    fecha = models.DateField()
    vistas = models.IntegerField(blank=True, null=True)
    imagen = models.CharField(max_length=300, blank=True, null=True)
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
    id_categoria = models.IntegerField(primary_key=True)
    categoria = models.CharField(max_length=45)

    class Meta:
        managed = False
        db_table = 'categoria'


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.SmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    id = models.BigAutoField(primary_key=True)
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class Fuente(models.Model):
    id_fuente = models.IntegerField(primary_key=True)
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
    id_noticia = models.IntegerField(primary_key=True)
    titulo = models.CharField(max_length=45)
    fecha = models.DateField()
    cuerpo = models.TextField()
    id_fuente = models.ForeignKey(Fuente, models.DO_NOTHING, db_column='id_fuente')

    class Meta:
        managed = False
        db_table = 'noticia'


class Usuario(models.Model):
    id_usuario = models.IntegerField(primary_key=True)
    rango = models.IntegerField()
    correo = models.CharField(max_length=45)
    contraseña = models.CharField(max_length=45)
    nombre = models.CharField(max_length=45)
    apellido = models.CharField(max_length=45)
    foto = models.CharField(max_length=300, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'usuario'