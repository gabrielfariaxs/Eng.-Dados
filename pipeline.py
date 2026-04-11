import os, json, logging, requests, sqlite3
import pandas as pd
import matplotlib.pyplot as plt
from abc import ABC, abstractmethod
from pymongo import MongoClient
from dotenv import load_dotenv

logging.basicConfig(level=logging.INFO, format='%(levelname)s: %(message)s')
logger = logging.getLogger(__name__)

class UniversityETL:
    """Pipeline ETL para processamento de dados de universidades."""
    
    def __init__(self, country: str):
        load_dotenv()
        self.country = country
        self.data = None

    def extract(self):
        """Busca dados brutos da API."""
        try:
            logger.info(f"Extraindo dados para {self.country}...")
            r = requests.get("http://universities.hipolabs.com/search", params={"country": self.country})
            r.raise_for_status()
            self.data = r.json()
            return self
        except Exception as e:
            logger.error(f"Erro na extração: {e}")
            return self

    def transform(self):
        """Limpa e formata os dados usando Pandas."""
        if not self.data: return self
        df = pd.DataFrame(self.data)
        df.columns = [c.replace("-", "_") for c in df.columns]
        df['state_province'] = df['state_province'].fillna('N/A')
        self.data = df.drop_duplicates(subset=['name'])
        logger.info("Transformação concluída.")
        return self

    def load_sqlite(self, db_path="universities.db"):
        """Salva no SQLite local."""
        if self.data is None or self.data.empty: return self
        try:
            df_temp = self.data.copy()
            for col in ['web_pages', 'domains']: df_temp[col] = df_temp[col].apply(json.dumps)
            with sqlite3.connect(db_path) as conn:
                df_temp.to_sql(self.country.lower().replace(" ", "_"), conn, if_exists='replace', index=False)
            logger.info(f"Salvo no SQLite: {db_path}")
        except Exception as e: logger.error(f"Erro SQLite: {e}")
        return self

    def load_mongo(self):
        """Salva no MongoDB Atlas se configurado."""
        uri = os.getenv("MONGODB_URI")
        if not uri or "<password>" in uri: 
            logger.warning("MongoDB não configurado. Pulando...")
            return self
        try:
            client = MongoClient(uri)
            db = client[os.getenv("DB_NAME", "univ_db")]
            col = db[os.getenv("COLLECTION_NAME", "univs")]
            col.delete_many({"country": self.country})
            col.insert_many(self.data.to_dict('records'))
            logger.info("Salvo no MongoDB Atlas.")
            client.close()
        except Exception as e: logger.error(f"Erro MongoDB: {e}")
        return self

    def analyze(self):
        """Gera um gráfico simples como diferencial."""
        if self.data is None or self.data.empty: return
        top = self.data['state_province'].value_counts().head(10)
        top.plot(kind='bar', color='skyblue', figsize=(10,6), title=f'Universidades - {self.country}')
        plt.tight_layout()
        plt.savefig(f"analise_{self.country.lower()}.png")
        logger.info(f"Dashboard gerado: analise_{self.country.lower()}.png")
