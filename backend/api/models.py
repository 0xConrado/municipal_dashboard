# backend/api/models.py

from django.db import models

# Prefeitura
class Prefeitura(models.Model):
    nome = models.CharField(max_length=255)
    endereco = models.CharField(max_length=255, blank=True, null=True)
    telefone = models.CharField(max_length=20, blank=True, null=True)

    def __str__(self):
        return self.nome

# Secretaria vinculada a uma Prefeitura
class Secretaria(models.Model):
    prefeitura = models.ForeignKey(Prefeitura, related_name='secretarias', on_delete=models.CASCADE)
    nome = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.nome} ({self.prefeitura.nome})"

# Departamento vinculado a uma Secretaria
class Departamento(models.Model):
    secretaria = models.ForeignKey(Secretaria, related_name='departamentos', on_delete=models.CASCADE)
    nome = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.nome} ({self.secretaria.nome})"

# Serviço vinculado a um Departamento
class Servico(models.Model):
    departamento = models.ForeignKey(Departamento, related_name='servicos', on_delete=models.CASCADE)
    nome = models.CharField(max_length=255)
    descricao = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.nome} ({self.departamento.nome})"