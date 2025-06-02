# core/serializers.py

from rest_framework import serializers
from .models import Secretaria, Departamento, Servico


# ===============================
# 🎯 Serializer de Serviço
# ===============================
class ServicoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Servico
        fields = '__all__'  # Serializa todos os campos


# ===============================
# 🗂️ Serializer de Departamento
# ===============================
class DepartamentoSerializer(serializers.ModelSerializer):
    # 🔗 Lista os serviços relacionados
    servicos = ServicoSerializer(many=True, read_only=True)

    class Meta:
        model = Departamento
        fields = '__all__'  # Serializa todos os campos + serviços


# ===============================
# 🏛️ Serializer de Secretaria
# ===============================
class SecretariaSerializer(serializers.ModelSerializer):
    # 🔗 Lista os departamentos relacionados
    departamentos = DepartamentoSerializer(many=True, read_only=True)

    class Meta:
        model = Secretaria
        fields = '__all__'  # Serializa todos os campos + departamentos
