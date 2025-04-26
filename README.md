# KESSOFT

- Joaquín Dominguez - 202273545-7
- Andrés Águila - 202273615-1
- Lucas Mosquera - 202273504-k
- Alexis Mellis - 202273557-0
- **Tutor:** Sebastían Salgado

## Wiki

Puede acceder a la Wiki mediante el siguiente [enlace](https://github.com/siroale/KESSOFT-2025-PROYINF/wiki).

## Videos

- [Presentacion del cliente](https://youtu.be/abJau21SDIk)
- [Prototipo del Proyecto](https://youtu.be/Z2_IOhcjPvM)
- [Video Versión Final Proyecto](https://youtu.be/iCsO8WIfQFA)

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
├── makefile # Comandos QoL
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

	```bash
	docker-compose up --build
	```

	Esto hará lo siguiente:

	- Levanta el frontend en http://localhost:5173
	- Levanta el backend en http://localhost:8000
	- PostgreSQL está disponible en http://localhost:5432

3. Ingrese al localhost
	- Abre tu navegador en: http://localhost:5173
	- Accede al panel de Django en: http://localhost:8000/admin

4. Cree una cuenta en iniciar sesión para acceder a las páginas de administrador (crear boletines y gestión de usuarios)

---

### Desarrollo activo

Cualquier cambio en los archivos se reflejará automáticamente:

- Frontend: Hot Reload con Vite.
- Backend: Usa watchfiles para autoreload si lo configuraste.

---

### Scripts útiles

```bash
# Corre los contenedores
make run

# Para los contenedores
make stop

# Reinicia los contenedores
make restart

# Construye los contenedores desde 0 (hard reset)
make rebuild
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
