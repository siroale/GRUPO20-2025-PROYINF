## 1. Prueba de Carga Sostenida (Stress Continuado a `/api/boletin/`) [EJECUTADO]

### Objetivo:
Evaluar el comportamiento del sistema ante tráfico continuo moderado durante varios minutos al endpoint más consultado en la app.

### Diseño del test:
- **Tipo de método**: `GET`
- **Usuarios simultáneos**: 50
- **Ramp-Up Time**: 30 segundos
- **Duración del test**: 5 minutos
- **Loop Count**: Infinito

### Qué mide:
- Estabilidad de respuesta a largo plazo.
- Si hay degradación progresiva del rendimiento.
- Uso de memoria y CPU del backend bajo tráfico sostenido.

### Valor esperado:
- Mantener tiempos de respuesta **bajo 1 segundo en promedio**.
- No presentar errores ni caídas durante los 5 minutos.
- Confirmar si el sistema escala bien ante carga constante.

### Resultados:
- Con 50 usuarios simultaneos, la pagina es estable y mantiene tiempos de respuesta por debajo de 1 segundo.

---

## 2. Prueba de Usuario Activo (Simulación de Uso Humano)

### Objetivo:
Simular el flujo de navegación de un usuario típico desde el frontend, como si usara normalmente la app.

### Diseño del test:
- **Tipo de métodos combinados**: `GET`, `POST`
- **Flujo**:
  1. GET `/api/boletin/` → para cargar la vista principal
  2. GET `/api/boletin/1/` → para acceder a un boletin
  3. GET `/api/boletin/` → vuelve a la vista principal
- **Usuarios simultáneos**: 10
- **Loop Count**: 3
- **Tiempo entre requests**: 2-3 segundos

### Qué mide:
- Coherencia del backend ante acciones encadenadas.
- Impacto del uso secuencial de endpoints.
- Posibles cuellos de botella cuando múltiples recursos son llamados desde el frontend.

### Valor esperado:
- Todos los requests deben responder en **menos de 1 segundo.**

---

## 3. Prueba de Carga GET Simple Masiva al Endpoint `/api/boletin/`

### Objetivo:
Evaluar el rendimiento del endpoint más usado en la app: `/api/boletin/`, que es consultado cada vez que se accede al Home y muestra los boletines para saber si este soporta peaks de tráfico.

### Diseño del test:
- **Tipo de método**: `GET`
- **Usuarios simultáneos**: 100
- **Ramp-Up Time**: 10 segundos
- **Duración del test**: 30 segundos
- **Loop Count**: 1 por usuario

### Qué mide:
- Tiempos de respuesta individuales por usuario.
- Porcentaje de errores (timeout, 5xx, etc.).
- Capacidad del servidor para servir múltiples peticiones concurrentes.

### Valor esperado:
- El servidor debería responder en menos de **1 segundo promedio** por petición.
- Sin errores de red ni cuellos de botella evidentes.