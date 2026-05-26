import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { Bell, Clock, FileText, Trophy, Trash2, Check } from 'lucide-react-native';

const INITIAL_ALERTS = [
  {
    id: '1',
    category: 'prazo',
    isNew: true,
    time: 'Ontem',
    title: 'Prazo de envio próximo!',
    message: 'Faltam 3 dias para o envio da proposta do edital PE 089/2026 - Fornecimento de Material de Limpeza',
    bid: { 
      id: '3', 
      code: 'PE 089/2026', 
      title: 'Fornecimento de Material de Limpeza', 
      orgao: 'Hospital Municipal de Santos', 
      region: 'Santos/SP', 
      value: 'R$ 38.500,00', 
      date: '01/06/2026', 
      exclusive: true 
    }
  },
  {
    id: '2',
    category: 'documento',
    isNew: true,
    time: '24/05/2026',
    title: 'Documento vencido',
    message: 'Sua Certidão Negativa de Débitos Municipais está vencida. Renove o quanto antes para participar de licitações.',
    bid: null
  },
  {
    id: '3',
    category: 'publicacao',
    isNew: false,
    time: '24/05/2026',
    title: 'Novo edital disponível',
    message: 'Novo edital publicado: PE 156/2026 - Contratação de Serviços de Jardinagem (Exclusivo MEI)',
    bid: { 
      id: '4', 
      code: 'PE 156/2026', 
      title: 'Contratação de Serviços de Jardinagem', 
      orgao: 'Tribunal Regional Federal', 
      region: 'São Paulo/SP', 
      value: 'R$ 54.000,00', 
      date: '12/06/2026', 
      exclusive: true 
    }
  },
  {
    id: '4',
    category: 'prazo',
    isNew: true,
    time: 'Ontem',
    title: 'Prazo crítico!',
    message: 'Últimas 24h para envio da proposta do edital TP 031/2026',
    bid: { 
      id: '5', 
      code: 'TP 031/2026', 
      title: 'Reforma de Quadra Poliesportiva', 
      orgao: 'Secretaria de Esportes', 
      region: 'Guarulhos/SP', 
      value: 'R$ 115.000,00', 
      date: '15/06/2026', 
      exclusive: false 
    }
  },
  {
    id: '5',
    category: 'publicacao',
    isNew: false,
    time: '19/05/2026',
    title: 'Novo edital disponível',
    message: 'Novo edital publicado: PE 042/2026 - Aquisição de Uniformes Escolares (Exclusivo MEI)',
    bid: { 
      id: '1', 
      code: 'PE 042/2026', 
      title: 'Aquisição de Uniformes Escolares', 
      orgao: 'Secretaria Municipal de Educação', 
      region: 'São Paulo/SP', 
      value: 'R$ 45.000,00', 
      date: '04/06/2026', 
      exclusive: true 
    }
  },
];

export default function AlertsScreen({ navigation }) {
  const [alerts, setAlerts] = useState(INITIAL_ALERTS);

  const handleMarkAsRead = (id) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, isNew: false } : a));
    Alert.alert('Alerta', 'Notificação marcada como lida.');
  };

  const handleMarkAllAsRead = () => {
    setAlerts(prev => prev.map(a => ({ ...a, isNew: false })));
    Alert.alert('Alerta', 'Todas as notificações foram marcadas como lidas.');
  };

  const handleDelete = (id) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
  };

  const handleViewEdital = (bid) => {
    if (bid) {
      navigation.navigate('Editais', {
        screen: 'BidDetails',
        params: { bid }
      });
    }
  };

  const countNew = alerts.filter(a => a.isNew).length;
  const countPrazos = alerts.filter(a => a.category === 'prazo').length;
  const countPublicacoes = alerts.filter(a => a.category === 'publicacao').length;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Cabeçalho */}
        <View style={styles.headerSection}>
          <View style={styles.headerTitleRow}>
            <View>
              <Text style={styles.screenTitle}>Alertas e Notificações</Text>
              <Text style={styles.screenSubtitle}>Acompanhe prazos, publicações e atualizações importantes</Text>
            </View>
            <TouchableOpacity style={styles.markAllButton} onPress={handleMarkAllAsRead}>
              <Check size={14} color="#475569" style={{ marginRight: 4 }} />
              <Text style={styles.markAllText}>Marcar todos</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Resumo da Notificações */}
        <View style={styles.statsRow}>
          <View style={styles.statBlock}>
            <View style={[styles.iconCircle, { backgroundColor: '#fee2e2' }]}>
              <Bell size={14} color="#ef4444" />
            </View>
            <Text style={styles.statLabel}>Não Lidos</Text>
            <Text style={styles.statValue}>{countNew}</Text>
          </View>

          <View style={styles.statBlock}>
            <View style={[styles.iconCircle, { backgroundColor: '#fef9c3' }]}>
              <Clock size={14} color="#f59e0b" />
            </View>
            <Text style={styles.statLabel}>Prazos</Text>
            <Text style={styles.statValue}>{countPrazos}</Text>
          </View>

          <View style={styles.statBlock}>
            <View style={[styles.iconCircle, { backgroundColor: '#eff6ff' }]}>
              <FileText size={14} color="#2563eb" />
            </View>
            <Text style={styles.statLabel}>Publicações</Text>
            <Text style={styles.statValue}>{countPublicacoes}</Text>
          </View>

          <View style={styles.statBlock}>
            <View style={[styles.iconCircle, { backgroundColor: '#f0fdf4' }]}>
              <Trophy size={14} color="#10b981" />
            </View>
            <Text style={styles.statLabel}>Resultados</Text>
            <Text style={styles.statValue}>0</Text>
          </View>
        </View>

        {/* Feed de Alertas */}
        {alerts.length === 0 ? (
          <View style={styles.emptyState}>
            <Bell size={48} color="#cbd5e1" />
            <Text style={styles.emptyText}>Nenhuma notificação no momento</Text>
          </View>
        ) : (
          alerts.map((item) => {
            let catColor = '#64748b';
            let catBg = '#f1f5f9';
            let catLabel = 'Alerta';

            if (item.category === 'prazo') {
              catColor = '#ea580c';
              catBg = '#ffedd5';
              catLabel = 'Prazo';
            } else if (item.category === 'documento') {
              catColor = '#ef4444';
              catBg = '#fee2e2';
              catLabel = 'Documento';
            } else if (item.category === 'publicacao') {
              catColor = '#2563eb';
              catBg = '#eff6ff';
              catLabel = 'Publicação';
            }

            return (
              <View key={item.id} style={styles.alertCard}>
                <View style={styles.cardHeader}>
                  <View style={styles.badgesCol}>
                    <View style={[styles.catBadge, { backgroundColor: catBg }]}>
                      <Text style={[styles.catBadgeText, { color: catColor }]}>{catLabel}</Text>
                    </View>
                    {item.isNew && (
                      <View style={styles.newBadge}>
                        <Text style={styles.newBadgeText}>Novo</Text>
                      </View>
                    )}
                    <Text style={styles.alertTime}>{item.time}</Text>
                  </View>
                  <TouchableOpacity onPress={() => handleDelete(item.id)}>
                    <Trash2 size={16} color="#94a3b8" />
                  </TouchableOpacity>
                </View>

                <Text style={styles.alertTitle}>{item.title}</Text>
                <Text style={styles.alertMessage}>{item.message}</Text>

                {/* Botões de Ações rápidas */}
                <View style={styles.alertActions}>
                  {item.isNew && (
                    <TouchableOpacity 
                      style={[styles.actionBtn, styles.btnOutline]}
                      onPress={() => handleMarkAsRead(item.id)}
                    >
                      <Check size={12} color="#475569" style={{ marginRight: 4 }} />
                      <Text style={styles.btnOutlineText}>Marcar como lido</Text>
                    </TouchableOpacity>
                  )}
                  {item.bid && (
                    <TouchableOpacity 
                      style={[styles.actionBtn, styles.btnOutline]}
                      onPress={() => handleViewEdital(item.bid)}
                    >
                      <Text style={styles.btnOutlineText}>Ver Edital</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            );
          })
        )}

        {/* Card de Configurações de Alertas */}
        <View style={styles.settingsCard}>
          <Text style={styles.settingsTitle}>Configurações de Alertas</Text>
          <View style={styles.settingsContent}>
            <Text style={styles.settingsText}>
              <Text style={{ fontWeight: 'bold', color: '#1e40af' }}>Prazos:</Text> Você receberá alertas 7 dias, 3 dias e 1 dia antes do vencimento de prazos de editais.
            </Text>
            <Text style={styles.settingsText}>
              <Text style={{ fontWeight: 'bold', color: '#1e40af' }}>Publicações:</Text> Notificações sempre que novos editais compatíveis com seu CNAE forem publicados.
            </Text>
            <Text style={styles.settingsText}>
              <Text style={{ fontWeight: 'bold', color: '#1e40af' }}>Documentos:</Text> Alertas quando seus documentos estiverem próximos do vencimento (30 dias antes).
            </Text>
          </View>
        </View>
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
  headerTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  screenTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1e293b',
    flex: 1,
  },
  screenSubtitle: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 4,
  },
  markAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 5,
    backgroundColor: '#fff',
  },
  markAllText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#475569',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statBlock: {
    flex: 0.235,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 2,
    elevation: 1,
  },
  iconCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  statLabel: {
    fontSize: 9,
    color: '#64748b',
    fontWeight: '500',
  },
  statValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1e293b',
    marginTop: 2,
  },
  alertCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  badgesCol: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  catBadge: {
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 6,
  },
  catBadgeText: {
    fontSize: 9,
    fontWeight: 'bold',
  },
  newBadge: {
    backgroundColor: '#eff6ff',
    borderColor: '#dbeafe',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 1,
    marginRight: 8,
  },
  newBadgeText: {
    color: '#2563eb',
    fontSize: 9,
    fontWeight: 'bold',
  },
  alertTime: {
    fontSize: 11,
    color: '#94a3b8',
  },
  alertTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 6,
  },
  alertMessage: {
    fontSize: 12,
    color: '#475569',
    lineHeight: 18,
    marginBottom: 12,
  },
  alertActions: {
    flexDirection: 'row',
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 28,
    borderRadius: 6,
    paddingHorizontal: 10,
    marginRight: 8,
  },
  btnOutline: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#cbd5e1',
  },
  btnOutlineText: {
    color: '#475569',
    fontSize: 11,
    fontWeight: '600',
  },
  settingsCard: {
    backgroundColor: '#eff6ff',
    borderColor: '#dbeafe',
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginTop: 12,
  },
  settingsTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 12,
  },
  settingsContent: {
    marginTop: 4,
  },
  settingsText: {
    fontSize: 11,
    color: '#1e40af',
    lineHeight: 16,
    marginBottom: 8,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    color: '#94a3b8',
    marginTop: 12,
    fontSize: 14,
  },
});
