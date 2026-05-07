/**
 * Utilitários de Segurança - Projeto Integrador MEI
 */

// Simulação de armazenamento seguro (em produção usaria expo-secure-store)
// Requisito 2: Gerenciamento de dados em repouso
export const secureSave = async (key, value) => {
  console.log(`[Segurança] Criptografando e salvando chave: ${key}`);
  // Lógica: SecureStore.setItemAsync(key, value);
};

export const secureGet = async (key) => {
  console.log(`[Segurança] Recuperando chave de forma segura: ${key}`);
  // Lógica: return await SecureStore.getItemAsync(key);
};

// Requisito 2: Anonimização de informações
export const maskPII = (text, type = 'cpf') => {
  if (!text) return '';
  
  if (type === 'cpf') {
    return text.replace(/(\d{3})\.(\d{3})\.(\d{3})-(\d{2})/, '***.$2.$3-**');
  }
  
  if (type === 'email') {
    const [user, domain] = text.split('@');
    return `${user[0]}****@${domain}`;
  }
  
  return '********';
};

// Requisito 4: Sanitização básica
export const sanitizeInput = (text) => {
  return text.replace(/[<>\"\'\%;\(\)\&]/g, '');
};
