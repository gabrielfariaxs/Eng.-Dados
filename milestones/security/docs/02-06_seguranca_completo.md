# Segurança do Projeto MEI: Itens 2 a 6

Aqui estão os detalhes das outras partes de segurança do projeto integrado.

---

## Item 2: Dados e Anonimização
Protegemos os dados salvos tanto no celular quanto no servidor:
*   **No Celular:** Usamos o `Expo SecureStore` para criptografar tokens e dados do perfil.
*   **No Servidor:** O banco de dados (MongoDB) já salva os arquivos criptografados por padrão.
*   **Limpeza de Dados:** Em logs ou telas de suporte, escondemos dados sensíveis como CPF ou e-mail (ex: 123.***.***-90).

---

## Item 3: Regras da LGPD
O projeto segue a Lei Geral de Proteção de Dados:
*   **Termos:** Temos uma tela de Termos de Uso logo no início.
*   **Aceite:** O usuário clica que concorda com o uso dos dados para as licitações.
*   **Excluir conta:** Se o usuário quiser, ele pode apagar a conta e todos os seus dados pessoais somem do sistema.

---

## Item 4: Proteção contra Ataques
Para o sistema não cair e nem ser invadido:
*   **Limites:** O servidor bloqueia quem tenta fazer login muitas vezes seguidas (ataque de força bruta).
*   **Conexão Segura:** Só usamos HTTPS para ninguém conseguir "escutar" a conversa entre o app e o servidor.
*   **Filtro:** Validamos tudo que o usuário digita para evitar códigos maliciosos no banco de dados.

---

## Item 5: Backup e Continuidade
Se acontecer algum problema grave:
*   **Cópia de segurança:** O sistema faz backup automático todo dia e guarda por 30 dias.
*   **Sempre online:** Usamos servidores em nuvem que garantem que o app continue funcionando mesmo se um servidor falhar.

---

## Item 6: Gestão de Fornecedores
Cuidado com quem contratamos:
*   **Parceiros:** Só usamos serviços confiáveis como AWS, MongoDB e bibliotecas bem conhecidas (Expo, React).
*   **Atualização:** Toda semana verificamos se as bibliotecas do projeto precisam de atualização para corrigir falhas de segurança.
