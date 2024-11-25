# Grupo-1

* Joaquín Dominguez - 202273545-7
* Andres Aguila - 202273615-1
* Lucas Mosquera - 202273504-k
* Alexis Mellis - 202273557-0
* **Tutor**: Felipe Fernández

## Wiki

Puede acceder a la Wiki mediante el siguiente [enlace.](https://github.com/siroale/Grupo-1/wiki)

## Videos

- [Presentacion del cliente](https://youtu.be/abJau21SDIk)
- [Prototipo del Proyecto](https://youtu.be/Z2_IOhcjPvM)

## Aspectos técnicos relevantes

Se ocupara el stack [LAMP](https://www.php.net/manual/en/features.commandline.webserver.php) para desarrollar la aplicación web, Linux como SO, [Apache](https://apache.org/) como servidor, [MySql](https://www.mysql.com/) como database y [PHP](https://www.php.net/) como backend.

### Levantar Página

Para levantar la página tenemos el proyecto en un ambiente virtual con [Docker](https://www.docker.com/).

Primero que todo se debe clonar el repositorio:

``` sh
git clone https://github.com/siroale/GRUPO1-2024-PROYINF.git
``````

Las siguientes instrucciones son para levantar la página en WSL2 con Windows y Docker, para ello se necesita tener [Docker Desktop](https://www.docker.com/get-started/), y configurarlo para que ocupe WSL2 como maquina virtual, esto se puede lograr siguiendo [esta guia](https://docs.docker.com/desktop/wsl/#turn-on-docker-desktop-wsl-2).

Una vez configurado el Docker Desktop y clonado el repositorio, ingrese dentro del WSL2 al directorio del proyecto donde se encuentra el archivo `docker-compose.yml` y ejecute el siguiente comando:

``` sh
sudo docker-compose up -d
```

Una vez terminado con el testeo puede bajar la página con:

``` sh
sudo docker-compose down
```

Así puede acceder a la página ingresando a `http://127.0.0.1:80` y a la página de administación de base de datos en `http://127.0.0.1:8081`, el usuario `root` tiene contraseña `123`.

Credenciales de usuario admin en la pagina:
- Correo: admin@gmail.com
- Contraseña: admin

