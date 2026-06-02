# 🎓 LicitaMEI: Inteligência e Engenharia de Dados para Compras Públicas

Este repositório contém a infraestrutura de **Engenharia de Dados**, o **Assistente de Inteligência Artificial (Chatbot MCP)** e o **Aplicativo Móvel** do ecossistema **LicitaMEI**. O objetivo do projeto é democratizar o acesso de Microempreendedores Individuais (MEIs) ao mercado de licitações públicas brasileiras, automatizando o processamento de dados e simplificando a tomada de decisão.

---

## 📁 Estrutura de Diretórios e Responsabilidades

Para manter o projeto limpo e sustentável, o repositório é organizado em módulos intuitivos por responsabilidade:

```text
Eng.-Dados/
│
├── chatbot_mcp/               # 🤖 Chatbot Inteligente e Servidor MCP
│   ├── licitacoes_mei.db      # Banco de dados SQLite local com as licitações processadas
│   ├── mcp_server.py          # Servidor FastMCP que expõe as ferramentas de busca no SQLite
│   └── chatbot.py             # Interface gráfica do chat desenvolvida em Streamlit
│
├── data_pipeline/             # 🔄 Pipeline de Engenharia de Dados (ETL & Big Data)
│   ├── pipeline.py            # Módulo ETL principal (Extração PNCP -> Pandas -> SQLite/MongoDB)
│   ├── spark_transform.py     # Processamento em lote de Big Data com PySpark
│   ├── orchestrate_prefect.py # Orquestrador Prefect para automação e agendamento diário
│   ├── main.py                # Interface de linha de comando para execução manual do ETL
│   ├── analise_brazil.png     # Gráfico gerado de análise de licitações
│   └── analise_licitacoes_mei.png # Gráfico gerado de oportunidades por estado
│
├── mobile/                    # 📱 Aplicativo Móvel (React Native / Expo)
│   ├── src/
│   │   ├── components/        # Componentes visuais comuns (Header, CustomTabBar)
│   │   ├── screens/           # Telas do app (Dashboard, Editais, Documentos, Alertas, Login)
│   │   └── navigation/        # Configuração de rotas e abas do aplicativo
│   └── package.json           # Dependências do app mobile
│
├── milestones/                # 🎓 Histórico de Documentações de Entregas (M1 a M3)
│   ├── milestone1/            # Backlog e mapa de navegação inicial
│   ├── milestone2/            # Implementação e evidências do fluxo de editais
│   ├── milestone3/            # MVP integrado com persistência e documentação
│   └── security/              # Relatórios e regras de conformidade LGPD e segurança
│
├── .env.example               # Modelo de configuração de credenciais (.env)
├── .gitignore                 # Arquivos ignorados pelo controle de versão Git
└── requirements.txt           # Dependências globais de bibliotecas Python
```

---

## 🚀 Como Executar

### 1. Pré-requisitos
*   **Python 3.10+** instalado.
*   **Java 8+** instalado (necessário apenas para executar as transformações com PySpark).
*   **Node.js & npm** instalados (para rodar o aplicativo móvel).
*   Instalar as dependências do Python a partir da raiz:
    ```bash
    pip install -r requirements.txt
    ```

---

### 2. Executando o Pipeline de Dados (ETL)

A camada de dados pode ser executada de duas formas (rodando a partir da pasta raiz do projeto):

*   **Execução Manual (CLI)**:
    ```bash
    python data_pipeline/main.py
    ```
    *Isso solicitará o intervalo de dias e fará a carga completa no SQLite e MongoDB Atlas.*

*   **Execução Orquestrada (Prefect)**:
    ```bash
    python data_pipeline/orchestrate_prefect.py
    ```
    *Isso executará o pipeline através do Prefect, rodando inclusive a etapa de PySpark de forma automatizada.*

---

### 3. Executando o Chatbot Inteligente (IA)

O chatbot utiliza a API da OpenAI e as ferramentas do servidor MCP para responder perguntas sobre o banco de dados.

1.  Crie um arquivo `.env` na raiz do projeto (use o `.env.example` como base).
2.  Preencha com a sua chave da OpenAI na variável `OPENAI_API_KEY`.
3.  Abra um terminal e inicie o chatbot:
    ```bash
    streamlit run chatbot_mcp/chatbot.py
    ```
    *A interface gráfica do chat abrirá automaticamente no seu navegador em `http://localhost:8501`.*

---

### 4. Executando o Aplicativo Móvel (Mobile App)

O aplicativo foi desenvolvido em React Native/Expo e pode ser visualizado diretamente no seu navegador.

1.  Entre na pasta do aplicativo:
    ```bash
    cd mobile
    ```
2.  Instale os pacotes npm:
    ```bash
    npm install
    ```
3.  Inicie a versão web:
    ```bash
    npm run web
    ```
    *A interface do app com a nova identidade visual abrirá em `http://localhost:8081`.*

---

## 🛠️ Tecnologias Utilizadas
*   **Prefect**: Automação e agendamento de fluxos de dados.
*   **PySpark**: Processamento distribuído de dados (Big Data).
*   **Pandas & SQLite**: Tratamento e persistência local de dados.
*   **MongoDB Atlas**: Banco de dados NoSQL baseado em nuvem para produção.
*   **FastMCP & Streamlit**: Servidor MCP e interface de Chatbot de IA.
*   **React Native & Expo**: Desenvolvimento do aplicativo móvel multiplataforma.
*   **Lucide React Native**: Ícones modernos e limpos para a UI.

---

## 👥 Equipe do Projeto
*   **Isabella Karla**
*   **Gabriel Farias**
*   **Lucas Luna**
