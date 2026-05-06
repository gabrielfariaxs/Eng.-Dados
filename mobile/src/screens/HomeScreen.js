import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { Search, Filter, MapPin } from 'lucide-react-native';

const MOCK_EDITAIS = [
  { id: '1', title: 'Manutenção de Ar Condicionado - Prefeitura Recife', value: 'R$ 45.000,00', region: 'Recife - PE', status: 'Aberto' },
  { id: '2', title: 'Fornecimento de Marmitas - SEMAS', value: 'R$ 12.500,00', region: 'Olinda - PE', status: 'Aberto' },
  { id: '3', title: 'Serviços de Pintura - Escola Municipal', value: 'R$ 8.200,00', region: 'Recife - PE', status: 'Aberto' },
  { id: '4', title: 'Consultoria de TI - Câmara Municipal', value: 'R$ 60.000,00', region: 'Jaboatão - PE', status: 'Aberto' },
];

export default function HomeScreen({ navigation }) {
  const [search, setSearch] = useState('');

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => navigation.navigate('BidDetails', { bid: item })}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      
      <View style={styles.cardFooter}>
        <View style={styles.infoItem}>
          <MapPin size={14} color="#64748b" />
          <Text style={styles.infoText}>{item.region}</Text>
        </View>
        <Text style={styles.valueText}>{item.value}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.searchContainer}>
          <View style={styles.searchInputWrapper}>
            <Search size={20} color="#94a3b8" />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar editais (ex: manutenção, limpeza...)"
              value={search}
              onChangeText={setSearch}
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Oportunidades Recomendadas</Text>

        <FlatList
          data={MOCK_EDITAIS}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  searchInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 48,
    marginLeft: 8,
    fontSize: 14,
    color: '#1e293b',
  },
  filterButton: {
    backgroundColor: '#2563eb',
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 16,
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  cardTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginRight: 8,
  },
  statusBadge: {
    backgroundColor: '#dcfce7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    color: '#166534',
    fontSize: 12,
    fontWeight: 'bold',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 13,
    color: '#64748b',
    marginLeft: 4,
  },
  valueText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2563eb',
  },
});
