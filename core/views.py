# core/views.py
from rest_framework import viewsets
from .models import Secretaria, Departamento, Servico
from .serializers import SecretariaSerializer, DepartamentoSerializer, ServicoSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

# ===============================
# 🏛️ ViewSet para Secretaria com CRUD e autenticação
# ===============================
class SecretariaViewSet(viewsets.ModelViewSet):
    queryset = Secretaria.objects.all()                    # Busca todas as secretarias
    serializer_class = SecretariaSerializer                 # Usa o serializer específico
    permission_classes = [IsAuthenticated]                 # Exige autenticação JWT


# ===============================
# 🗂️ ViewSet para Departamento com CRUD e autenticação
# ===============================
class DepartamentoViewSet(viewsets.ModelViewSet):
    queryset = Departamento.objects.all()                  # Busca todos os departamentos
    serializer_class = DepartamentoSerializer               # Usa o serializer específico
    permission_classes = [IsAuthenticated]                 # Exige autenticação JWT


# ===============================
# 🛠️ ViewSet para Serviço com CRUD e autenticação
# ===============================
class ServicoViewSet(viewsets.ModelViewSet):
    queryset = Servico.objects.all()                        # Busca todos os serviços
    serializer_class = ServicoSerializer                     # Usa o serializer específico
    permission_classes = [IsAuthenticated]                 # Exige autenticação JWT


# ===============================
# 👤 Endpoint para retornar dados do usuário autenticado
# ===============================
@api_view(['GET'])                                         # Aceita apenas GET
@permission_classes([IsAuthenticated])                     # Só acessível por usuário logado
def user_profile(request):
    """
    Retorna os dados do usuário autenticado:
    id, username, first_name, last_name, email
    """
    user = request.user                                    # Obtém o usuário da requisição

    # Retorna JSON com os dados básicos do usuário
    return Response({
        'id': user.id,
        'username': user.username,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'email': user.email,
    })
