from django.urls import path
from .views import CrearEjercicioView, ListarEjerciciosView

urlpatterns = [
    path("", ListarEjerciciosView.as_view(), name="listar_ejercicios"),
    path("crear/", CrearEjercicioView.as_view(), name="crear_ejercicio"),
]