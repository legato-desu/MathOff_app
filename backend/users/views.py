from rest_framework import generics, viewsets

from rest_framework.permissions import (
    IsAuthenticated,
)

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
)

from .models import User

from .serializers import (
    RegisterSerializer,
    UserListSerializer,
    RoleSerializer,
)

from .login_serializer import (
    CustomTokenObtainPairSerializer,
)

from .permissions import IsAdministrador

from roles.models import Role


# LOGIN
class CustomLoginView(TokenObtainPairView):
    serializer_class = (
        CustomTokenObtainPairSerializer
    )


# REGISTER
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()

    serializer_class = RegisterSerializer


# CRUD USUARIOS
class UserViewSet(viewsets.ModelViewSet):

    queryset = User.objects.all().order_by(
        "-id"
    )

    serializer_class = UserListSerializer

    permission_classes = [
        IsAuthenticated,
        IsAdministrador,
    ]


# CRUD ROLES
class RoleViewSet(viewsets.ModelViewSet):

    queryset = Role.objects.all().order_by(
        "-id"
    )

    serializer_class = RoleSerializer

    permission_classes = [
        IsAuthenticated,
        IsAdministrador,
    ]