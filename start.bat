@echo off
title Iniciando Backend e Frontend

REM Abrir nova janela para backend Django
start cmd /k "cd /d %~dp0\backend && .\venv\Scripts\activate && python manage.py runserver"

REM Abrir nova janela para frontend React
start cmd /k "cd /d %~dp0\frontend && npm start"

REM Voltar para a janela original
exit