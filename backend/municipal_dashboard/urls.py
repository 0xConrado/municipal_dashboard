# backend/municipal_dashboard/urls.py

from django.contrib import admin
from django.urls import path, include
from django.views.generic import RedirectView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),  # suas rotas de dados
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),      # login
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),      # refresh
]