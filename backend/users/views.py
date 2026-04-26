from rest_framework import generics, permissions
#rom rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import User
from .serializers import RegisterSerializer
from .login_serializer import CustomTokenObtainPairSerializer

from roles.models import Role

from .serializers import (
    RegisterSerializer,
    UserListSerializer,
    RoleSerializer
)

from .permissions import IsAdministrador

# 🔐 REGISTRO
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer


# 🔐 LOGIN
class CustomLoginView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


# 👑 ADMIN → LISTAR USUARIOS
class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserListSerializer
    permission_classes = [IsAdministrador]


# 👑 ADMIN → LISTAR ROLES
class RoleListView(generics.ListAPIView):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer
    permission_classes = [IsAdministrador]