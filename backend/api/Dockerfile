# Use the official slim Python image
FROM python:3.12-slim

# Set environment variables to optimize Python behavior
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_NO_CACHE_DIR=1 \
    DB_URL=db_url \
    GEMINI_API_KEY=api_key \
    DJANGO_SECRET_KEY=secret_key \
    ALLOWED_HOSTS="localhost" \
    SECURE_SSL_REDIRECT=false \
    CORS_ALLOWED_ORIGINS="http://localhost:3000" \
    SECURE_HSTS_SECONDS=0 \
    SECURE_HSTS_INCLUDE_SUBDOMAINS=false


# Set the working directory
WORKDIR /app

# Copy only requirements first for caching
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire project
COPY . .

# Expose the Django port (default: 8000)
EXPOSE 8000

# Start Gunicorn server for Django
CMD ["sh", "-c", "python manage.py migrate --noinput && gunicorn gdg.wsgi:application --bind 0.0.0.0:8000 --workers 4 --threads 2 --timeout 120"]


