from django.urls import path

from .views import (
    register_user,
    login_user,
    logout_user,
    token_refresh,
    token_verify,
    get_user,
)

urlpatterns = [
    path("login", login_user, name="login"),
    path("register", register_user, name="register"),
    path("logout", logout_user, name="logout"),
    path("refresh", token_refresh, name="refresh"),
    path("verify", token_verify, name="verify"),
    path("user", get_user, name="user"),
]
