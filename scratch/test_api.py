import requests
import json

url = "https://pncp.gov.br/api/consulta/v1/contratacoes/proposta"
params = {
    "dataInicial": "20260512",
    "dataFinal": "20260531",
    "pagina": 1
}

try:
    response = requests.get(url, params=params)
    print(f"Status: {response.status_code}")
    if response.status_code == 200:
        print(json.dumps(response.json(), indent=2, ensure_ascii=False)[:1000])
    else:
        print(response.text)
except Exception as e:
    print(f"Error: {e}")
