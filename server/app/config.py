# This file is a replacement to the previous methid whereby we use dotenv library and load the variables directly
# This keeps everything centralized and ensures that pydantic validates the env variable content and converts
# them to appropriate type if necessary
from pydantic_settings import BaseSettings


# pydantic is case insensitive but whatever
class Settings(BaseSettings):
    # NEED NEW VARIABLES BUT THIS IS AN EXAMPLE
    DB_HOST: str
    DB_PORT: str
    DB_PASSWORD: str
    DB_NAME: str
    DB_USERNAME: str
    AUTH_SECRET_KEY: str
    AUTH_ALGORITHM: str
    JWT_EXPIRY_MINUTES: int
    # auto parse from .env

    class Config:
        env_file = ".env"


settings = Settings()
