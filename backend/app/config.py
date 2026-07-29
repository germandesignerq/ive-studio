from pathlib import Path
from typing import List

from pydantic_settings import BaseSettings, SettingsConfigDict

BASE_DIR = Path(__file__).resolve().parent.parent


class Settings(BaseSettings):
    """Настройки читаются из окружения и .env — см. .env.example."""

    model_config = SettingsConfigDict(env_file=BASE_DIR / ".env", extra="ignore")

    # откуда фронтенд может дергать API
    cors_origins: List[str] = ["http://localhost:5173", "http://127.0.0.1:5173"]

    # файл SQLite с заявками
    database_path: Path = BASE_DIR / "leads.db"

    # токен для чтения заявок через GET /api/leads; пустой — эндпоинт закрыт
    admin_token: str = ""


settings = Settings()
