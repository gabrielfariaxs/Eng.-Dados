import json
import os
import asyncio
import streamlit as st
from openai import OpenAI
from fastmcp import Client
from mcp_server import mcp
from dotenv import load_dotenv

load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

openai_client = OpenAI(api_key=OPENAI_API_KEY)

def run_async(coro):
    """Executa corrotina em thread separada para não conflitar com o event loop do Streamlit."""
    with __import__("concurrent.futures", fromlist=["ThreadPoolExecutor"]).ThreadPoolExecutor() as pool:
        return pool.submit(asyncio.run, coro).result()

async def _list_tools():
    async with Client(mcp) as client:
        return await client.list_tools()

async def _call_tool(name: str, args: dict):
    async with Client(mcp) as client:
        return await client.call_tool(name, args)

def to_openai_tool(t) -> dict:
    return {
        "type": "function",
        "function": {
            "name": t.name,
            "description": t.description or "",
            "parameters": t.inputSchema,
        },
    }

SYSTEM_PROMPT = """Você é um assistente virtual do LicitaMEI, especializado em ajudar Microempreendedores Individuais (MEIs) a encontrarem oportunidades de compras públicas.

Você tem acesso ao banco de dados do projeto (extraído do PNCP).

## Como ajudar:
1. Se o usuário perguntar de um estado, use a tool buscar_licitacoes_por_estado. Lembre-se que estados usam a sigla (ex: SP, PE).
2. Se ele perguntar de forma genérica o total, use resumo_licitacoes.
3. Se ele não souber os estados, você pode listar usando listar_estados_disponiveis.

## Respostas:
- Seja prestativo, claro e foque no MEI.
- Formate as licitações em formato de lista, destacando o Órgão e o Objeto (descrição).
- Traga sempre o número da compra e a data de publicação.
"""

def chat(pergunta: str) -> str:
    mcp_tools = run_async(_list_tools())
    openai_tools = [to_openai_tool(t) for t in mcp_tools]

    if "messages" not in st.session_state:
        st.session_state.messages = [
            {"role": "system", "content": SYSTEM_PROMPT}
        ]
        
    st.session_state.messages.append({"role": "user", "content": pergunta})

    # Call OpenAI
    response = openai_client.chat.completions.create(
        model="gpt-4o-mini",
        messages=st.session_state.messages,
        tools=openai_tools,
    )

    msg = response.choices[0].message
    st.session_state.messages.append(msg)

    # Handle Tool Calls
    if msg.tool_calls:
        for tc in msg.tool_calls:
            try:
                args = json.loads(tc.function.arguments)
                resultado = run_async(_call_tool(tc.function.name, args))
                content = resultado.content[0].text if resultado and resultado.content else "sem resultado"
            except Exception as e:
                content = f"Erro ao chamar tool: {str(e)}"
                
            st.session_state.messages.append({
                "role": "tool",
                "tool_call_id": tc.id,
                "content": content,
            })

        # Second LLM call to summarize tool results
        final = openai_client.chat.completions.create(
            model="gpt-4o-mini",
            messages=st.session_state.messages,
        )
        st.session_state.messages.append(final.choices[0].message)
        return final.choices[0].message.content

    return msg.content

# Streamlit UI
st.set_page_config(page_title="Chatbot LicitaMEI", page_icon="🤖")
st.title("🤖 Chatbot LicitaMEI (MCP + Streamlit)")
st.markdown("Bem-vindo! Sou o assistente do LicitaMEI. Posso consultar nossa base de dados para te informar sobre oportunidades de licitações públicas para MEI em cada estado do Brasil.")

# Exibe mensagens do histórico (esconde system e tool calls da UI)
if "messages" in st.session_state:
    for m in st.session_state.messages:
        role = getattr(m, 'role', m.get('role', ''))
        if role in ['user', 'assistant']:
            content = getattr(m, 'content', m.get('content', ''))
            if content:
                with st.chat_message(role):
                    st.write(content)

pergunta = st.chat_input("Pergunte algo como: 'Quais as licitações para MEI em PE?'")

if pergunta:
    with st.chat_message("user"):
        st.write(pergunta)
    with st.spinner("Consultando base de dados PNCP via MCP..."):
        resposta = chat(pergunta)
    with st.chat_message("assistant"):
        st.write(resposta)
