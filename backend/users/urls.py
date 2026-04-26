from django.urls import path
from .views import RegisterView, UserListView, RoleListView

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("", UserListView.as_view(), name="users-list"),
    path("roles/", RoleListView.as_view(), name="roles-list"),
]