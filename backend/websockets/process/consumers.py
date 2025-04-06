from channels.generic.websocket import AsyncWebsocketConsumer
from ultralytics import YOLO
from PIL import Image
import io

model = YOLO("yolov8n.pt")


class WebSocketConsumer(AsyncWebsocketConsumer):
    async def connect(self):

        await self.accept()
        print("WebSocket connection established")

    async def disconnect(self, code):
        print(f"WebSocket connection closed. Code: {code}")

    async def receive(self, text_data=None, bytes_data=None):
        print(
            f"Recieved data. Size: {len(text_data) if text_data else len(bytes_data)} bytes"
        )

        if bytes_data:

            image = Image.open(io.BytesIO(bytes_data))

            results = model(image)

            processed_bytes = results[0].plot()

            processed_image = Image.fromarray(processed_bytes)

            BufferedImage = io.BytesIO()
            processed_image.save(BufferedImage, format="WEBP")

        await self.send(bytes_data=BufferedImage.getvalue())
