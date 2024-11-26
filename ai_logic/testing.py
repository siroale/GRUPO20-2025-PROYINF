import requests
import socket

def get_host_ip():
    # Obtener IP del host
    try:
        # Intentar conectar a un servicio externo para obtener la IP local
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        local_ip = s.getsockname()[0]
        s.close()
        return local_ip
    except Exception:
        return "127.0.0.1"

def test_ollama_connection():
    # Intentar con IP local y puerto estándar
    local_ip = get_host_ip()
    urls_to_try = [
        f"http://127.0.0.1:11434/v1/models",
        f"http://localhost:11434/v1/models",
        f"http://{local_ip}:11434/v1/models"
    ]

    for url in urls_to_try:
        try:
            print(f"Intentando conexión a: {url}")
            response = requests.get(url, timeout=5)
            
            if response.status_code == 200:
                print("Conexión a Ollama exitosa!")
                print("Respuesta:", response.json())
                return True
            else:
                print(f"Error de conexión. Código de estado: {response.status_code}")
        
        except requests.RequestException as e:
            print(f"Error al conectar a {url}: {e}")
    
    print("No se pudo establecer conexión con Ollama")
    return False

# Ejecutar prueba
test_ollama_connection()