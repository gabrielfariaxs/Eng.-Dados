import asyncio
from typing import Optional, List, Dict, Any
from pymongo import MongoClient

# Se o pacote mcp.server.fastmcp estiver disponível (MCP Python SDK)
try:
    from mcp.server.fastmcp import FastMCP
    mcp = FastMCP("Servidor_PNCP")
except ImportError:
    # Fallback se a biblioteca não estiver no formato esperado ou instalada
    mcp = None

from src.config.settings import settings

# Conexão Global (mantida em estado para o servidor)
client = MongoClient(settings.MONGODB_URI)
db = client[settings.MONGODB_DATABASE]
collection = db[settings.MONGODB_COLLECTION]

def _build_query(orgao: Optional[str] = None, modalidade: Optional[str] = None, uf: Optional[str] = None, data_inicial: Optional[str] = None, data_final: Optional[str] = None) -> Dict[str, Any]:
    query = {}
    if orgao:
        # Busca case-insensitive na razão social do órgão
        query["orgaoEntidade.razaoSocial"] = {"$regex": orgao, "$options": "i"}
    if modalidade:
        query["modalidadeNome"] = {"$regex": modalidade, "$options": "i"}
    if uf:
        query["uf"] = {"$regex": uf, "$options": "i"}
    
    # Filtro por período (data de publicação)
    if data_inicial or data_final:
        query["dataPublicacaoPncp"] = {}
        if data_inicial:
            query["dataPublicacaoPncp"]["$gte"] = data_inicial
        if data_final:
            query["dataPublicacaoPncp"]["$lte"] = data_final
            
    return query

if mcp:
    @mcp.tool()
    def consultar_contratacoes_pncp(orgao: str = None, modalidade: str = None, uf: str = None, data_inicial: str = None, data_final: str = None, limite: int = 10) -> str:
        """
        Consulta os dados curados de contratações do PNCP armazenados no MongoDB.
        Permite filtrar por órgão, modalidade, Unidade Federativa (UF) e período de publicação.
        
        Args:
            orgao: Parte do nome do órgão/entidade (ex: 'Ministério da Gestão')
            modalidade: Nome da modalidade de compra (ex: 'Pregão Eletrônico')
            uf: Sigla da Unidade Federativa (ex: 'DF', 'PE')
            data_inicial: Data de publicação inicial no formato ISO (ex: '2023-01-01')
            data_final: Data de publicação final no formato ISO (ex: '2023-12-31')
            limite: Número máximo de resultados a retornar. Padrão 10.
        """
        query = _build_query(orgao, modalidade, uf, data_inicial, data_final)
        
        resultados = list(collection.find(query, {"_id": 0}).limit(limite))
        
        if not resultados:
            return "Nenhuma contratação encontrada com os filtros especificados."
            
        # Formatar a saída de maneira amigável para o modelo (texto)
        saida = []
        for r in resultados:
            valor = r.get('valorTotalEstimado', 0)
            linha = (f"ID: {r.get('numeroControlePNCP')} | Órgão: {r.get('orgaoEntidade', {}).get('razaoSocial')} "
                     f"| UF: {r.get('uf')} | Modalidade: {r.get('modalidadeNome')} "
                     f"| Valor: R$ {valor:,.2f} | Objeto: {r.get('objetoCompra')}")
            saida.append(linha)
            
        return "\n".join(saida)

if __name__ == "__main__":
    print("Iniciando Servidor MCP PNCP...")
    if mcp:
        mcp.run()
    else:
        print("SDK MCP não encontrado. Por favor, instale a versão correta de `mcp`.")
