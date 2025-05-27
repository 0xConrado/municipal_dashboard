from rest_framework import viewsets, permissions
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Prefeitura, Secretaria, Departamento, Servico
from .serializers import PrefeituraSerializer, SecretariaSerializer, DepartamentoSerializer, ServicoSerializer

class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return request.user and request.user.is_authenticated
        return request.user and request.user.is_staff

class PrefeituraViewSet(viewsets.ModelViewSet):
    queryset = Prefeitura.objects.all()
    serializer_class = PrefeituraSerializer
    permission_classes = [IsAdminOrReadOnly]

class SecretariaViewSet(viewsets.ModelViewSet):
    queryset = Secretaria.objects.all()
    serializer_class = SecretariaSerializer
    permission_classes = [IsAdminOrReadOnly]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['prefeitura']

class DepartamentoViewSet(viewsets.ModelViewSet):
    queryset = Departamento.objects.all()
    serializer_class = DepartamentoSerializer
    permission_classes = [IsAdminOrReadOnly]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['secretaria']

class ServicoViewSet(viewsets.ModelViewSet):
    queryset = Servico.objects.all()
    serializer_class = ServicoSerializer
    permission_classes = [IsAdminOrReadOnly]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['departamento']

@api_view(['GET'])
def api_root(request):
    return Response({
        'prefeituras': '/api/prefeituras/',
        'secretarias': '/api/secretarias/',
        'departamentos': '/api/departamentos/',
        'servicos': '/api/servicos/',
    })