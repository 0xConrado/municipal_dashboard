# core/models.py

from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()  # Referência ao modelo de usuário

# ===============================
# 🏛️ Modelo de Secretaria
# ===============================
class Secretaria(models.Model):
    nome = models.CharField(max_length=100)  # Nome da secretaria
    descricao = models.TextField(blank=True)  # Descrição opcional

    def __str__(self):
        return self.nome


# ===============================
# 🗂️ Modelo de Departamento
# ===============================
class Departamento(models.Model):
    secretaria = models.ForeignKey(
        Secretaria, on_delete=models.CASCADE, related_name='departamentos'
    )  # Relacionamento com a Secretaria
    nome = models.CharField(max_length=100)  # Nome do departamento
    descricao = models.TextField(blank=True)  # Descrição opcional

    def __str__(self):
        return self.nome


# ===============================
# 🛠️ Modelo de Serviço
# ===============================
class Servico(models.Model):
    departamento = models.ForeignKey(
        Departamento, on_delete=models.CASCADE, related_name='servicos'
    )  # Relacionamento com o Departamento
    nome = models.CharField(max_length=100)  # Nome do serviço
    descricao = models.TextField(blank=True)  # Descrição do serviço

    def __str__(self):
        return self.nome


# ===============================
# 📑 Modelo de Protocolo Base
# ===============================
class Protocolo(models.Model):
    TIPO_CHOICES = [
        ('OFICIO', 'Ofício'),
        ('DENUNCIA', 'Denúncia'),
    ]
    
    numero = models.CharField(max_length=20, unique=True)
    ano = models.PositiveIntegerField()
    tipo = models.CharField(max_length=10, choices=TIPO_CHOICES)
    data_criacao = models.DateTimeField(auto_now_add=True)
    responsavel = models.ForeignKey(User, on_delete=models.PROTECT)

    def save(self, *args, **kwargs):
        if not self.numero:
            ultimo = Protocolo.objects.filter(ano=self.ano).count()
            self.numero = f"{ultimo+1}/{self.ano}"
        super().save(*args, **kwargs)


# ===============================
# 📨 Modelo de Ofício
# ===============================
class Oficio(Protocolo):
    requerente = models.CharField(max_length=100)
    assunto = models.TextField()
    anexo = models.FileField(upload_to='oficios/')


# ===============================
# 🚨 Modelo de Denúncia
# ===============================
class Denuncia(Protocolo):
    denunciante = models.CharField(max_length=100)
    assunto = models.TextField()
    anexo = models.FileField(upload_to='denuncias/')


# ===============================
# 📝 Modelo de Requerimento Base
# ===============================
class Requerimento(models.Model):
    TIPO_CHOICES = [
        ('PODA', 'Poda/Suppressão'),
        ('CASTRACAO', 'Castração'),
    ]
    
    numero = models.CharField(max_length=20)
    ano = models.PositiveIntegerField()
    tipo = models.CharField(max_length=10, choices=TIPO_CHOICES)
    solicitante_nome = models.CharField(max_length=100)
    solicitante_cpf = models.CharField(max_length=14)
    solicitante_telefone = models.CharField(max_length=15)
    data_criacao = models.DateTimeField(auto_now_add=True)


# ===============================
# 🌳 Modelo de Poda/Supressão
# ===============================
class PodaSupressao(Requerimento):
    TIPO_IMOVEL_CHOICES = [
        ('PUBLICO', 'Público'),
        ('PARTICULAR', 'Particular'),
    ]
    
    tipo_imovel = models.CharField(max_length=10, choices=TIPO_IMOVEL_CHOICES)
    justificativa = models.TextField()
    projeto_arquitetonico = models.FileField(upload_to='podas/', null=True, blank=True)
    licenca_construcao = models.FileField(upload_to='podas/', null=True, blank=True)


# ===============================
# 🐾 Modelo de Animal (Castração)
# ===============================
class Animal(models.Model):
    TIPO_CHOICES = [
        ('CAO', 'Cão'),
        ('GATO', 'Gato'),
    ]
    
    requerimento = models.ForeignKey(Requerimento, on_delete=models.CASCADE)
    nome = models.CharField(max_length=50)
    tipo = models.CharField(max_length=4, choices=TIPO_CHOICES)
    idade = models.PositiveIntegerField()
    comorbidades = models.TextField(blank=True)
