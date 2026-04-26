from django.urls import path
from .views import CrearEjercicioView

urlpatterns = [
    path("crear/", CrearEjercicioView.as_view(), name="crear_ejercicio"),
]