from django.urls import path
from .views import (
    ListaEjerciciosView,
    CrearEjercicioView
)

urlpatterns = [
    path("", ListaEjerciciosView.as_view(), name="lista_ejercicios"),
    path("crear/", CrearEjercicioView.as_view(), name="crear_ejercicio"),
]