# municipal_dashboard/setting.py
"""
Django settings for municipal_dashboard project.

Gerado pelo 'django-admin startproject' usando Django 5.2.1.

Documentação oficial:
https://docs.djangoproject.com/en/5.2/topics/settings/
"""

from pathlib import Path
from datetime import timedelta

# Caminho base do projeto
BASE_DIR = Path(__file__).resolve().parent.parent


# ===========================
# 🚨 Configurações de Segurança
# ===========================

# 🔑 Chave secreta (NUNCA publique isso em produção)
SECRET_KEY = 'django-insecure-f7*k-4kw$r8llpe)ptb)!a02s(+*2+#y#ff^*vdrc-a5z$e#jj'

# ⚠️ Modo debug (ative False em produção)
DEBUG = True

# 🌐 Hosts permitidos (adicione seu domínio ou IP em produção)
ALLOWED_HOSTS = [
    "localhost",
    "127.0.0.1",
]


# ===========================
# 📦 Aplicativos Instalados
# ===========================

INSTALLED_APPS = [
    # Apps padrão do Django
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # Apps de terceiros
    'rest_framework',           # Django REST Framework (API)
    'corsheaders',              # Permitir requisições de outros domínios (React)
    'rest_framework_simplejwt', # Autenticação JWT

    # Seus apps
    'core',                     # App principal
]


# ===========================
# 🖼️ Configuração de Templates
# ===========================

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],  # Aqui você pode adicionar pastas com seus templates, se tiver
        'APP_DIRS': True,  # Ativa busca automática de templates dentro das apps
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',  # Importante para o admin funcionar
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]


# ===========================
# ⚙️ Middleware
# ===========================

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # 🔥 Deve ser o primeiro
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]


# ===========================
# 🔗 CORS (Permitir acesso do React)
# ===========================

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  # 🚀 Frontend React local
]


# ===========================
# 🌐 URL e WSGI
# ===========================

ROOT_URLCONF = 'municipal_dashboard.urls'

WSGI_APPLICATION = 'municipal_dashboard.wsgi.application'


# ===========================
# 🗄️ Banco de Dados (MySQL via WampServer/phpMyAdmin)
# ===========================

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',  # ✅ Usando MySQL
        'NAME': 'municipal_db',                # 📛 Nome do banco criado no phpMyAdmin
        'USER': 'root',                        # 👤 Usuário padrão do WampServer
        'PASSWORD': '',                        # 🔒 Senha (vazia por padrão no Wamp)
        'HOST': 'localhost',                   # 🌐 Host local
        'PORT': '3306',                        # 🔌 Porta padrão do MySQL
        'OPTIONS': {
            'init_command': "SET sql_mode='STRICT_TRANS_TABLES'",
        }
    }
}


# ===========================
# 🔐 Validação de Senhas
# ===========================

AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]


# ===========================
# 🌍 Internacionalização
# ===========================

LANGUAGE_CODE = 'pt-br'  # Idioma padrão em Português Brasil

TIME_ZONE = 'America/Sao_Paulo'  # Fuso horário Brasil

USE_I18N = True
USE_TZ = True


# ===========================
# 📂 Arquivos Estáticos
# ===========================

STATIC_URL = 'static/'


# ===========================
# 🔑 Configuração do REST Framework
# ===========================

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',  # 🔐 JWT como método de autenticação
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',  # 🔒 Acesso autenticado por padrão
    ),
}


# ===========================
# 🔥 Configuração do JWT
# ===========================

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),  # ⏳ Token de acesso válido por 1 hora
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),     # 🔄 Token de refresh válido por 1 dia
    'ROTATE_REFRESH_TOKENS': False,
    'BLACKLIST_AFTER_ROTATION': False,

    'ALGORITHM': 'HS256',
    'SIGNING_KEY': SECRET_KEY,
    'AUTH_HEADER_TYPES': ('Bearer',),  # 🛡️ Autenticação via "Authorization: Bearer <token>"
}


# ===========================
# 🔑 Primary Key Default
# ===========================

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
