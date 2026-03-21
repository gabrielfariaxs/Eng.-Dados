import sqlite3
import urllib.request
import urllib.parse
import urllib.error
import json

def fetch_and_store_universities(country_name: str, db_name: str = "universities.db"):
    """
    Busca instituições de ensino de um país na Universities API e armazena em um banco de dados SQLite.
    
    Args:
        country_name (str): O nome do país em inglês (ex: 'Brazil', 'United States').
        db_name (str): Nome do arquivo do banco de dados SQLite. Padrão: 'universities.db'.
    """
    # 1. Consultar a Universities API
    # Evita erros com espaços no nome do país na URL
    safe_country_name = urllib.parse.quote(country_name)
    url = f"http://universities.hipolabs.com/search?country={safe_country_name}"
    print(f"Consultando a API para o país: {country_name}...")
    
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            if response.status != 200:
                print(f"Erro na requisição: status HTTP {response.status}")
                return
            data_json = response.read().decode('utf-8')
            data = json.loads(data_json)
    except urllib.error.URLError as e:
        print(f"Erro ao consultar a API: {e}")
        return
    except json.JSONDecodeError:
        print("Erro ao tentar decodificar o JSON retornado pela API.")
        return

    if not data:
        print(f"Nenhuma instituição encontrada para o país: '{country_name}'. Verifique o nome do país.")
        return

    # 2. Conectar ao banco de dados SQLite (será criado se não existir)
    conn = sqlite3.connect(db_name)
    cursor = conn.cursor()

    # Envolver o nome da tabela em aspas duplas e proteger possíveis aspas
    safe_table_name = country_name.replace('"', '""')
    table_name = f'"{safe_table_name}"'

    # 3. Criar a tabela automaticamente caso não exista
    create_table_query = f'''
    CREATE TABLE IF NOT EXISTS {table_name} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        country TEXT,
        alpha_two_code TEXT,
        state_province TEXT,
        domains TEXT,
        web_pages TEXT
    )
    '''
    cursor.execute(create_table_query)

    # 4. Inserir os dados na tabela
    insert_query = f'''
    INSERT INTO {table_name} (name, country, alpha_two_code, state_province, domains, web_pages)
    VALUES (?, ?, ?, ?, ?, ?)
    '''
    
    records_to_insert = []
    for uni in data:
        name = uni.get('name')
        country_api = uni.get('country')
        alpha_two_code = uni.get('alpha_two_code')
        state_province = uni.get('state-province')
        
        # Como domains e web_pages são listas, vamos convertê-las para string JSON para salvar no banco
        domains = json.dumps(uni.get('domains', []))
        web_pages = json.dumps(uni.get('web_pages', []))
        
        records_to_insert.append((name, country_api, alpha_two_code, state_province, domains, web_pages))
    
    # Executar a inserção em lote para melhor performance
    cursor.executemany(insert_query, records_to_insert)
    conn.commit()
    conn.close()
    
    print(f"Sucesso! {len(records_to_insert)} instituições salvas na tabela {table_name} no banco '{db_name}'.")

# Exemplo de uso
if __name__ == "__main__":
    pais = input("Digite o nome do país em inglês (ex: Brazil, Canada, United States): ")
    fetch_and_store_universities(pais)
