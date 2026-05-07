# Requisito 1: Autenticação e Gestão de Senhas

**Projeto:** MEI - Licitações
**Data:** 07/05/2026

Neste documento detalhamos como o sistema lida com a segurança dos usuários e suas senhas.

## 1. Regras para Senhas
Para evitar contas fracas, o sistema exige:
*   Pelo menos 8 caracteres.
*   Letras maiúsculas e minúsculas.
*   Pelo menos um número.
*   Pelo menos um símbolo (ex: @, #, $).

## 2. Como os dados são protegidos
### 2.1. No Servidor (Backend)
As senhas não ficam salvas em texto comum. Usamos o algoritmo **BCrypt** para transformar a senha em um código seguro (hash) antes de salvar no banco de dados. Isso impede que alguém veja a senha original mesmo se acessar o banco.

### 2.2. No Aplicativo (Mobile)
Os tokens de login ficam guardados no **SecureStore** do celular. No iPhone isso usa o Keychain e no Android usa SharedPreferences com criptografia AES-256. É muito mais seguro que o armazenamento comum.

### 2.3. Sessão
Usamos tokens **JWT** para controlar quem está logado. Os tokens expiram em 1 hora para diminuir riscos caso o celular seja perdido.

## 3. Esqueci minha senha
Se o usuário perder o acesso:
1.  Ele pede a recuperação pelo e-mail.
2.  Recebe um código único para validar a identidade.
3.  Cria uma nova senha dentro das regras de segurança.

---
**Responsável:** [Seu Nome]
