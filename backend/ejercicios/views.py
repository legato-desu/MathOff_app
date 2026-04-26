from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .models import Ejercicio
from .serializers import EjercicioSerializer


class CrearEjercicioView(generics.CreateAPIView):
    queryset = Ejercicio.objects.all()
    serializer_class = EjercicioSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(
            creado_por=self.request.user
        )