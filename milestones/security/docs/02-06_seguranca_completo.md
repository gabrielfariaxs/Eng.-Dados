# 🛡️ Documentação de Segurança: Requisitos 2 a 6

Este conjunto de documentos complementa a entrega de segurança do Projeto Integrador MEI.

---

## Requisito 2: Gerenciamento de Dados em Repouso e Anonimização
**Data:** 14 de Maio de 2026

### 1. Dados em Repouso
Para proteger os dados armazenados localmente no dispositivo e nos servidores, implementamos:
*   **Criptografia Local:** Todos os dados sensíveis (tokens, perfil do MEI) são salvos via `Expo SecureStore`, que utiliza AES-256-GCM.
*   **Criptografia em Nuvem:** O banco de dados (MongoDB Atlas) utiliza *Encryption at Rest* por padrão (AES-256).

### 2. Anonimização e Pseudoanonimização
*   **Logs:** Informações de Identificação Pessoal (PII) como CPF ou senhas são mascaradas em todos os logs de depuração (ex: `***-***-**`).
*   **Analytics:** Dados de uso do app são agregados e anonimizados antes de serem enviados para ferramentas de análise, garantindo que o comportamento de um usuário individual não seja rastreável.

---

## Requisito 3: Atendimento a Requisitos de LGPD
**Data:** 21 de Maio de 2026

O projeto adere à Lei Geral de Proteção de Dados (Lei nº 13.709/2018):
*   **Transparência:** Tela de "Termos de Uso e Privacidade" acessível no onboarding.
*   **Consentimento:** O usuário deve aceitar explicitamente o tratamento de dados para fins de participação em licitações.
*   **Direito de Exclusão:** Implementação da funcionalidade "Excluir minha conta", que remove permanentemente os dados PII do banco de dados principal (Direito ao Esquecimento).

---

## Requisito 4: Disponibilidade e Proteção contra Ataques Digitais
**Data:** 28 de Maio de 2026

Estratégias para manter o sistema online e seguro:
*   **Rate Limiting:** Proteção contra ataques de Força Bruta e DoS no backend, limitando o número de requisições por IP.
*   **HTTPS Only:** Toda a comunicação entre o app e a API é realizada via TLS 1.2+, impedindo ataques de *Man-in-the-Middle*.
*   **Sanitização:** Validação rigorosa de inputs no mobile e backend para prevenir Injeção de SQL e Cross-Site Scripting (XSS).

---

## Requisito 5: Backup e Continuidade de Operação
**Data:** 04 de Junho de 2026

Plano de resiliência:
*   **Backups Automatizados:** Snapshots diários do banco de dados com retenção de 30 dias.
*   **Alta Disponibilidade:** Deploy em clusters multi-região (Nuvem), garantindo que se um servidor falhar, outro assume automaticamente.
*   **RTO/RPO:** Definição de tempo de recuperação de até 4 horas em caso de desastre crítico.

---

## Requisito 6: Gestão de Fornecedores
**Data:** 11 de Junho de 2026

Critérios de segurança para parceiros:
*   **Avaliação de Terceiros:** Apenas utilizamos bibliotecas e serviços (ex: Expo, MongoDB, AWS) que possuam certificações de segurança (ISO 27001 ou SOC2).
*   **Análise de Vulnerabilidades:** Uso de ferramentas como `npm audit` e Dependabot para identificar e corrigir falhas em dependências de terceiros semanalmente.
