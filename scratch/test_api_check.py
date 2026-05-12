import requests
try:
    print("Testando API PNCP...")
    r = requests.get("https://pncp.gov.br/api/consulta/v1/contratacoes/proposta", params={"dataInicial": "20260512", "dataFinal": "20260531", "pagina": 1}, timeout=10)
    print(f"Status: {r.status_code}")
    print(f"Dados: {len(r.json().get('data', []))}")
except Exception as e:
    print(f"Erro: {e}")
