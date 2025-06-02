# core/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SecretariaViewSet, DepartamentoViewSet, ServicoViewSet, user_profile
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.http import HttpResponse


# ===============================
# ⚙️ Configura roteador REST para os ViewSets padrão
# ===============================
# Criamos um roteador automático para registrar os ViewSets da API.
router = DefaultRouter()

# Registrar ViewSet de Secretarias na rota /api/secretarias/
router.register(r'secretarias', SecretariaViewSet)

# Registrar ViewSet de Departamentos na rota /api/departamentos/
router.register(r'departamentos', DepartamentoViewSet)

# Registrar ViewSet de Serviços na rota /api/servicos/
router.register(r'servicos', ServicoViewSet)


# ===============================
# 🏠 View simples para a rota raiz '/'
# ===============================
# Uma view básica para a página inicial da API que retorna uma mensagem simples.
def home(request):
    return HttpResponse("API Municipal Dashboard - Bem vindo!")


# ===============================
# 📍 URLs do app core incluindo a rota do usuário
# ===============================
# Definimos as rotas principais do app core.
urlpatterns = [
    path('', home, name='home'),                  # Rota raiz que chama a view 'home'
    path('api/', include(router.urls)),           # Inclui todas as rotas geradas pelo router no prefixo /api/

    # Endpoints para autenticação JWT
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),      # Rota para obter tokens (login)
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),     # Rota para renovar token de acesso

    # Endpoint para obter os dados do usuário autenticado
    path('api/user/', user_profile, name='user_profile'),  # Rota que retorna dados do usuário atual logado
]
