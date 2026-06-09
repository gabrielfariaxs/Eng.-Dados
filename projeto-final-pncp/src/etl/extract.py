from abc import ABC, abstractmethod
import requests
from requests.exceptions import RequestException
from tenacity import retry, stop_after_attempt, wait_exponential, retry_if_exception_type
from typing import List, Dict, Any, Optional
import logging

from src.config.settings import settings

logger = logging.getLogger(__name__)

class BaseExtractor(ABC):
    @abstractmethod
    def extract(self, *args, **kwargs) -> Any:
        pass

class PNCPAPIExtractor(BaseExtractor):
    def __init__(self, base_url: str = None):
        # Utiliza uma base de consulta, que pode variar se for v1/contratacoes etc.
        self.base_url = base_url or "https://pncp.gov.br/api/consulta/v1"
        self.session = requests.Session()

    @retry(
        stop=stop_after_attempt(5),
        wait=wait_exponential(multiplier=1, min=4, max=60),
        retry=retry_if_exception_type(RequestException),
        reraise=True
    )
    def _fetch_page(self, endpoint: str, params: Dict[str, Any]) -> Dict[str, Any]:
        """Faz a requisição com retries configurados."""
        url = f"{self.base_url}/{endpoint}"
        logger.info(f"Buscando URL: {url} com parâmetros: {params}")
        
        response = self.session.get(url, params=params, timeout=30)
        response.raise_for_status()
        return response.json()

    def extract(self, data_inicial: str, data_final: str, pagina_inicial: int = 1) -> List[Dict[str, Any]]:
        """
        Extrai contratações por intervalo de datas tratando a paginação.
        datas no formato YYYYMMDD.
        """
        todas_contratacoes = []
        pagina_atual = pagina_inicial
        
        while True:
            params = {
                "dataInicial": data_inicial,
                "dataFinal": data_final,
                "pagina": pagina_atual,
                "tamanhoPagina": 50
            }
            
            try:
                data = self._fetch_page("contratacoes", params)
                # O formato do retorno geralmente tem uma chave 'data' ou os itens na raiz, 
                # e informações de total de páginas. Assumindo padrão comum do PNCP:
                items = data.get("data", [])
                if not items:
                    # Se não veio a chave 'data', talvez seja uma lista direta
                    if isinstance(data, list):
                        items = data
                    else:
                        break # Não encontrou itens
                
                todas_contratacoes.extend(items)
                
                # Controle de paginação
                total_paginas = data.get("totalPaginas", 1)
                if pagina_atual >= total_paginas or not items:
                    break
                    
                pagina_atual += 1
                
            except Exception as e:
                logger.error(f"Erro ao extrair página {pagina_atual}: {e}")
                raise

        return todas_contratacoes
