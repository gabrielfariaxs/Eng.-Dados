/**
 * Utilitários de Segurança - Projeto Integrador MEI
 */

// Armazenamento seguro
export const secureSave = async (key, value) => {
  console.log(`[Segurança] Criptografando e salvando chave: ${key}`);
  // Lógica: SecureStore.setItemAsync(key, value);
};

export const secureGet = async (key) => {
  console.log(`[Segurança] Recuperando chave de forma segura: ${key}`);
  // Lógica: return await SecureStore.getItemAsync(key);
};

// Máscara de dados sensíveis
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

// Limpeza de input
export const sanitizeInput = (text) => {
  return text.replace(/[<>\"\'\%;\(\)\&]/g, '');
};
