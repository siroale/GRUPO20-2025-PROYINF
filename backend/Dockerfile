FROM python:3-alpine

WORKDIR /app

RUN apk update && apk add \
	build-base \
	libpq-dev \
	&& rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY src/ .

EXPOSE 8000

CMD ["gunicorn", "vigifia_backend.wsgi:application", "--bind", "0.0.0.0:8000"]
