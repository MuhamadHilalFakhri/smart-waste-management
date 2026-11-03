FROM python:3.11-slim
WORKDIR /service
COPY services/ml/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY services/ml/app ./app
RUN useradd --create-home inference
USER inference
CMD ["uvicorn","app.main:app","--host","0.0.0.0","--port","8001"]
