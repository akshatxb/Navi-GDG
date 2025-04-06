"""
ASGI config for vision project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/howto/deployment/asgi/
"""

import os
from django.urls import path
from channels.routing import ProtocolTypeRouter, URLRouter
from process.consumers import WebSocketConsumer
from chat.consumers import ChatConsumer
from django.core.asgi import get_asgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "vision.settings")

application = ProtocolTypeRouter(
    {
        "http": get_asgi_application(),
        "websocket": URLRouter(
            [
                path("ws/vision/", WebSocketConsumer.as_asgi()),
                path("ws/chat/", ChatConsumer.as_asgi()),
            ]
        ),
    }
)
