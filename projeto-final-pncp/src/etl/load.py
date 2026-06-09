from abc import ABC, abstractmethod
from typing import List, Dict, Any
from pymongo import MongoClient, UpdateOne
import logging

from src.config.settings import settings

logger = logging.getLogger(__name__)

class BaseLoader(ABC):
    @abstractmethod
    def load(self, data: Any) -> None:
        pass

class MongoDBLoader(BaseLoader):
    def __init__(self, uri: str = None, database: str = None, collection: str = None):
        self.uri = uri or settings.MONGODB_URI
        self.db_name = database or settings.MONGODB_DATABASE
        self.collection_name = collection or settings.MONGODB_COLLECTION
        
        self.client = None
        self.db = None
        self.collection = None

    def connect(self):
        if not self.client:
            logger.info(f"Conectando ao MongoDB Database: {self.db_name}")
            self.client = MongoClient(self.uri)
            self.db = self.client[self.db_name]
            self.collection = self.db[self.collection_name]
            
            # Criar índice único para garantir idempotência baseada no numero de controle
            self.collection.create_index("numeroControlePNCP", unique=True)

    def close(self):
        if self.client:
            self.client.close()
            self.client = None

    def load(self, data: List[Dict[str, Any]]) -> None:
        if not data:
            logger.info("Nenhum dado para carregar no MongoDB.")
            return

        self.connect()
        
        operations = []
        for item in data:
            # Estratégia de Upsert: se o registro já existe, atualiza os dados; caso contrário, insere
            filter_query = {"numeroControlePNCP": item.get("numeroControlePNCP")}
            update_query = {"$set": item}
            operations.append(UpdateOne(filter_query, update_query, upsert=True))
            
        if operations:
            try:
                result = self.collection.bulk_write(operations)
                logger.info(f"Carga finalizada. Inseridos: {result.upserted_count}, Modificados: {result.modified_count}")
            except Exception as e:
                logger.error(f"Erro ao carregar dados no MongoDB: {e}")
                raise
        
        self.close()
