# Requisito 1: Gestão de Autenticação de Usuários e Gestão de Senhas

**Projeto:** MEI - Plataforma de Licitações Públicas  
**Data:** 07 de Maio de 2026

## 1. Introdução
Este documento descreve as políticas e mecanismos técnicos implementados para garantir a identidade dos usuários e a integridade das suas credenciais de acesso na plataforma MEI.

## 2. Política de Senhas
Para garantir a robustez das contas, foi estabelecida a seguinte política de complexidade de senhas:
*   Mínimo de 8 caracteres.
*   Obrigatório o uso de letras maiúsculas e minúsculas.
*   Inclusão de pelo menos um número.
*   Inclusão de pelo menos um caractere especial (ex: !, @, #, $, %).

## 3. Mecanismos de Proteção
### 3.1. Hashing de Senhas (Backend)
As senhas nunca são armazenadas em texto claro. Utilizamos o algoritmo **Argon2** ou **BCrypt** com um fator de custo adequado para proteger contra ataques de dicionário e brute-force. Cada senha possui um *Salt* único gerado aleatoriamente.

### 3.2. Armazenamento Seguro (Frontend Mobile)
No aplicativo mobile, as credenciais e tokens de sessão (JWT) são armazenados utilizando o **Expo SecureStore** (iOS: Keychain; Android: SharedPreferences criptografadas com AES-256-GCM).

### 3.3. Gestão de Sessão
*   Utilização de **JSON Web Tokens (JWT)** para autenticação stateless.
*   Tokens com tempo de expiração curto (1 hora) e utilização de *Refresh Tokens*.
*   Mecanismo de "Logout" que invalida o token localmente e no servidor.

## 4. Recuperação de Acesso
O processo de recuperação de senha é realizado através de:
1.  Solicitação via e-mail verificado.
2.  Envio de um token temporário de uso único (OTP).
3.  Exigência de nova senha que atenda à política de complexidade.

---
**Responsável:** [Seu Nome]
