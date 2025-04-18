# KESSOFT

* Joaquín Dominguez - 202273545-7
* Andres Aguila - 202273615-1
* Lucas Mosquera - 202273504-k
* Alexis Mellis - 202273557-0
* **Tutor**: Sebastían Salgado

## Wiki

Puede acceder a la Wiki mediante el siguiente [enlace](https://github.com/siroale/KESSOFT/wiki).

## Videos

- [Presentacion del cliente](https://youtu.be/abJau21SDIk)
- [Prototipo del Proyecto](https://youtu.be/Z2_IOhcjPvM)
- [Video Versión Final Proyecto](https://youtu.be/iCsO8WIfQFA)

## Aspectos técnicos relevantes

Se ocupara el stack [LAMP](https://www.php.net/manual/en/features.commandline.webserver.php) para desarrollar la aplicación web, Linux como SO, [Apache](https://apache.org/) como servidor, [MySql](https://www.mysql.com/) como database y [PHP](https://www.php.net/) como backend.

## Levantamiento de página
Este proyecto es una aplicación fullstack separada en dos carpetas principales:

- `backend/` → Django (REST API) con PostgreSQL
- `frontend/` → React (con Vite, TailwindCSS y ShadCN)

Todo corre en contenedores Docker para facilitar el desarrollo.

---

### Requisitos

- Docker
- Docker Compose
- Make (opcional, para usar atajos)

---

### Estructura del proyecto

```
.
├── backend/ # Django + PostgreSQL
├── frontend/ # React + Vite + TailwindCSS + shadcn/ui
├── docker-compose.yml # Orquestación de servicios
└── README.md
```

---

### Levantar el entorno de desarrollo

1. **Clona el repositorio**

   ```bash
   git clone <repo-url>
   cd <nombre-del-proyecto>
   ```

2. Levanta los servicios

	````bash
	docker-compose up --build
	```

	Esto hará lo siguiente:

	- Levanta el frontend en http://localhost:5173
	- Levanta el backend en http://localhost:8000/api/
	- PostgreSQL está disponible internamente como db:5432

3. Primera vez con Django (backend)
	En otra terminal:

	```bash
	docker-compose exec backend python manage.py migrate
	docker-compose exec backend python manage.py createsuperuser
	```

4. ¡Listo!
	- Abre tu navegador en: http://localhost:5173
	- Accede al panel de Django en: http://localhost:8000/admin

---

### Desarrollo activo

Cualquier cambio en los archivos se reflejará automáticamente:

- Frontend: Hot Reload con Vite.
- Backend: Usa watchfiles para autoreload si lo configuraste.

---

### Scripts útiles

```bash
# Levantar todos los servicios
docker-compose up

# Reconstruir contenedores
docker-compose up --build

# Entrar a la terminal de Django
docker-compose exec backend bash

# Ejecutar comandos de Django
docker-compose exec backend python manage.py <comando>

# Entrar a la terminal de React
docker-compose exec frontend bash
```

---

### Variables de entorno

Puedes definir .env en las carpetas backend/ y frontend/ para configuración sensible. Ejemplo (backend/.env):

```env
POSTGRES_DB=postgres
POSTGRES_USER=admin
POSTGRES_PASSWORD=123
```

---

### Stack técnico

- **Frontend:** React + Vite + TailwindCSS + shadcn/ui
- **Backend:** Django + Django REST Framework
- **Base de datos:** PostgreSQL
- **Orquestación:** Docker + docker-compose
