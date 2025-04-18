from django.shortcuts import render
from django.http import JsonResponse

def api_saludo(request):
    return JsonResponse({'mensaje': 'Hola desde Django 👋'})

