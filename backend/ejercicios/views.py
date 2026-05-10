from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import Ejercicio
from .serializers import EjercicioSerializer


class CrearEjercicioView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = EjercicioSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(creado_por=request.user)
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=400)


class ListarEjerciciosView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        ejercicios = Ejercicio.objects.all().order_by("-id")
        serializer = EjercicioSerializer(ejercicios, many=True)
        return Response(serializer.data)