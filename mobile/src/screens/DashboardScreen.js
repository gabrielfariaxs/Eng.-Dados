import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { TrendingUp, FileText, Bell, AlertTriangle } from 'lucide-react-native';

const DESTAQUES = [
  { 
    id: '1', 
    code: 'PE 042/2026', 
    title: 'Aquisição de Uniformes Escolares', 
    orgao: 'Secretaria Municipal de Educação', 
    region: 'São Paulo/SP', 
    value: 'R$ 45.000,00', 
    date: '04/06/2026', 
    exclusive: true 
  },
  { 
    id: '2', 
    code: 'CP 018/2026', 
    title: 'Contratação de Serviços de Manutenção Predial', 
    orgao: 'Prefeitura Municipal de Campinas', 
    region: 'Campinas/SP', 
    value: 'R$ 72.000,00', 
    date: '09/06/2026', 
    exclusive: false 
  },
  { 
    id: '3', 
    code: 'PE 089/2026', 
    title: 'Fornecimento de Material de Limpeza', 
    orgao: 'Hospital Municipal de Santos', 
    region: 'Santos/SP', 
    value: 'R$ 38.500,00', 
    date: '01/06/2026', 
    exclusive: true 
  },
];

export default function DashboardScreen({ navigation }) {
  const handleBidPress = (bid) => {
    // Navega para a aba 'Editais' e abre a tela de detalhes 'BidDetails'
    navigation.navigate('Editais', {
      screen: 'BidDetails',
      params: { bid }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Título da Tela */}
        <View style={styles.headerSection}>
          <Text style={styles.screenTitle}>Painel de Controle</Text>
          <Text style={styles.screenSubtitle}>Visão geral das suas oportunidades e documentação</Text>
        </View>

        {/* Grade de Estatísticas */}
        <View style={styles.statsGrid}>
          <View style={styles.statsRow}>
            {/* Card 1: Editais Abertos */}
            <View style={styles.statCard}>
              <View style={styles.statInfo}>
                <Text style={styles.statValue}>4</Text>
                <Text style={styles.statCardLabel}>Editais Abertos</Text>
                <Text style={styles.statSubLabel}>3 exclusivos MEI</Text>
              </View>
              <View style={[styles.iconCircle, { backgroundColor: '#eff6ff' }]}>
                <TrendingUp size={18} color="#2563eb" />
              </View>
            </View>

            {/* Card 2: Prontidão */}
            <View style={styles.statCard}>
              <View style={styles.statInfo}>
                <Text style={styles.statValue}>80%</Text>
                <Text style={styles.statCardLabel}>Prontidão</Text>
                <Text style={styles.statSubLabel}>Documentos regulares</Text>
              </View>
              <View style={[styles.iconCircle, { backgroundColor: '#f0fdf4' }]}>
                <FileText size={18} color="#10b981" />
              </View>
            </View>
          </View>

          <View style={styles.statsRow}>
            {/* Card 3: Alertas Pendentes */}
            <View style={styles.statCard}>
              <View style={styles.statInfo}>
                <Text style={styles.statValue}>3</Text>
                <Text style={styles.statCardLabel}>Alertas Pendentes</Text>
                <Text style={styles.statSubLabel}>Requerem atenção</Text>
              </View>
              <View style={[styles.iconCircle, { backgroundColor: '#fef9c3' }]}>
                <Bell size={18} color="#f59e0b" />
              </View>
            </View>

            {/* Card 4: Documentos Vencidos */}
            <View style={styles.statCard}>
              <View style={styles.statInfo}>
                <Text style={styles.statValue}>1</Text>
                <Text style={styles.statCardLabel}>Docs Vencidos</Text>
                <Text style={styles.statSubLabel}>Renovação urgente</Text>
              </View>
              <View style={[styles.iconCircle, { backgroundColor: '#fee2e2' }]}>
                <AlertTriangle size={18} color="#ef4444" />
              </View>
            </View>
          </View>
        </View>

        {/* Card: Prontidão para Licitações */}
        <View style={styles.progressSectionCard}>
          <Text style={styles.sectionTitleInsideCard}>Prontidão para Licitações</Text>
          <View style={styles.progressBarInfo}>
            <Text style={styles.progressBarLabel}>Documentação Completa</Text>
            <Text style={styles.progressBarPercent}>80%</Text>
          </View>
          <View style={styles.progressBarTrack}>
            <View style={[styles.progressBarFill, { width: '80%' }]} />
          </View>
          <View style={styles.progressLegend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#10b981' }]} />
              <Text style={styles.legendText}>4 Regular</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#ef4444' }]} />
              <Text style={styles.legendText}>1 Vencido</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#94a3b8' }]} />
              <Text style={styles.legendText}>0 Pendente</Text>
            </View>
          </View>
        </View>

        {/* Seção: Oportunidades em Destaque */}
        <View style={styles.bidsHeaderRow}>
          <Text style={styles.sectionTitle}>Oportunidades em Destaque</Text>
        </View>

        {DESTAQUES.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.bidCard}
            onPress={() => handleBidPress(item)}
          >
            <View style={styles.bidCardTopRow}>
              <View style={styles.bidCodeContainer}>
                <Text style={styles.bidCode}>{item.code}</Text>
                {item.exclusive && (
                  <View style={styles.exclusiveBadge}>
                    <Text style={styles.exclusiveBadgeText}>Exclusivo MEI</Text>
                  </View>
                )}
              </View>
              <Text style={styles.bidValue}>{item.value}</Text>
            </View>

            <Text style={styles.bidTitle}>{item.title}</Text>

            <View style={styles.bidCardBottomRow}>
              <Text style={styles.bidOrgao}>
                {item.orgao} <Text style={styles.grayDot}>•</Text> {item.region}
              </Text>
              <Text style={styles.bidDate}>Até {item.date}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    padding: 16,
    paddingBottom: 24,
  },
  headerSection: {
    marginBottom: 20,
  },
  screenTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  screenSubtitle: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 4,
  },
  statsGrid: {
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  statCard: {
    flex: 0.485,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  statInfo: {
    flex: 1,
    marginRight: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  statCardLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
    marginTop: 4,
  },
  statSubLabel: {
    fontSize: 10,
    color: '#64748b',
    marginTop: 2,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressSectionCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  sectionTitleInsideCard: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 16,
  },
  progressBarInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressBarLabel: {
    fontSize: 12,
    color: '#475569',
  },
  progressBarPercent: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  progressBarTrack: {
    height: 6,
    backgroundColor: '#e2e8f0',
    borderRadius: 3,
    width: '100%',
    overflow: 'hidden',
    marginBottom: 16,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#1e293b',
    borderRadius: 3,
  },
  progressLegend: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  legendText: {
    fontSize: 11,
    color: '#475569',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 12,
  },
  bidsHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bidCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  bidCardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  bidCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bidCode: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  exclusiveBadge: {
    backgroundColor: '#2563eb',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 8,
  },
  exclusiveBadgeText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: 'bold',
  },
  bidValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2563eb',
  },
  bidTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 10,
  },
  bidCardBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bidOrgao: {
    fontSize: 11,
    color: '#64748b',
    flex: 1,
    marginRight: 8,
  },
  grayDot: {
    color: '#94a3b8',
  },
  bidDate: {
    fontSize: 11,
    color: '#64748b',
  },
});
