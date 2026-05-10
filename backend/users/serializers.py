from rest_framework import serializers
from .models import User
from roles.models import Role

class RegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(
        write_only=True
    )

    role = serializers.PrimaryKeyRelatedField(
        queryset=Role.objects.all(),
        required=False,
        allow_null=True
    )

    class Meta:

        model = User

        fields = [
            "id",
            "username",
            "email",
            "password",
            "role",
        ]

    def create(self, validated_data):

        role = validated_data.get(
            "role",
            None
        )

        user = User.objects.create_user(
            username=validated_data["username"],

            email=validated_data["email"],

            password=validated_data["password"],

            role=role
        )

        return user

class UserListSerializer(
    serializers.ModelSerializer
):

    role = serializers.PrimaryKeyRelatedField(
        queryset=Role.objects.all(),
        required=False,
        allow_null=True
    )

    class Meta:

        model = User

        fields = [
            "id",
            "username",
            "email",
            "role",
            "is_staff",
        ]

class RoleSerializer(
    serializers.ModelSerializer
):

    class Meta:

        model = Role

        fields = [
            "id",
            "nombre",
            "descripcion",
        ]