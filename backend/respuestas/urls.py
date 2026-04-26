from django.urls import path
from .views import CrearRespuestaView

urlpatterns = [
    path("crear/", CrearRespuestaView.as_view(), name="crear_respuesta"),
]