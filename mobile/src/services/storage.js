import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  DOCUMENTS: '@LicitaMEI:documents',
  CHECKLIST_PROGRESS: '@LicitaMEI:checklist',
  USER_PREFERENCES: '@LicitaMEI:preferences',
};

export const saveDocuments = async (docs) => {
  try {
    const jsonValue = JSON.stringify(docs);
    await AsyncStorage.setItem(STORAGE_KEYS.DOCUMENTS, jsonValue);
  } catch (e) {
    console.error('Erro ao salvar documentos', e);
  }
};

export const getDocuments = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEYS.DOCUMENTS);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('Erro ao buscar documentos', e);
    return null;
  }
};

export const saveChecklistProgress = async (bidId, progress) => {
  try {
    const current = await AsyncStorage.getItem(STORAGE_KEYS.CHECKLIST_PROGRESS);
    const data = current ? JSON.parse(current) : {};
    data[bidId] = progress;
    await AsyncStorage.setItem(STORAGE_KEYS.CHECKLIST_PROGRESS, JSON.stringify(data));
  } catch (e) {
    console.error('Erro ao salvar progresso do checklist', e);
  }
};
