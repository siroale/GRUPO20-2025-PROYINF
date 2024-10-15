# Grupo-1

* Joaquín Dominguez - 202273545-7
* Andres Aguila - 202273615-1
* Lucas Mosquera - 202273504-k
* Alexis Mellis - 202273557-0
* **Tutor**: Felipe Fernández

## Wiki

Puede acceder a la Wiki mediante el siguiente [enlace.](https://github.com/siroale/Grupo-1/wiki)

## Videos

[Presentacion del cliente](https://youtu.be/abJau21SDIk)

## Aspectos técnicos relevantes

Se ocupara el stack [LAMP](https://www.php.net/manual/en/features.commandline.webserver.php) para desarrollar la aplicación web, Linux como SO, [Apache](https://apache.org/) como servidor, [MySql](https://www.mysql.com/) como database y [PHP](https://www.php.net/) como backend.

### Levantar Página

Para levantar la página en forma de testeo no es necesario ocupar Apache, podemos simplificar el proceso y solo ocupar el server de desarrollo incluido en PHP, una vez que se quiera llevar a producción podemos pasar a ocupar Apache server.

Las siguientes instrucciones son para levantar la página en Ubuntu, ya sea como SO o como WSL en Windows.

Primero asegurarse de tener instalados MySQL y PHP:

``` sh
sudo apt update
sudo apt install mysql-server
sudo apt install php libapache2-mod-php php-mysql
```

Procedemos a configurar la base de datos con MySQL:

``` sh
sudo usermod -d /var/lib/mysql/ mysql
sudo mysql_secure_installation
sudo service mysql start
mysql -u root -p -e 'CREATE DATABASE boletinesDB'
mysql -u root -p boletinesDB < ./boletinesDB.sql
```

Ahora podemos clonar el repositorio y levantar la página usando el servidor de desarrollo de PHP:

``` sh
git clone https://github.com/siroale/GRUPO1-2024-PROYINF.git
php -S 127.0.0.1:8000 -t .
``````

Así puede acceder a la página ingresando a `http://127.0.0.1:8000`.

