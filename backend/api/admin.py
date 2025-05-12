# backend/api/admin.py

from django.contrib import admin
from .models import Prefeitura, Secretaria, Departamento, Servico

@admin.register(Prefeitura)
class PrefeituraAdmin(admin.ModelAdmin):
    list_display = ['nome', 'endereco', 'telefone']

@admin.register(Secretaria)
class SecretariaAdmin(admin.ModelAdmin):
    list_display = ['nome', 'prefeitura']

@admin.register(Departamento)
class DepartamentoAdmin(admin.ModelAdmin):
    list_display = ['nome', 'secretaria']

@admin.register(Servico)
class ServicoAdmin(admin.ModelAdmin):
    list_display = ['nome', 'departamento']