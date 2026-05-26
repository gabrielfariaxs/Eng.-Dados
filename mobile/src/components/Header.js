import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { FileText, MessageSquare } from 'lucide-react-native';

export default function Header() {
  const handleOpenChatbot = () => {
    Linking.openURL('http://localhost:8501').catch(() => {
      // Caso ocorra falha ao abrir
      console.log('Não foi possível abrir o chatbot local');
    });
  };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.leftSection}>
        <View style={styles.logoBackground}>
          <FileText size={20} color="#fff" />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>LicitaMEI</Text>
          <Text style={styles.subtitle}>Licitações Públicas para Microempreendedores</Text>
        </View>
      </View>
      
      <View style={styles.rightSection}>
        <View style={styles.cnpjBadge}>
          <Text style={styles.cnpjText}>CNPJ: 12.345.678/0001-90</Text>
        </View>
        <TouchableOpacity 
          style={styles.chatButton}
          onPress={handleOpenChatbot}
          activeOpacity={0.8}
        >
          <MessageSquare size={14} color="#fff" style={{ marginRight: 4 }} />
          <Text style={styles.chatButtonText}>Chatbot IA</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 0.5,
  },
  logoBackground: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#2563eb',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  subtitle: {
    fontSize: 10,
    color: '#64748b',
    marginTop: 1,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cnpjBadge: {
    borderWidth: 1,
    borderColor: '#93c5fd',
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#eff6ff',
    marginRight: 8,
  },
  cnpjText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#2563eb',
  },
  chatButton: {
    flexDirection: 'row',
    backgroundColor: '#0f172a',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  chatButtonText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
