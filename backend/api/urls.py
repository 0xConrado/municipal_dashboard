# backend/api/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PrefeituraViewSet, SecretariaViewSet, DepartamentoViewSet, ServicoViewSet, api_root

router = DefaultRouter()
router.register(r'prefeituras', PrefeituraViewSet)
router.register(r'secretarias', SecretariaViewSet)
router.register(r'departamentos', DepartamentoViewSet)
router.register(r'servicos', ServicoViewSet)

urlpatterns = [
    path('', api_root, name='api-root'),
    path('', include(router.urls)),
]