import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { PieChart, TrendingUp, Award, Clock } from 'lucide-react-native';

export default function DashboardScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.summaryGrid}>
          <View style={[styles.statCard, { backgroundColor: '#eff6ff' }]}>
            <Award size={24} color="#2563eb" />
            <Text style={styles.statValue}>03</Text>
            <Text style={styles.statLabel}>Vencidas</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#f0fdf4' }]}>
            <TrendingUp size={24} color="#166534" />
            <Text style={styles.statValue}>08</Text>
            <Text style={styles.statLabel}>Em Aberto</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Desempenho Geral</Text>
          <View style={styles.chartPlaceholder}>
            <Text style={styles.placeholderText}>[ Gráfico de Participações ]</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Histórico Recente</Text>
          <View style={styles.historyItem}>
            <Clock size={16} color="#64748b" />
            <View style={styles.historyInfo}>
              <Text style={styles.historyTitle}>Manutenção Escolar - Recife</Text>
              <Text style={styles.historyStatus}>Aguardando Homologação</Text>
            </View>
          </View>
          <View style={styles.historyItem}>
            <Clock size={16} color="#64748b" />
            <View style={styles.historyInfo}>
              <Text style={styles.historyTitle}>Alimentação Creche - Olinda</Text>
              <Text style={styles.historyStatus}>Documentação em Análise</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 16,
  },
  summaryGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    flex: 0.48,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 16,
  },
  chartPlaceholder: {
    height: 180,
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    color: '#94a3b8',
    fontSize: 14,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  historyInfo: {
    marginLeft: 12,
  },
  historyTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
  },
  historyStatus: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
});
