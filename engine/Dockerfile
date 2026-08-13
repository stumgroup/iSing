FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

RUN pip install --no-cache-dir fastapi uvicorn pydantic

WORKDIR /opt/ising-ai

COPY app.py /opt/ising-ai/app.py
COPY start.sh /opt/ising-ai/start.sh

RUN chmod +x /opt/ising-ai/start.sh

EXPOSE 8001

CMD ["/opt/ising-ai/start.sh"]
