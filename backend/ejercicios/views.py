from rest_framework import viewsets

from rest_framework.permissions import (
    IsAuthenticated,
)

from .models import Ejercicio

from .serializers import (
    EjercicioSerializer,
)


class EjercicioViewSet(
    viewsets.ModelViewSet
):

    queryset = Ejercicio.objects.all().order_by(
        "-id"
    )

    serializer_class = (
        EjercicioSerializer
    )

    permission_classes = [
        IsAuthenticated
    ]

    def perform_create(
        self,
        serializer
    ):

        serializer.save(
            creado_por=self.request.user
        )