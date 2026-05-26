import sqlite3
import os
from fastmcp import FastMCP

mcp = FastMCP("licitamei")

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, "licitacoes_mei.db")

def _obter_conexao():
    return sqlite3.connect(DB_PATH)

@mcp.tool()
def listar_estados_disponiveis() -> list:
    """Retorna uma lista com as siglas dos estados que possuem licitações ativas no banco de dados."""
    if not os.path.exists(DB_PATH): return []
    with _obter_conexao() as conn:
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        cursor.execute("SELECT DISTINCT estado FROM licitacoes_ativas WHERE estado != 'N/A' AND estado IS NOT NULL")
        return [row['estado'] for row in cursor.fetchall()]

@mcp.tool()
def buscar_licitacoes_por_estado(estado: str, apenas_mei: bool = False) -> list:
    """
    Busca licitações ativas em um estado específico.
    
    Args:
        estado: Sigla do estado (ex: 'SP', 'PE', 'RJ').
        apenas_mei: Se True, filtra apenas aquelas identificadas com foco em MEI.
    """
    if not os.path.exists(DB_PATH): return []
    with _obter_conexao() as conn:
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        
        query = "SELECT numero, orgao, descricao, data_publicacao, foco_mei FROM licitacoes_ativas WHERE estado = ?"
        params = [estado]
        
        if apenas_mei:
            query += " AND foco_mei = 1"
            
        cursor.execute(query, params)
        return [dict(row) for row in cursor.fetchall()]

@mcp.tool()
def resumo_licitacoes() -> dict:
    """
    Retorna o total de licitações ativas no banco e quantas delas são focadas em MEI.
    """
    if not os.path.exists(DB_PATH): return {"total": 0, "foco_mei": 0}
    with _obter_conexao() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT COUNT(*) FROM licitacoes_ativas")
        total = cursor.fetchone()[0]
        cursor.execute("SELECT COUNT(*) FROM licitacoes_ativas WHERE foco_mei = 1")
        mei = cursor.fetchone()[0]
        return {"total": total, "foco_mei": mei}

if __name__ == "__main__":
    mcp.run()
