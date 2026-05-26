import os, json, logging, requests, sqlite3
import pandas as pd
import matplotlib.pyplot as plt
from datetime import datetime, timedelta
from pymongo import MongoClient
from dotenv import load_dotenv, find_dotenv

logging.basicConfig(level=logging.INFO, format='%(levelname)s: %(message)s')
logger = logging.getLogger(__name__)

class LicitacaoMEIETL:
    """Pipeline ETL para processamento de licitações voltadas para MEI (PNCP)."""
    
    def __init__(self, dias_frente: int = 15):
        load_dotenv(find_dotenv())
        self.dias_frente = dias_frente
        self.data = None
        # Datas para o PNCP
        self.data_inicio = datetime.now().strftime("%Y%m%d")
        self.data_fim = (datetime.now() + timedelta(days=dias_frente)).strftime("%Y%m%d")

    def extract(self):
        """Busca licitações com propostas abertas no PNCP."""
        try:
            logger.info(f"Extraindo licitações de {self.data_inicio} até {self.data_fim}...")
            url = "https://pncp.gov.br/api/consulta/v1/contratacoes/proposta"
            params = {
                "dataInicial": self.data_inicio,
                "dataFinal": self.data_fim,
                "pagina": 1,
                "tamanhoPagina": 50
            }
            r = requests.get(url, params=params)
            r.raise_for_status()
            response_json = r.json()
            self.data = response_json.get('data', [])
            return self
        except Exception as e:
            logger.error(f"Erro na extração: {e}")
            return self

    def transform(self):
        """Limpa e formata os dados das licitações."""
        if not self.data: 
            logger.warning("Sem dados para transformar.")
            return self
            
        df = pd.DataFrame(self.data)
        
        # Flatten nested columns
        df['orgao_nome'] = df['orgaoEntidade'].apply(lambda x: x.get('razaoSocial') if isinstance(x, dict) else 'N/A')
        df['uf'] = df['unidadeOrgao'].apply(lambda x: x.get('ufSigla') if isinstance(x, dict) else 'N/A')
        
        # Selecionar e renomear colunas úteis
        logger.info(f"Colunas disponíveis: {df.columns.tolist()}")
        
        cols = {
            'numeroCompra': 'numero',
            'objeto': 'descricao',
            'dataPublicacaoPncp': 'data_publicacao',
            'orgao_nome': 'orgao',
            'uf': 'estado'
        }
        
        # Só renomeia se a coluna existir no DF
        existing_cols = {k: v for k, v in cols.items() if k in df.columns}
        df = df.rename(columns=existing_cols)
        
        # Selecionar apenas o que conseguimos mapear
        self.data = df[list(existing_cols.values())].copy()
        
        # Adicionar flag se menciona MEI/Microempresa no objeto
        if 'descricao' in self.data.columns:
            self.data['foco_mei'] = self.data['descricao'].str.contains('MEI|ME |EPP|Microempresa', case=False, na=False)
        else:
            self.data['foco_mei'] = False
        
        logger.info(f"Transformação concluída. {len(self.data)} licitações processadas.")
        return self

    def load_sqlite(self, db_path=None):
        """Salva no SQLite local."""
        if self.data is None or self.data.empty: return self
        if db_path is None:
            # Salva o banco no diretório irmão chatbot_mcp/
            base_dir = os.path.dirname(os.path.abspath(__file__))
            db_path = os.path.join(base_dir, "..", "chatbot_mcp", "licitacoes_mei.db")
        try:
            with sqlite3.connect(db_path) as conn:
                self.data.to_sql("licitacoes_ativas", conn, if_exists='replace', index=False)
            logger.info(f"Salvo no SQLite: {db_path}")
        except Exception as e: 
            logger.error(f"Erro SQLite: {e}")
        return self

    def load_mongo(self):
        """Salva no MongoDB Atlas se configurado."""
        uri = os.getenv("MONGODB_URI")
        if not uri or "<password>" in uri: 
            logger.warning("MongoDB não configurado. Pulando...")
            return self
        try:
            client = MongoClient(uri)
            db = client[os.getenv("DB_NAME", "licitamei_db")]
            col = db[os.getenv("COLLECTION_NAME", "oportunidades")]
            col.delete_many({}) # Limpa para o demo
            col.insert_many(self.data.to_dict('records'))
            logger.info("Salvo no MongoDB Atlas.")
            client.close()
        except Exception as e: 
            logger.error(f"Erro MongoDB: {e}")
        return self

    def analyze(self):
        """Gera um gráfico de licitações por estado."""
        if self.data is None or self.data.empty: return
        
        plt.figure(figsize=(10,6))
        self.data['estado'].value_counts().plot(kind='bar', color='green')
        plt.title('Oportunidades de Licitação por Estado (Foco MEI)')
        plt.xlabel('Estado')
        plt.ylabel('Quantidade')
        plt.tight_layout()
        base_dir = os.path.dirname(os.path.abspath(__file__))
        img_path = os.path.join(base_dir, "analise_licitacoes_mei.png")
        plt.savefig(img_path)
        logger.info(f"Dashboard gerado: {img_path}")
