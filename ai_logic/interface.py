import requests
import json
from gtts import gTTS
import os
from os import environ
environ['PYGAME_HIDE_SUPPORT_PROMPT'] = '1'
import pygame
import time


# URL del modelo en Ollama
url = "http://host.docker.internal:11434/v1/chat/completions"

def get_response(prompt):
    # Cuerpo de la solicitud
    payload = {
        "model": "llama3.2",  # Nombre del modelo
        "messages": [
            {"role": "user", "content": prompt}
        ]
    }

    # Enviar la solicitud POST al modelo
    response = requests.post(url, headers={"Content-Type": "application/json"}, data=json.dumps(payload))

    # Verificar si la solicitud fue exitosa
    if response.status_code == 200:
        return response.json()['choices'][0]['message']['content']
    else:
        return f"Error: {response.status_code}, {response.text}"


def textToSpeech(text):

    audio_file = "output.mp3"

    # Convertir texto a voz utilizando Google Text-to-Speech
    tts = gTTS(text=text, lang='es')  # Puedes cambiar 'es' por otro código de idioma (como 'en' para inglés)

    # Guardar el archivo de audio
    tts.save(audio_file)


    pygame.mixer.music.load(audio_file)

    pygame.mixer.music.play()

    while pygame.mixer.music.get_busy():
        time.sleep(0.1)  # Esperar brevemente
    pygame.mixer.music.unload()

        # Verificar si el archivo ya existe y esperar a que se complete la reproducción
    if os.path.exists(audio_file):
        # Esperar a que el audio se complete
        time.sleep(0.1)  # Esperar brevemente antes de comprobar nuevamente

        # Eliminar el archivo anterior
        os.remove(audio_file)



stt = True if (input("Desea activar el Text To Speech? [Y/N] ").lower() == "y") else False
if (stt): pygame.mixer.init()

while(True):
    prompt_text = input("Request: ")
    if (prompt_text == "bye"): break
    full_prompt = "" + prompt_text
    respuesta = get_response(full_prompt)
    print(respuesta)
        
    if (stt): textToSpeech(respuesta)


#print(f"El archivo de audio ha sido guardado como {audio_file}")
