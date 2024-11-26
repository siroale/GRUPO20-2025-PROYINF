# Dockerfile
FROM php:8.2-apache

# Instalar dependencias del sistema
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    python3-venv \
    && docker-php-ext-install pdo pdo_mysql

# Configurar entorno virtual
RUN python3 -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# Copiar dependencias e instalar
COPY ai_logic/dependencies.txt /tmp/dependencies.txt
#RUN pip install -r /tmp/dependencies.txt

# Configuraciones adicionales
WORKDIR /var/www/html
