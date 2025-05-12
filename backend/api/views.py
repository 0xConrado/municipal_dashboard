# backend/api/views.py

from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Prefeitura, Secretaria, Departamento, Servico
from .serializers import PrefeituraSerializer, SecretariaSerializer, DepartamentoSerializer, ServicoSerializer

# ViewSet para Prefeitura
class PrefeituraViewSet(viewsets.ModelViewSet):
    queryset = Prefeitura.objects.all()
    serializer_class = PrefeituraSerializer

# ViewSet para Secretaria
class SecretariaViewSet(viewsets.ModelViewSet):
    queryset = Secretaria.objects.all()
    serializer_class = SecretariaSerializer

# ViewSet para Departamento
class DepartamentoViewSet(viewsets.ModelViewSet):
    queryset = Departamento.objects.all()
    serializer_class = DepartamentoSerializer

# ViewSet para Servico
class ServicoViewSet(viewsets.ModelViewSet):
    queryset = Servico.objects.all()
    serializer_class = ServicoSerializer

# View simples para a raiz da API
@api_view(['GET'])
def api_root(request):
    return Response({
        'prefeituras': '/api/prefeituras/',
        'secretarias': '/api/secretarias/',
        'departamentos': '/api/departamentos/',
        'servicos': '/api/servicos/',
    })