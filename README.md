# Integração Universities API

Este projeto consiste em um script em Python que consome a [Universities API](http://universities.hipolabs.com/) para buscar uma lista de instituições de ensino de um país específico. Os dados retornados são extraídos e salvos em um banco de dados local SQLite (`universities.db`). A tabela é gerada automaticamente recebendo o nome do país pesquisado.

## Requisitos do Projeto
- O código segue boas práticas com docstrings documentando os métodos.
- O código está formatado no padrão da biblioteca **Black**.

## Como executar
O script utiliza apenas bibliotecas nativas do Python 3 (`sqlite3`, `urllib`, `json`), não sendo necessária a instalação de bibliotecas externas para a sua execução principal.

Rode o script no terminal:
```bash
python universities_api.py
```

Você será solicitado a digitar o nome de um país em inglês (ex: `Brazil`, `United States`, `Canada`). O script fará a requisição e mostrará o número de instituições salvas no banco de dados.

## Integrantes do Grupo
- Gabriel Farias
- Ewerton Monteiro
