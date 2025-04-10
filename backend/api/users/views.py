from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.decorators import (
    api_view,
    permission_classes,
    authentication_classes,
)
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from rest_framework_simplejwt.exceptions import (
    TokenError,
    ExpiredTokenError,
    InvalidToken,
)
import logging
import uuid
from codes import expired_token, invalid_token, no_token
from django_ratelimit.decorators import ratelimit

logger = logging.getLogger(__name__)


# Production Views
@ratelimit(key="ip", rate="100/m", block=True)
@api_view(["POST"])
@permission_classes([AllowAny])
@authentication_classes([])
def register_user(request):
    """
    View to register a new user and return access and refresh tokens as cookies.

    :param request: Request object
    :return: Response object
    """
    access = request.COOKIES.get("access")
    refresh = request.COOKIES.get("refresh")
    if access:
        try:
            AccessToken(access)
            return Response(
                {"message": "Valid access token already exists."},
                status=status.HTTP_403_FORBIDDEN,
            )
        except ExpiredTokenError:
            pass
        except TokenError as e:
            return Response(
                {"message": str(e), "error": invalid_token},
                status=status.HTTP_401_UNAUTHORIZED,
            )
        except Exception as e:
            logger.exception(e)
            return Response(
                {"message": "Unexpected Server error"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
    if refresh:
        try:
            RefreshToken(refresh)
            return Response(
                {"message": "Valid refresh token already exists."},
                status=status.HTTP_403_FORBIDDEN,
            )
        except ExpiredTokenError:
            pass
        except TokenError as e:
            return Response(
                {"message": str(e), "error": invalid_token},
                status=status.HTTP_401_UNAUTHORIZED,
            )
        except Exception as e:
            logger.exception(e)
            return Response(
                {"message": "Unexpected Server error"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
    email = request.data.get("email")
    password = request.data.get("password")
    if not email:
        return Response(
            {"message": "Email is required."}, status=status.HTTP_400_BAD_REQUEST
        )
    elif not password:
        return Response(
            {"message": "Password is required."}, status=status.HTTP_400_BAD_REQUEST
        )
    try:
        if User.objects.filter(email=email).exists():
            return Response(
                {"message": "Email already in use."}, status=status.HTTP_400_BAD_REQUEST
            )
        user = User.objects.create_user(
            username=uuid.uuid4(), email=email, password=password
        )
        refresh = RefreshToken.for_user(user)
        access = str(refresh.access_token)
        response = Response(
            {
                "message": "Register Successful",
                "user": user.username,
            },
            status=status.HTTP_200_OK,
        )
        response.set_cookie(
            key="access",
            value=access,
            httponly=False,
            secure=True,
            samesite="None",
        )
        response.set_cookie(
            key="refresh",
            value=str(refresh),
            httponly=False,
            secure=True,
            samesite="None",
        )
        return response
    except TokenError:
        logger.exception(e)
        return Response(
            {"message": "Internal Server error"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )
    except Exception as e:
        logger.exception(e)
        return Response(
            {"message": "Internal Server error"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@ratelimit(key="ip", rate="100/m", block=True)
@api_view(["POST"])
@permission_classes([AllowAny])
@authentication_classes([])
def login_user(request):
    """
    View to login a user and return access and refresh tokens as cookies.

    :param request: Request object
    :return: Response object
    """
    access = request.COOKIES.get("access")
    refresh = request.COOKIES.get("refresh")
    if access:
        try:
            AccessToken(access)
            return Response(
                {"message": "Valid access token already exists."},
                status=status.HTTP_403_FORBIDDEN,
            )
        except ExpiredTokenError:
            pass
        except TokenError as e:
            return Response(
                {"message": str(e), "error": invalid_token},
                status=status.HTTP_401_UNAUTHORIZED,
            )
        except Exception as e:
            logger.exception(e)
            return Response(
                {"message": "Unexpected Server error"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
    if refresh:
        try:
            RefreshToken(refresh)
            return Response(
                {"message": "Valid refresh token already exists."},
                status=status.HTTP_403_FORBIDDEN,
            )
        except ExpiredTokenError:
            pass
        except TokenError as e:
            return Response(
                {"message": str(e), "error": invalid_token},
                status=status.HTTP_401_UNAUTHORIZED,
            )
        except Exception as e:
            logger.exception(e)
            return Response(
                {"message": "Unexpected Server error"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
    email = request.data.get("email")
    password = request.data.get("password")
    if not email:
        return Response(
            {"message": "Email is required."}, status=status.HTTP_400_BAD_REQUEST
        )
    elif not password:
        return Response(
            {"message": "Password is required."}, status=status.HTTP_400_BAD_REQUEST
        )
    try:
        user = User.objects.get(email=email)
        valid_user = authenticate(username=user.username, password=password)
        if valid_user is not None:
            refresh = RefreshToken.for_user(valid_user)
            access = str(refresh.access_token)
            response = Response(
                {
                    "message": "Login Successful",
                    "user": user.username,
                },
                status=status.HTTP_200_OK,
            )
            response.set_cookie(
                key="access",
                value=access,
                httponly=False,
                secure=True,
                samesite="None",
            )
            response.set_cookie(
                key="refresh",
                value=str(refresh),
                httponly=False,
                secure=True,
                samesite="None",
            )
            return response
        else:
            return Response(
                {"message": "Invalid Credentials"},
                status=status.HTTP_401_UNAUTHORIZED,
            )
    except User.DoesNotExist:
        return Response(
            {"message": "User does not exist."},
            status=status.HTTP_400_BAD_REQUEST,
        )
    except TokenError:
        logger.exception(e)
        return Response(
            {"message": "Internal Server error"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )
    except Exception as e:
        logger.exception(e)
        return Response(
            {"message": "Internal Server error"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@ratelimit(key="ip", rate="100/m", block=True)
@api_view(["POST"])
@permission_classes([AllowAny])
@authentication_classes([])
def logout_user(request):
    """
    View to logout a user and delete access and refresh tokens cookies.

    :param request: Request object
    :return Response object
    """
    refresh = request.COOKIES.get("refresh")
    if not refresh:
        return Response(
            {"message": "Refresh token required", "error": no_token},
            status=status.HTTP_400_BAD_REQUEST,
        )
    else:
        try:
            token = RefreshToken(refresh)
            token.blacklist()
            response = Response(
                {"message": "User logged out successfully."}, status=status.HTTP_200_OK
            )
        except TokenError as e:
            logger.debug(e)
            response = Response(
                {"message": "Invalid refresh token."},
                status=status.HTTP_401_UNAUTHORIZED,
            )
        except Exception as e:
            logger.exception(e)
            response = Response(
                {"message": "Unexpected Server error."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
        response.delete_cookie(
            key="access",
            samesite="None",
        )
        response.delete_cookie(
            key="refresh",
            samesite="None",
        )
        return response


@ratelimit(key="ip", rate="100/m", block=True)
@api_view(["POST"])
@permission_classes([AllowAny])
@authentication_classes([])
def token_refresh(request):
    """
    View to refresh access token using refresh token.

    :param request: Request object
    :return Response object
    """
    token = request.COOKIES.get("refresh")
    if not token:
        return Response(
            {"message": "Refresh token is required", "error": no_token},
            status=status.HTTP_400_BAD_REQUEST,
        )
    try:
        refresh = RefreshToken(token)
        access = str(refresh.access_token)
        response = Response(
            {"message": "Token refresh successful"}, status=status.HTTP_200_OK
        )
        response.set_cookie(
            key="access",
            value=access,
            httponly=False,
            secure=True,
            samesite="None",
        )
        return response
    except ExpiredTokenError:
        return Response(
            {"message": "Expired refresh token", "error": expired_token},
            status=status.HTTP_401_UNAUTHORIZED,
        )
    except TokenError:
        return Response(
            {"message": "Invalid refresh token", "error": invalid_token},
            status=status.HTTP_401_UNAUTHORIZED,
        )
    except Exception as e:
        logger.exception(e)
        return Response(
            {"message": "Unexpected Server error"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@ratelimit(key="ip", rate="100/m", block=True)
@api_view(["POST"])
@permission_classes([AllowAny])
@authentication_classes([])
def token_verify(request):
    """
    View to verify access token.

    :param request: Request object
    :return Response object
    """
    token = request.COOKIES.get("access")
    if not token:
        return Response(
            {"message": "Access token is required", "error": no_token},
            status=status.HTTP_400_BAD_REQUEST,
        )
    try:
        AccessToken(token)
        return Response({"message": "Access token verified"}, status=status.HTTP_200_OK)
    except ExpiredTokenError:
        return Response(
            {"message": "Access token expired", "error": expired_token},
            status=status.HTTP_401_UNAUTHORIZED,
        )
    except InvalidToken:
        return Response(
            {"message": "Invalid access token", "error": invalid_token},
            status=status.HTTP_401_UNAUTHORIZED,
        )
    except Exception as e:
        logger.exception(e)
        return Response(
            {"message": "Unexpected Server error"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@ratelimit(key="ip", rate="100/m", block=True)
@api_view(["POST"])
def get_user(request):
    """
    View to get user information.

    :param request: Request object
    :return Response object
    """
    try:
        user = User.objects.get(id=request.user.id)
        return Response(
            {
                "message": "User retrieved successfully",
                "user": {
                    "username": user.username,
                    "email": user.email,
                },
            },
            status=status.HTTP_200_OK,
        )
    except User.DoesNotExist:
        return Response(
            {"message": "User does not exist"}, status=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        logger.exception(e)
        return Response(
            {"message": "Unexpected Server error"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )
