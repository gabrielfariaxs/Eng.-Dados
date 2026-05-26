import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Linking } from 'react-native';
import { ArrowLeft, ChevronDown, ChevronUp, Check, Square, CheckSquare, ExternalLink, AlertTriangle } from 'lucide-react-native';

export default function BidDetailsScreen({ route, navigation }) {
  const { bid } = route.params;
  const [expandedSection, setExpandedSection] = useState('fiscal'); // 'fiscal' expandido por padrão para corresponder ao mockup
  
  // Controle de checks para os itens do checklist da seção regularidade fiscal
  const [checkedItems, setCheckedItems] = useState({
    federais: false,
    estaduais: false,
    municipais: false,
    trabalhistas: true, // CNDT começa marcado
  });

  const toggleSection = (sectionName) => {
    setExpandedSection(expandedSection === sectionName ? null : sectionName);
  };

  const toggleCheck = (item) => {
    setCheckedItems(prev => ({
      ...prev,
      [item]: !prev[item]
    }));
  };

  const totalRequired = 6;
  const docsUploaded = Object.values(checkedItems).filter(Boolean).length + 1; // +1 pelo documento do CCMEI que está regular
  const progressPercent = Math.round((docsUploaded / totalRequired) * 100);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Subheader: Voltar para Editais */}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <ArrowLeft size={16} color="#64748b" />
          <Text style={styles.backButtonText}>Voltar para Editais</Text>
        </TouchableOpacity>

        {/* Título e Badges */}
        <View style={styles.headerInfo}>
          <View style={styles.badgeRow}>
            <Text style={styles.bidCode}>{bid.code}</Text>
            <View style={[styles.badge, styles.badgeAberto]}>
              <Text style={styles.badgeAbertoText}>Aberto</Text>
            </View>
            {bid.exclusive && (
              <View style={[styles.badge, styles.badgeExclusive]}>
                <Text style={styles.badgeExclusiveText}>Exclusivo MEI</Text>
              </View>
            )}
          </View>
          <Text style={styles.bidTitle}>{bid.title}</Text>
        </View>

        {/* Card Amarelo: Documentação Incompleta */}
        <View style={styles.warningCard}>
          <View style={styles.warningHeader}>
            <AlertTriangle size={18} color="#ca8a04" style={{ marginRight: 8 }} />
            <Text style={styles.warningTitle}>Documentação Incompleta</Text>
          </View>
          <Text style={styles.warningText}>
            Você possui {docsUploaded} de {totalRequired} documentos obrigatórios. Complete sua documentação antes de enviar a proposta.
          </Text>
          <View style={styles.progressRow}>
            <Text style={styles.progressLabel}>Prontidão Documental</Text>
            <Text style={styles.progressValue}>{progressPercent}%</Text>
          </View>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
          </View>
        </View>

        {/* Seção Grid: Informações Gerais & Benefícios MEI */}
        <View style={styles.gridSection}>
          {/* Card: Informações Gerais */}
          <View style={styles.infoCard}>
            <Text style={styles.cardSectionTitle}>Informações Gerais</Text>
            
            <View style={styles.infoRow}>
              <View style={styles.infoCol}>
                <Text style={styles.infoLabel}>Órgão</Text>
                <Text style={styles.infoValue}>{bid.orgao || 'Secretaria de Educação'}</Text>
              </View>
              <View style={styles.infoCol}>
                <Text style={styles.infoLabel}>Localização</Text>
                <Text style={styles.infoValue}>{bid.region}</Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <View style={styles.infoCol}>
                <Text style={styles.infoLabel}>Data de Publicação</Text>
                <Text style={styles.infoValue}>19/05/2026</Text>
              </View>
              <View style={styles.infoCol}>
                <Text style={styles.infoLabel}>Prazo de Envio</Text>
                <Text style={[styles.infoValue, { fontWeight: 'bold' }]}>{bid.date}</Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <View style={styles.infoCol}>
                <Text style={styles.infoLabel}>Valor Estimado</Text>
                <Text style={[styles.infoValue, styles.priceHighlighted]}>{bid.value}</Text>
              </View>
              <View style={styles.infoCol}>
                <Text style={styles.infoLabel}>Modalidade</Text>
                <Text style={styles.infoValue}>Pregão Eletrônico</Text>
              </View>
            </View>

            <View style={styles.descBlock}>
              <Text style={styles.infoLabel}>Objeto da Licitação</Text>
              <Text style={styles.descriptionText}>
                {bid.title} para atendimento das necessidades públicas locais, conforme especificações técnicas detalhadas no termo de referência do edital.
              </Text>
            </View>

            <TouchableOpacity 
              style={styles.pncpButton}
              onPress={() => Linking.openURL('https://pncp.gov.br')}
            >
              <ExternalLink size={15} color="#fff" style={{ marginRight: 6 }} />
              <Text style={styles.pncpButtonText}>Acessar Edital no PNCP</Text>
            </TouchableOpacity>
          </View>

          {/* Card: Benefícios MEI */}
          <View style={styles.benefitsCard}>
            <Text style={styles.benefitsCardTitle}>Benefícios MEI</Text>

            <View style={styles.benefitItem}>
              <View style={styles.checkCircle}>
                <Check size={14} color="#2563eb" />
              </View>
              <View style={styles.benefitTextContainer}>
                <Text style={styles.benefitTitle}>Licitação Exclusiva</Text>
                <Text style={styles.benefitDesc}>Apenas MEIs e EPPs podem participar desta disputa.</Text>
              </View>
            </View>

            <View style={styles.benefitItem}>
              <View style={styles.checkCircle}>
                <Check size={14} color="#2563eb" />
              </View>
              <View style={styles.benefitTextContainer}>
                <Text style={styles.benefitTitle}>Margem de Preferência</Text>
                <Text style={styles.benefitDesc}>Até 10% de vantagem no preço final sobre grandes empresas.</Text>
              </View>
            </View>

            <View style={styles.benefitItem}>
              <View style={styles.checkCircle}>
                <Check size={14} color="#2563eb" />
              </View>
              <View style={styles.benefitTextContainer}>
                <Text style={styles.benefitTitle}>Documentação Simplificada</Text>
                <Text style={styles.benefitDesc}>Redução de exigências burocráticas e balanço patrimonial dispensado.</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Seção Checklist de Habilitação */}
        <View style={styles.checklistSection}>
          <Text style={styles.checklistTitle}>Checklist de Habilitação</Text>
          <Text style={styles.checklistSubtitle}>Documentos necessários conforme Lei 14.133/2021</Text>

          {/* Acordeão 1: Habilitação Jurídica */}
          <TouchableOpacity 
            style={styles.accordionHeader} 
            onPress={() => toggleSection('juridica')}
          >
            <Text style={styles.accordionTitle}>Habilitação Jurídica</Text>
            <View style={styles.accordionRight}>
              <Text style={styles.accordionProgressText}>1/1 disponíveis</Text>
              {expandedSection === 'juridica' ? <ChevronUp size={16} color="#64748b" /> : <ChevronDown size={16} color="#64748b" />}
            </View>
          </TouchableOpacity>
          {expandedSection === 'juridica' && (
            <View style={styles.accordionContent}>
              <View style={[styles.docItem, styles.docItemRegular]}>
                <CheckSquare size={20} color="#10b981" style={{ marginRight: 10 }} />
                <View style={{ flex: 1 }}>
                  <View style={styles.docItemHeader}>
                    <Text style={styles.docName}>Certificado de Condição de MEI (CCMEI)</Text>
                    <View style={styles.requiredBadge}><Text style={styles.requiredBadgeText}>Obrigatório</Text></View>
                  </View>
                  <Text style={styles.docStatusTextRegular}>Documento regular</Text>
                </View>
              </View>
            </View>
          )}

          {/* Acordeão 2: Regularidade Fiscal e Trabalhista */}
          <TouchableOpacity 
            style={styles.accordionHeader} 
            onPress={() => toggleSection('fiscal')}
          >
            <Text style={styles.accordionTitle}>Regularidade Fiscal e Trabalhista</Text>
            <View style={styles.accordionRight}>
              <Text style={styles.accordionProgressText}>
                {Object.values(checkedItems).filter(Boolean).length}/4 disponíveis
              </Text>
              {expandedSection === 'fiscal' ? <ChevronUp size={16} color="#64748b" /> : <ChevronDown size={16} color="#64748b" />}
            </View>
          </TouchableOpacity>
          {expandedSection === 'fiscal' && (
            <View style={styles.accordionContent}>
              {/* Item 1: Federal */}
              <TouchableOpacity 
                style={[styles.docItem, checkedItems.federais ? styles.docItemRegular : styles.docItemMissing]}
                onPress={() => toggleCheck('federais')}
              >
                {checkedItems.federais ? (
                  <CheckSquare size={20} color="#10b981" style={{ marginRight: 10 }} />
                ) : (
                  <Square size={20} color="#94a3b8" style={{ marginRight: 10 }} />
                )}
                <View style={{ flex: 1 }}>
                  <View style={styles.docItemHeader}>
                    <Text style={styles.docName}>Certidão Negativa de Débitos Federais</Text>
                    <View style={styles.requiredBadge}><Text style={styles.requiredBadgeText}>Obrigatório</Text></View>
                  </View>
                  <Text style={checkedItems.federais ? styles.docStatusTextRegular : styles.docStatusTextMissing}>
                    {checkedItems.federais ? 'Documento regular' : 'Documento não disponível ou vencido'}
                  </Text>
                </View>
              </TouchableOpacity>

              {/* Item 2: Estadual */}
              <TouchableOpacity 
                style={[styles.docItem, checkedItems.estaduais ? styles.docItemRegular : styles.docItemMissing]}
                onPress={() => toggleCheck('estaduais')}
              >
                {checkedItems.estaduais ? (
                  <CheckSquare size={20} color="#10b981" style={{ marginRight: 10 }} />
                ) : (
                  <Square size={20} color="#94a3b8" style={{ marginRight: 10 }} />
                )}
                <View style={{ flex: 1 }}>
                  <View style={styles.docItemHeader}>
                    <Text style={styles.docName}>Certidão Negativa de Débitos Estaduais</Text>
                    <View style={styles.requiredBadge}><Text style={styles.requiredBadgeText}>Obrigatório</Text></View>
                  </View>
                  <Text style={checkedItems.estaduais ? styles.docStatusTextRegular : styles.docStatusTextMissing}>
                    {checkedItems.estaduais ? 'Documento regular' : 'Documento não disponível ou vencido'}
                  </Text>
                </View>
              </TouchableOpacity>

              {/* Item 3: Municipal */}
              <TouchableOpacity 
                style={[styles.docItem, checkedItems.municipais ? styles.docItemRegular : styles.docItemMissing]}
                onPress={() => toggleCheck('municipais')}
              >
                {checkedItems.municipais ? (
                  <CheckSquare size={20} color="#10b981" style={{ marginRight: 10 }} />
                ) : (
                  <Square size={20} color="#94a3b8" style={{ marginRight: 10 }} />
                )}
                <View style={{ flex: 1 }}>
                  <View style={styles.docItemHeader}>
                    <Text style={styles.docName}>Certidão Negativa de Débitos Municipais</Text>
                    <View style={styles.requiredBadge}><Text style={styles.requiredBadgeText}>Obrigatório</Text></View>
                  </View>
                  <Text style={checkedItems.municipais ? styles.docStatusTextRegular : styles.docStatusTextMissing}>
                    {checkedItems.municipais ? 'Documento regular' : 'Documento não disponível ou vencido'}
                  </Text>
                </View>
              </TouchableOpacity>

              {/* Item 4: Trabalhistas */}
              <TouchableOpacity 
                style={[styles.docItem, checkedItems.trabalhistas ? styles.docItemRegular : styles.docItemMissing]}
                onPress={() => toggleCheck('trabalhistas')}
              >
                {checkedItems.trabalhistas ? (
                  <CheckSquare size={20} color="#10b981" style={{ marginRight: 10 }} />
                ) : (
                  <Square size={20} color="#94a3b8" style={{ marginRight: 10 }} />
                )}
                <View style={{ flex: 1 }}>
                  <View style={styles.docItemHeader}>
                    <Text style={styles.docName}>Certidão Negativa de Débitos Trabalhistas (CNDT)</Text>
                    <View style={styles.requiredBadge}><Text style={styles.requiredBadgeText}>Obrigatório</Text></View>
                  </View>
                  <Text style={checkedItems.trabalhistas ? styles.docStatusTextRegular : styles.docStatusTextMissing}>
                    {checkedItems.trabalhistas ? 'Documento regular' : 'Documento não disponível ou vencido'}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}

          {/* Acordeão 3: Qualificação Econômico-Financeira */}
          <TouchableOpacity 
            style={styles.accordionHeader} 
            onPress={() => toggleSection('financeira')}
          >
            <Text style={styles.accordionTitle}>Qualificação Econômico-Financeira</Text>
            <View style={styles.accordionRight}>
              <Text style={styles.accordionProgressText}>0/2 disponíveis</Text>
              {expandedSection === 'financeira' ? <ChevronUp size={16} color="#64748b" /> : <ChevronDown size={16} color="#64748b" />}
            </View>
          </TouchableOpacity>
          {expandedSection === 'financeira' && (
            <View style={styles.accordionContent}>
              <View style={[styles.docItem, styles.docItemMissing]}>
                <Square size={20} color="#94a3b8" style={{ marginRight: 10 }} />
                <View style={{ flex: 1 }}>
                  <View style={styles.docItemHeader}>
                    <Text style={styles.docName}>Balanço Patrimonial</Text>
                    <View style={styles.optionalBadge}><Text style={styles.optionalBadgeText}>Opcional p/ MEI</Text></View>
                  </View>
                  <Text style={styles.docStatusTextMissing}>Dispensado ou não anexado</Text>
                </View>
              </View>
            </View>
          )}

          {/* Acordeão 4: Qualificação Técnica */}
          <TouchableOpacity 
            style={styles.accordionHeader} 
            onPress={() => toggleSection('tecnica')}
          >
            <Text style={styles.accordionTitle}>Qualificação Técnica</Text>
            <View style={styles.accordionRight}>
              <Text style={styles.accordionProgressText}>0/1 disponíveis</Text>
              {expandedSection === 'tecnica' ? <ChevronUp size={16} color="#64748b" /> : <ChevronDown size={16} color="#64748b" />}
            </View>
          </TouchableOpacity>
          {expandedSection === 'tecnica' && (
            <View style={styles.accordionContent}>
              <View style={[styles.docItem, styles.docItemMissing]}>
                <Square size={20} color="#94a3b8" style={{ marginRight: 10 }} />
                <View style={{ flex: 1 }}>
                  <View style={styles.docItemHeader}>
                    <Text style={styles.docName}>Atestado de Capacidade Técnica</Text>
                    <View style={styles.optionalBadge}><Text style={styles.optionalBadgeText}>Opcional p/ MEI</Text></View>
                  </View>
                  <Text style={styles.docStatusTextMissing}>Não disponível</Text>
                </View>
              </View>
            </View>
          )}
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
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButtonText: {
    fontSize: 12,
    color: '#64748b',
    marginLeft: 6,
    fontWeight: '500',
  },
  headerInfo: {
    marginBottom: 16,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  bidCode: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginRight: 8,
  },
  badge: {
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 6,
  },
  badgeAberto: {
    backgroundColor: '#dcfce7',
  },
  badgeAbertoText: {
    color: '#166534',
    fontSize: 10,
    fontWeight: 'bold',
  },
  badgeExclusive: {
    backgroundColor: '#2563eb',
  },
  badgeExclusiveText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  bidTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  warningCard: {
    backgroundColor: '#fef9c3',
    borderColor: '#fef08a',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  warningHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  warningTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#854d0e',
  },
  warningText: {
    fontSize: 12,
    color: '#854d0e',
    lineHeight: 18,
    marginBottom: 12,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  progressLabel: {
    fontSize: 11,
    color: '#854d0e',
  },
  progressValue: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#854d0e',
  },
  progressTrack: {
    height: 6,
    backgroundColor: '#fef08a',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#ca8a04',
    borderRadius: 3,
  },
  gridSection: {
    marginBottom: 24,
  },
  infoCard: {
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
  cardSectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 14,
  },
  infoCol: {
    flex: 1,
    marginRight: 10,
  },
  infoLabel: {
    fontSize: 10,
    color: '#64748b',
    textTransform: 'uppercase',
    fontWeight: '600',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 13,
    color: '#1e293b',
    fontWeight: '500',
  },
  priceHighlighted: {
    color: '#2563eb',
    fontWeight: 'bold',
  },
  descBlock: {
    marginTop: 4,
    marginBottom: 16,
  },
  descriptionText: {
    fontSize: 12,
    color: '#475569',
    lineHeight: 18,
    marginTop: 4,
  },
  pncpButton: {
    backgroundColor: '#0f172a',
    borderRadius: 8,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pncpButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  benefitsCard: {
    backgroundColor: '#eff6ff',
    borderColor: '#dbeafe',
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
  },
  benefitsCardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 14,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  checkCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#dbeafe',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginTop: 2,
  },
  benefitTextContainer: {
    flex: 1,
  },
  benefitTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  benefitDesc: {
    fontSize: 11,
    color: '#64748b',
    marginTop: 2,
    lineHeight: 15,
  },
  checklistSection: {
    marginTop: 12,
  },
  checklistTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  checklistSubtitle: {
    fontSize: 11,
    color: '#64748b',
    marginTop: 2,
    marginBottom: 16,
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 14,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 2,
    elevation: 1,
  },
  accordionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  accordionRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accordionProgressText: {
    fontSize: 11,
    color: '#64748b',
    marginRight: 8,
  },
  accordionContent: {
    paddingHorizontal: 8,
    paddingBottom: 12,
  },
  docItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 8,
  },
  docItemRegular: {
    backgroundColor: '#f0fdf4',
    borderColor: '#bbf7d0',
  },
  docItemMissing: {
    backgroundColor: '#fff',
    borderColor: '#e2e8f0',
  },
  docItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  docName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1e293b',
    flex: 1,
    marginRight: 8,
  },
  requiredBadge: {
    backgroundColor: '#ef4444',
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 1,
  },
  requiredBadgeText: {
    color: '#fff',
    fontSize: 8,
    fontWeight: 'bold',
  },
  optionalBadge: {
    backgroundColor: '#94a3b8',
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 1,
  },
  optionalBadgeText: {
    color: '#fff',
    fontSize: 8,
    fontWeight: 'bold',
  },
  docStatusTextRegular: {
    fontSize: 11,
    color: '#10b981',
  },
  docStatusTextMissing: {
    fontSize: 11,
    color: '#64748b',
  },
});
