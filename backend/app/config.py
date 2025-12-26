from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    database_url: str = "sqlite:///./smartfinance.db"
    secret_key: str = "smartfinance-secret-key-2024"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 43200  # 30 days

    class Config:
        env_file = ".env"


@lru_cache()
def get_settings():
    return Settings()


settings = get_settings()
