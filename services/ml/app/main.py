from contextlib import asynccontextmanager
from io import BytesIO
import secrets
from fastapi import FastAPI, UploadFile, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from starlette.concurrency import run_in_threadpool
from PIL import Image, UnidentifiedImageError
from .config import settings
from .model import Classifier
from pydantic import BaseModel, Field
from typing import Literal


class Prediction(BaseModel):
    label: Literal["organic", "paper", "plastic"]
    confidence: float = Field(ge=0, le=1)
    probabilities: dict[str, float]
    model_version: str


@asynccontextmanager
async def lifespan(app):
    app.state.classifier = Classifier(settings.model_dir)
    yield


app = FastAPI(title="Smart Waste Classification", version="1.0.0", lifespan=lifespan)
security = HTTPBearer()


def authenticate(credentials: HTTPAuthorizationCredentials = Depends(security)):
    if not secrets.compare_digest(credentials.credentials, settings.ml_token):
        raise HTTPException(401, "Token tidak valid")


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/ready")
def ready():
    if app.state.classifier.model is None:
        raise HTTPException(503, "Model belum dipasang")
    return {"status": "ready"}


@app.post("/predict", response_model=Prediction, dependencies=[Depends(authenticate)])
async def predict(file: UploadFile):
    if app.state.classifier.model is None:
        raise HTTPException(503, "Model belum dipasang")
    content = await file.read(5 * 1024 * 1024 + 1)
    if len(content) > 5 * 1024 * 1024:
        raise HTTPException(413, "Foto maksimal 5 MB")
    try:
        image = Image.open(BytesIO(content))
        if (
            image.format not in ("JPEG", "PNG", "WEBP")
            or image.width * image.height > 25000000
        ):
            raise HTTPException(422, "Format atau ukuran gambar tidak didukung")
        image.load()
        return await run_in_threadpool(app.state.classifier.predict, image)
    except (UnidentifiedImageError, OSError, Image.DecompressionBombError):
        raise HTTPException(422, "Gambar tidak valid")
