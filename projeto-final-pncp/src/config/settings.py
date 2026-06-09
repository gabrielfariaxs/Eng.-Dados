import os
from dotenv import load_dotenv

# Carrega as variáveis do arquivo .env (se existir)
load_dotenv()

class Settings:
    # MongoDB
    MONGODB_URI: str = os.getenv("MONGODB_URI", "mongodb://localhost:27017/")
    MONGODB_DATABASE: str = os.getenv("MONGODB_DATABASE", "pncp_db")
    MONGODB_COLLECTION: str = os.getenv("MONGODB_COLLECTION", "contratacoes")

    # API PNCP
    PNCP_API_BASE_URL: str = os.getenv("PNCP_API_BASE_URL", "https://pncp.gov.br/api/pncp/v1")

settings = Settings()
