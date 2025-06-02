# municipal_dashboard/urls.py

from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

# ===============================
# 📌 URLs principais do projeto municipal_dashboard
# ===============================
urlpatterns = [
    # Rota do painel administrativo padrão do Django
    path('admin/', admin.site.urls),

    # Endpoints de autenticação JWT
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Inclui todas as URLs do app 'core' (onde estão as APIs REST)
    path('', include('core.urls')),
]
