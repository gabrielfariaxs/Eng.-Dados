import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { Upload, FileCheck, FileWarning, Clock, Plus } from 'lucide-react-native';

const DOCUMENTS = [
  { id: '1', name: 'CCMEI - Certificado de Condição de MEI', status: 'Regular', date: 'Atualizado em 10/04' },
  { id: '2', name: 'CND Trabalhista', status: 'Pendente', date: '-' },
  { id: '3', name: 'Regularidade FGTS', status: 'Vencendo', date: 'Expira em 02 dias' },
  { id: '4', name: 'RG / CPF do Titular', status: 'Regular', date: 'Atualizado em 15/03' },
];

export default function DocumentScreen() {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'Regular': return <FileCheck size={20} color="#166534" />;
      case 'Pendente': return <Clock size={20} color="#64748b" />;
      case 'Vencendo': return <FileWarning size={20} color="#991b1b" />;
      default: return null;
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Regular': return styles.statusRegular;
      case 'Pendente': return styles.statusPendente;
      case 'Vencendo': return styles.statusVencendo;
      default: return {};
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.docCard}>
      <View style={styles.docInfo}>
        <Text style={styles.docName}>{item.name}</Text>
        <Text style={styles.docDate}>{item.date}</Text>
      </View>
      <View style={[styles.statusContainer, getStatusStyle(item.status)]}>
        {getStatusIcon(item.status)}
        <Text style={[styles.statusText, { marginLeft: 4 }]}>{item.status}</Text>
      </View>
      <TouchableOpacity style={styles.uploadButton}>
        <Upload size={18} color="#2563eb" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Meus Documentos</Text>
        <Text style={styles.subtitle}>Gerencie sua documentação de habilitação</Text>
      </View>

      <FlatList
        data={DOCUMENTS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />

      <TouchableOpacity style={styles.fab}>
        <Plus size={24} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  listContent: {
    padding: 16,
  },
  docCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  docInfo: {
    flex: 1,
  },
  docName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  docDate: {
    fontSize: 12,
    color: '#94a3b8',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 12,
  },
  statusRegular: { backgroundColor: '#dcfce7' },
  statusPendente: { backgroundColor: '#f1f5f9' },
  statusVencendo: { backgroundColor: '#fee2e2' },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  uploadButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#eff6ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#2563eb',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
});
