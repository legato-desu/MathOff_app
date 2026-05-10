from rest_framework import serializers

from .models import User

from roles.models import Role


# REGISTER
class RegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(
        write_only=True
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

        user = User.objects.create_user(
            username=validated_data["username"],

            email=validated_data["email"],

            password=validated_data["password"],

            role=validated_data.get("role")
        )

        return user


# USERS CRUD
class UserListSerializer(
    serializers.ModelSerializer
):

    role = serializers.PrimaryKeyRelatedField(
        queryset=Role.objects.all()
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


# ROLES CRUD
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