import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { CheckCircle2, Circle, AlertTriangle, FileText, Calendar } from 'lucide-react-native';

const CHECKLIST_ITEMS = [
  { id: '1', label: 'Inscrição no Cadastro de Contribuintes (Municipal/Estadual)', required: true },
  { id: '2', label: 'Certidão Negativa de Débitos Trabalhistas (CNDT)', required: true },
  { id: '3', label: 'Certificado de Regularidade do FGTS (CRF)', required: true },
  { id: '4', label: 'Prova de Regularidade com a Fazenda Federal', required: true },
  { id: '5', label: 'Certificado de Condição de MEI (CCMEI)', required: true },
];

export default function BidDetailsScreen({ route }) {
  const { bid } = route.params;
  const [checkedItems, setCheckedItems] = useState({});

  const toggleItem = (id) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const progress = Object.values(checkedItems).filter(Boolean).length;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>{bid.title}</Text>
          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Calendar size={16} color="#64748b" />
              <Text style={styles.metaText}>Prazo: 15/05/2026</Text>
            </View>
            <View style={styles.metaItem}>
              <FileText size={16} color="#64748b" />
              <Text style={styles.metaText}>Processo: 042/2026</Text>
            </View>
          </View>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.cardTitle}>Resumo da Oportunidade</Text>
          <Text style={styles.description}>
            Contratação de empresa especializada para prestação de serviços continuados conforme edital. 
            Esta licitação possui tratamento diferenciado para MEIs conforme Lei 14.133/2021.
          </Text>
          <View style={styles.priceContainer}>
            <Text style={styles.priceLabel}>Valor Estimado:</Text>
            <Text style={styles.priceValue}>{bid.value}</Text>
          </View>
        </View>

        <View style={styles.checklistSection}>
          <View style={styles.checklistHeader}>
            <Text style={styles.sectionTitle}>Checklist de Habilitação</Text>
            <Text style={styles.progressText}>{progress}/{CHECKLIST_ITEMS.length}</Text>
          </View>
          
          <Text style={styles.checklistSubtitle}>
            Verifique se você possui todos os documentos necessários para esta concorrência:
          </Text>

          {CHECKLIST_ITEMS.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.checkItem}
              onPress={() => toggleItem(item.id)}
            >
              {checkedItems[item.id] ? (
                <CheckCircle2 size={24} color="#166534" />
              ) : (
                <Circle size={24} color="#cbd5e1" />
              )}
              <Text style={[styles.itemLabel, checkedItems[item.id] && styles.itemLabelChecked]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.eligibilityAlert}>
          <AlertTriangle size={20} color="#854d0e" />
          <Text style={styles.alertText}>
            Certifique-se de que seu CNAE é compatível com o objeto da licitação.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.mainButton}>
          <Text style={styles.mainButtonText}>Demonstrar Interesse</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 12,
  },
  metaRow: {
    flexDirection: 'row',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  metaText: {
    fontSize: 14,
    color: '#64748b',
    marginLeft: 6,
  },
  summaryCard: {
    backgroundColor: '#f1f5f9',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: '#475569',
    marginBottom: 16,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 12,
  },
  priceLabel: {
    fontSize: 14,
    color: '#64748b',
  },
  priceValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2563eb',
  },
  checklistSection: {
    marginBottom: 24,
  },
  checklistHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  progressText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2563eb',
  },
  checklistSubtitle: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 16,
  },
  checkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 8,
  },
  itemLabel: {
    flex: 1,
    fontSize: 14,
    color: '#1e293b',
    marginLeft: 12,
  },
  itemLabelChecked: {
    color: '#64748b',
    textDecorationLine: 'line-through',
  },
  eligibilityAlert: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef9c3',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#fef08a',
  },
  alertText: {
    flex: 1,
    fontSize: 13,
    color: '#854d0e',
    marginLeft: 8,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  mainButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  mainButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
