##  Casos de Prueba – Usuario

### 1. Caso de Prueba: Listar Usuarios Existentes

| Aspecto               | Descripción                                                                                                                                      |
|-----------------------|---------------------------------------------------------------------------------------------------------------------------------------------------|
| Identificador         | TC-USR-01                                                                                                                                        |
| Endpoint              | GET /api/usuario/                                                                                                                                |
| Descripción           | Verificar que el sistema retorne una lista de usuarios registrados correctamente                                                                 |
| Inputs                | Petición GET al endpoint /api/usuario/                                                                                                           |
| Contexto de ejecución | - Existen al menos dos usuarios creados con anterioridad<br>- Los usuarios tienen datos válidos                                                  |
| Salida esperada       | - Código HTTP 200 OK<br>- Respuesta JSON en forma de lista<br>- Al menos 2 usuarios presentes, con atributos como correo y nombre correctamente retornados |
| Clases de equivalencia| - Usuario existente en base de datos (válido)                                                                                                    |
| Valores frontera      | - Lista vacía si no existen usuarios (no cubierto en este test)                                                                                  |

---

### 2. Caso de Prueba: Crear Usuario con Datos Válidos

| Aspecto               | Descripción                                                                                                                             |
|-----------------------|------------------------------------------------------------------------------------------------------------------------------------------|
| Identificador         | TC-USR-02                                                                                                                               |
| Endpoint              | POST /api/usuario/                                                                                                                      |
| Descripción           | Verificar que se puede crear un nuevo usuario proporcionando todos los datos requeridos correctamente                                   |
| Inputs                | JSON: { "rango": 3, "correo": "nuevo@example.com", "contrasena": "passhash", "nombre": "Nuevo", "apellido": "Usuario", "activo": 1 }    |
| Contexto de ejecución | - El correo no existe previamente<br>- El sistema está conectado a la base de datos y puede insertar                                     |
| Salida esperada       | - Código HTTP 201 Created<br>- Objeto del usuario creado con sus datos en JSON<br>- El usuario existe en la base de datos después del POST |
| Clases de equivalencia| - Datos válidos para los campos obligatorios                                                                                            |
| Valores frontera      | - Longitud mínima/máxima de campos string (no testeado aquí directamente)                                                               |

---

### 3. Caso de Prueba: Obtener Detalle de Usuario Existente

| Aspecto               | Descripción                                                                                                            |
|-----------------------|-------------------------------------------------------------------------------------------------------------------------|
| Identificador         | TC-USR-03                                                                                                               |
| Endpoint              | GET /api/usuario/{id_usuario}/                                                                                          |
| Descripción           | Verificar que se puede consultar correctamente el detalle de un usuario existente por su ID                            |
| Inputs                | ID válido de un usuario existente                                                                                       |
| Contexto de ejecución | - Usuario existe en base de datos con ese ID                                                                            |
| Salida esperada       | - Código HTTP 200 OK<br>- Objeto JSON del usuario con atributos como correo, nombre, apellido                          |
| Clases de equivalencia| - ID válido (usuario existente)                                                                                         |
| Valores frontera      | - ID bajo (por ejemplo, 1), ID alto (último usuario creado)                                                             |

---

### 4. Caso de Prueba: Eliminar Usuario Inexistente

| Aspecto               | Descripción                                                                                           |
|-----------------------|--------------------------------------------------------------------------------------------------------|
| Identificador         | TC-USR-04                                                                                              |
| Endpoint              | DELETE /api/usuario/{id_usuario}/                                                                      |
| Descripción           | Verificar que el sistema responde con error 404 al intentar eliminar un usuario que no existe         |
| Inputs                | ID inexistente, por ejemplo: usuario.id + 999                                                          |
| Contexto de ejecución | - El ID proporcionado no corresponde a ningún usuario en la base de datos                              |
| Salida esperada       | - Código HTTP 404 Not Found<br>- Mensaje de error (opcional: "Not found.")                             |
| Clases de equivalencia| - Usuario inexistente (ID inválido en contexto)                                                        |
| Valores frontera      | - ID muy alto que esté fuera del rango de usuarios existentes                                          |

---

##  Casos de Prueba – Boletines

### 1. Caso de Prueba: Listar Boletines Existentes

| Aspecto               | Descripción                                                                                                                         |
|-----------------------|--------------------------------------------------------------------------------------------------------------------------------------|
| Identificador         | TC-BLT-01                                                                                                                            |
| Endpoint              | GET /api/boletin/                                                                                                                    |
| Descripción           | Verificar que el sistema retorne correctamente la lista de boletines disponibles                                                    |
| Inputs                | Petición GET al endpoint                                                                                                             |
| Contexto de ejecución | - Existen boletines en la base de datos<br>- El autor está creado y vinculado correctamente                                         |
| Salida esperada       | - Código HTTP 200 OK<br>- Lista de objetos JSON con atributos como título, fecha, estado, etc.                                      |
| Clases de equivalencia| - Boletines existentes                                                                                                               |
| Valores frontera      | - Lista vacía si no hay boletines (no evaluado aquí)                                                                                |

---

### 2. Caso de Prueba: Crear Boletín con Datos Válidos

| Aspecto               | Descripción                                                                                                                                                            |
|-----------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Identificador         | TC-BLT-02                                                                                                                                                               |
| Endpoint              | POST /api/boletin/                                                                                                                                                      |
| Descripción           | Verificar que se puede crear un boletín correctamente al enviar datos válidos, incluyendo referencia a un autor existente                                              |
| Inputs                | JSON: { "titulo": "...", "fecha": "...", "estado": 1, "autor": id_autor, "cuerpo": "...", "vistas": 0, ... }                                                           |
| Contexto de ejecución | - El autor existe<br>- Se proporcionan todos los campos requeridos<br>- La tabla boletín fue creada correctamente desde el script SQL                                 |
| Salida esperada       | - Código HTTP 201 Created<br>- Objeto JSON con los datos del boletín creado                                                                                             |
| Clases de equivalencia| - Datos válidos para creación                                                                                                                                            |
| Valores frontera      | - Longitud mínima/máxima de título<br>- Fechas límites (desde, hasta) no incluidas en este test                                                                         |

---

### 3. Caso de Prueba: Obtener Detalle de Boletín Existente

| Aspecto               | Descripción                                                                                                         |
|-----------------------|----------------------------------------------------------------------------------------------------------------------|
| Identificador         | TC-BLT-03                                                                                                            |
| Endpoint              | GET /api/boletin/{id_boletin}/                                                                                       |
| Descripción           | Verificar que se puede consultar correctamente el detalle de un boletín existente                                   |
| Inputs                | ID válido de boletín existente                                                                                       |
| Contexto de ejecución | - El boletín existe y tiene relación con un autor                                                                   |
| Salida esperada       | - Código HTTP 200 OK<br>- Objeto JSON del boletín con campos como título, fecha, estado, cuerpo                     |
| Clases de equivalencia| - ID válido                                                                                                          |
| Valores frontera      | - ID inicial o final de la tabla                                                                                     |

---

### 4. Caso de Prueba: Eliminar Boletín Inexistente

| Aspecto               | Descripción                                                                                         |
|-----------------------|------------------------------------------------------------------------------------------------------|
| Identificador         | TC-BLT-04                                                                                            |
| Endpoint              | DELETE /api/boletin/{id_boletin}/                                                                    |
| Descripción           | Verificar que el sistema responde con error cuando se intenta eliminar un boletín inexistente       |
| Inputs                | ID inexistente (por ejemplo: id_boletin + 999)                                                       |
| Contexto de ejecución | - El ID no corresponde a ningún boletín existente                                                    |
| Salida esperada       | - Código HTTP 404 Not Found<br>- Mensaje de error opcional ("Not found.")                            |
| Clases de equivalencia| - ID inválido (boletín no existente)                                                                 |
| Valores frontera      | - ID muy alto                                                                                         |
