#!/usr/bin/env python3
import sys
import json
from datetime import datetime

def procesar_evento(titulo, contexto):
    # Simulación de procesamiento de backend
    resultado = {
        "timestamp": datetime.now().isoformat(),
        "procesado": True,
        "datos_recibidos": {
            "titulo": titulo,
            "contexto": contexto
        },
        "acciones_realizadas": [
            "Registro en base de datos (simulado)",
            "Preparacion para siguiente etapa"
        ]
    }

    # Escribir log (opcional)
    with open('/var/www/ai_logic/eventos_log.json', 'a') as f:
        json.dump(resultado, f)
        f.write('\n')

    return json.dumps(resultado, indent=2)

# Procesar argumentos de línea de comandos
if __name__ == "__main__":
    # Verificar que se reciban 4 argumentos
    if len(sys.argv) != 3:
        print("Error: Se requieren 2 argumentos")
        sys.exit(1)

    # Extraer argumentos
    titulo = sys.argv[1]
    contexto = sys.argv[2]

    # Procesar y mostrar resultado
    print(procesar_evento(titulo, contexto))
