# backend/api/models.py

from django.db import models
from django.contrib.auth.models import AbstractUser

class Prefeitura(models.Model):
    """Modelo que representa uma Prefeitura."""
    nome = models.CharField(max_length=255)
    endereco = models.CharField(max_length=255, blank=True, null=True)
    telefone = models.CharField(max_length=20, blank=True, null=True)

    def __str__(self):
        return self.nome


class Secretaria(models.Model):
    """Modelo que representa uma Secretaria vinculada a uma Prefeitura."""
    prefeitura = models.ForeignKey(
        Prefeitura,
        related_name='secretarias',
        on_delete=models.CASCADE
    )
    nome = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.nome} ({self.prefeitura.nome})"


class Departamento(models.Model):
    """Modelo que representa um Departamento vinculado a uma Secretaria."""
    secretaria = models.ForeignKey(
        Secretaria,
        related_name='departamentos',
        on_delete=models.CASCADE
    )
    nome = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.nome} ({self.secretaria.nome})"


class Servico(models.Model):
    """Modelo que representa um Serviço vinculado a um Departamento."""
    departamento = models.ForeignKey(
        Departamento,
        related_name='servicos',
        on_delete=models.CASCADE
    )
    nome = models.CharField(max_length=255)
    descricao = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.nome} ({self.departamento.nome})"


class CustomUser(AbstractUser):
    """Usuário customizado com papel e associação a uma Prefeitura."""
    ROLE_CHOICES = (
        ('admin', 'Administrador'),
        ('user', 'Usuário'),
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='user')
    prefeitura = models.ForeignKey(
        Prefeitura,
        related_name='usuarios',
        null=True,
        blank=True,
        on_delete=models.SET_NULL
    )

    def __str__(self):
        return f"{self.username} ({self.role})"
