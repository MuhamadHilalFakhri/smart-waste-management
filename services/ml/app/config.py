from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    model_dir: str = "/models"
    ml_token: str


settings = Settings()
