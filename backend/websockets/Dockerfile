# Use an official Python runtime as a parent image
FROM python:3.12-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV GEMINI_API_KEY=api_key

# Set work directory
WORKDIR /app

RUN apt-get update && apt-get install -y libgl1-mesa-glx libglib2.0-0

RUN pip install torch torchvision --index-url https://download.pytorch.org/whl/cpu

# Copy requirements file and install Python dependencies
COPY requirements.txt /app/
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy project code
COPY . /app/

# Expose port 8000
EXPOSE 8000

# Run migrations and then start Uvicorn
CMD ["sh", "-c", "python manage.py migrate && uvicorn vision.asgi:application --host 0.0.0.0 --port 8000"]
