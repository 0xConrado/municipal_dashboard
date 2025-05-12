# backend/api/serializers.py

from rest_framework import serializers
from .models import Prefeitura, Secretaria, Departamento, Servico

class ServicoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Servico
        fields = ['id', 'nome', 'descricao', 'departamento']

class DepartamentoSerializer(serializers.ModelSerializer):
    servicos = ServicoSerializer(many=True, read_only=True)

    class Meta:
        model = Departamento
        fields = ['id', 'nome', 'secretaria', 'servicos']

class SecretariaSerializer(serializers.ModelSerializer):
    departamentos = DepartamentoSerializer(many=True, read_only=True)

    class Meta:
        model = Secretaria
        fields = ['id', 'nome', 'prefeitura', 'departamentos']

class PrefeituraSerializer(serializers.ModelSerializer):
    secretarias = SecretariaSerializer(many=True, read_only=True)

    class Meta:
        model = Prefeitura
        fields = ['id', 'nome', 'endereco', 'telefone', 'secretarias']