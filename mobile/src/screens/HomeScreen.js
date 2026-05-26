import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Search, Filter, X } from 'lucide-react-native';

const MOCK_EDITAIS = [
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
  { 
    id: '4', 
    code: 'PE 156/2026', 
    title: 'Contratação de Serviços de Jardinagem', 
    orgao: 'Tribunal Regional Federal', 
    region: 'São Paulo/SP', 
    value: 'R$ 54.000,00', 
    date: '12/06/2026', 
    exclusive: true 
  },
  { 
    id: '5', 
    code: 'TP 031/2026', 
    title: 'Reforma de Quadra Poliesportiva', 
    orgao: 'Secretaria de Esportes', 
    region: 'Guarulhos/SP', 
    value: 'R$ 115.000,00', 
    date: '15/06/2026', 
    exclusive: false 
  },
];

export default function HomeScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filterMeiOnly, setFilterMeiOnly] = useState(false);
  const [valueFilter, setValueFilter] = useState('todos'); // 'todos', 'ate50', 'acima50'
  const [regionFilter, setRegionFilter] = useState('todos'); // 'todos', 'sp', 'campinas'

  // Limpa todos os filtros ativos
  const handleClearFilters = () => {
    setFilterMeiOnly(false);
    setValueFilter('todos');
    setRegionFilter('todos');
    setSearch('');
  };

  const filteredBids = MOCK_EDITAIS.filter(bid => {
    // Busca por texto
    const matchesSearch = 
      bid.title.toLowerCase().includes(search.toLowerCase()) ||
      bid.code.toLowerCase().includes(search.toLowerCase()) ||
      bid.orgao.toLowerCase().includes(search.toLowerCase()) ||
      bid.region.toLowerCase().includes(search.toLowerCase());

    // Filtro Exclusivo MEI
    const matchesMei = !filterMeiOnly || bid.exclusive;

    // Filtro de Valor
    const valorNumerico = parseFloat(bid.value.replace('R$ ', '').replace('.', '').replace(',', '.'));
    let matchesValue = true;
    if (valueFilter === 'ate50') {
      matchesValue = valorNumerico <= 50000;
    } else if (valueFilter === 'acima50') {
      matchesValue = valorNumerico > 50000;
    }

    // Filtro de Região
    let matchesRegion = true;
    if (regionFilter === 'sp') {
      matchesRegion = bid.region.includes('São Paulo') || bid.region.includes('Guarulhos');
    } else if (regionFilter === 'campinas') {
      matchesRegion = bid.region.includes('Campinas') || bid.region.includes('Santos');
    }

    return matchesSearch && matchesMei && matchesValue && matchesRegion;
  });

  const hasActiveFilters = filterMeiOnly || valueFilter !== 'todos' || regionFilter !== 'todos';

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.bidCard}
      onPress={() => navigation.navigate('BidDetails', { bid: item })}
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
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Título da Seção */}
        <View style={styles.headerSection}>
          <Text style={styles.screenTitle}>Buscar Editais</Text>
          <Text style={styles.screenSubtitle}>Encontre licitações públicas disponíveis para o seu MEI</Text>
        </View>

        {/* Barra de Busca e Filtro */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputWrapper}>
            <Search size={18} color="#94a3b8" />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar por objeto, órgão, estado..."
              placeholderTextColor="#94a3b8"
              value={search}
              onChangeText={setSearch}
            />
          </View>
          <TouchableOpacity 
            style={[styles.filterButton, showFilters && styles.filterButtonActive]}
            onPress={() => setShowFilters(!showFilters)}
          >
            <Filter size={18} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Painel de Filtros Expansível */}
        {showFilters && (
          <View style={styles.filterPanel}>
            <View style={styles.filterPanelHeader}>
              <Text style={styles.filterPanelTitle}>Filtros Avançados</Text>
              {hasActiveFilters && (
                <TouchableOpacity onPress={handleClearFilters} style={styles.clearBtn}>
                  <Text style={styles.clearBtnText}>Limpar Tudo</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Filtro 1: Tratamento Diferenciado */}
            <Text style={styles.filterLabel}>Foco do Edital</Text>
            <View style={styles.pillsRow}>
              <TouchableOpacity 
                style={[styles.pill, !filterMeiOnly && styles.pillActive]} 
                onPress={() => setFilterMeiOnly(false)}
              >
                <Text style={[styles.pillText, !filterMeiOnly && styles.pillTextActive]}>Todos</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.pill, filterMeiOnly && styles.pillActive]} 
                onPress={() => setFilterMeiOnly(true)}
              >
                <Text style={[styles.pillText, filterMeiOnly && styles.pillTextActive]}>Exclusivo MEI</Text>
              </TouchableOpacity>
            </View>

            {/* Filtro 2: Valor Estimado */}
            <Text style={styles.filterLabel}>Valor Estimado</Text>
            <View style={styles.pillsRow}>
              <TouchableOpacity 
                style={[styles.pill, valueFilter === 'todos' && styles.pillActive]} 
                onPress={() => setValueFilter('todos')}
              >
                <Text style={[styles.pillText, valueFilter === 'todos' && styles.pillTextActive]}>Qualquer valor</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.pill, valueFilter === 'ate50' && styles.pillActive]} 
                onPress={() => setValueFilter('ate50')}
              >
                <Text style={[styles.pillText, valueFilter === 'ate50' && styles.pillTextActive]}>Até R$ 50k</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.pill, valueFilter === 'acima50' && styles.pillActive]} 
                onPress={() => setValueFilter('acima50')}
              >
                <Text style={[styles.pillText, valueFilter === 'acima50' && styles.pillTextActive]}>Acima de R$ 50k</Text>
              </TouchableOpacity>
            </View>

            {/* Filtro 3: Região / Região do Estado */}
            <Text style={styles.filterLabel}>Região (Estado/Cidade)</Text>
            <View style={styles.pillsRow}>
              <TouchableOpacity 
                style={[styles.pill, regionFilter === 'todos' && styles.pillActive]} 
                onPress={() => setRegionFilter('todos')}
              >
                <Text style={[styles.pillText, regionFilter === 'todos' && styles.pillTextActive]}>Todas</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.pill, regionFilter === 'sp' && styles.pillActive]} 
                onPress={() => setRegionFilter('sp')}
              >
                <Text style={[styles.pillText, regionFilter === 'sp' && styles.pillTextActive]}>Grande SP</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.pill, regionFilter === 'campinas' && styles.pillActive]} 
                onPress={() => setRegionFilter('campinas')}
              >
                <Text style={[styles.pillText, regionFilter === 'campinas' && styles.pillTextActive]}>Interior/Litoral</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <Text style={styles.sectionTitle}>Resultados Encontrados ({filteredBids.length})</Text>

        <FlatList
          data={filteredBids}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <X size={36} color="#cbd5e1" />
              <Text style={styles.emptyText}>Nenhum edital corresponde aos filtros aplicados.</Text>
            </View>
          }
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
  headerSection: {
    marginBottom: 16,
  },
  screenTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  screenSubtitle: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 16,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 2,
    elevation: 1,
  },
  searchInput: {
    flex: 1,
    height: 46,
    marginLeft: 8,
    fontSize: 14,
    color: '#1e293b',
  },
  filterButton: {
    backgroundColor: '#64748b',
    width: 46,
    height: 46,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  filterButtonActive: {
    backgroundColor: '#2563eb',
  },
  filterPanel: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  filterPanelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    paddingBottom: 8,
  },
  filterPanelTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  clearBtn: {
    padding: 4,
  },
  clearBtnText: {
    fontSize: 11,
    color: '#2563eb',
    fontWeight: '600',
  },
  filterLabel: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#64748b',
    marginTop: 8,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  pillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  pill: {
    backgroundColor: '#f1f5f9',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  pillActive: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  pillText: {
    fontSize: 11,
    color: '#475569',
    fontWeight: '500',
  },
  pillTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#475569',
    marginBottom: 12,
  },
  listContent: {
    paddingBottom: 20,
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
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    color: '#94a3b8',
    marginTop: 12,
    fontSize: 13,
    textAlign: 'center',
  },
});
