import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { Bell, Info, AlertCircle } from 'lucide-react-native';

const ALERTS = [
  { id: '1', type: 'warning', title: 'Prazo Vencendo', message: 'Faltam 24h para o envio de propostas para o Edital 042/2026.', time: 'há 1h' },
  { id: '2', type: 'info', title: 'Novo Edital', message: 'Um novo edital para Serviços de Limpeza em Recife foi publicado.', time: 'há 3h' },
  { id: '3', type: 'update', title: 'Documento Expirado', message: 'Sua certidão de regularidade do FGTS expira em 2 dias.', time: 'ontem' },
];

export default function AlertsScreen() {
  const renderItem = ({ item }) => (
    <View style={styles.alertCard}>
      <View style={[styles.iconContainer, item.type === 'warning' ? styles.bgWarning : styles.bgInfo]}>
        {item.type === 'warning' ? <AlertCircle size={20} color="#991b1b" /> : <Info size={20} color="#1e40af" />}
      </View>
      <View style={styles.alertContent}>
        <View style={styles.alertHeader}>
          <Text style={styles.alertTitle}>{item.title}</Text>
          <Text style={styles.alertTime}>{item.time}</Text>
        </View>
        <Text style={styles.alertMessage}>{item.message}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={ALERTS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Bell size={48} color="#cbd5e1" />
            <Text style={styles.emptyText}>Nenhuma notificação no momento</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  listContent: {
    padding: 16,
  },
  alertCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  bgWarning: { backgroundColor: '#fee2e2' },
  bgInfo: { backgroundColor: '#dbeafe' },
  alertContent: {
    flex: 1,
  },
  alertHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  alertTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  alertTime: {
    fontSize: 12,
    color: '#94a3b8',
  },
  alertMessage: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 20,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  emptyText: {
    color: '#94a3b8',
    marginTop: 16,
    fontSize: 16,
  },
});
