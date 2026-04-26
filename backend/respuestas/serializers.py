from rest_framework import serializers
from .models import Respuesta


class RespuestaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Respuesta
        fields = "__all__"
        read_only_fields = [
            "estudiante",
            "es_correcta",
        ]