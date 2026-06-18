import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Alert, Linking, Platform } from 'react-native';
import { FileCheck, FileWarning, Clock, Upload, Download, ExternalLink, RefreshCw, Info } from 'lucide-react-native';

const DOCUMENTS_LIST = [
  {
    id: '1',
    name: 'Certificado de Condição de Microempreendedor Individual',
    status: 'Regular',
    type: 'CCMEI',
    emissao: '14/01/2026',
    validade: '14/01/2027',
    diasRestantes: 234,
    vencendo: false,
  },
  {
    id: '2',
    name: 'Certidão Negativa de Débitos Federais',
    status: 'Regular',
    type: 'Certidão Federal',
    emissao: '09/04/2026',
    validade: '09/10/2026',
    diasRestantes: 137,
    vencendo: false,
  },
  {
    id: '3',
    name: 'Certidão Negativa de Débitos Estaduais',
    status: 'Regular',
    type: 'Certidão Estadual',
    emissao: '04/03/2026',
    validade: '04/09/2026',
    diasRestantes: 102,
    vencendo: false,
  },
  {
    id: '4',
    name: 'Certidão Negativa de Débitos Municipais',
    status: 'Vencido',
    type: 'Certidão Municipal',
    emissao: '19/12/2025',
    validade: '19/06/2026', // Na data atual (26/05/2026), restam 25 dias, mas no sistema está marcado como vencido/para renovação
    diasRestantes: 25,
    vencendo: true,
  },
  {
    id: '5',
    name: 'Certidão Negativa de Débitos Trabalhistas',
    status: 'Regular',
    type: 'Certidão Trabalhista',
    emissao: '30/04/2026',
    validade: '31/10/2026',
    diasRestantes: 159,
    vencendo: false,
  },
];

export default function DocumentScreen() {
  const showAlert = (title, message) => {
    if (Platform.OS === 'web') {
      alert(`${title}\n\n${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  const handleEmitirCCMEI = () => {
    Linking.openURL('https://www.gov.br/empresas-e-negocios/pt-br/empreendedor');
  };

  const handleCertidoesFederais = () => {
    Linking.openURL('https://solucoes.receita.fazenda.gov.br/Servicos/certidaointernet/PJ/Consultar');
  };

  const handleUpload = () => {
    showAlert('Upload de Documento', 'Selecione o arquivo do seu dispositivo para fazer o upload (CCMEI ou Certidão).');
  };

  const handleDownload = (docName) => {
    showAlert('Download Concluído', `O arquivo "${docName}" foi baixado com sucesso.`);
  };

  const handleRenovar = (docName) => {
    if (docName.includes('Municipal')) {
      Linking.openURL('https://www.prefeitura.sp.gov.br/cidade/secretarias/fazenda/servicos/certidoes/');
    } else if (docName.includes('Estadual')) {
      Linking.openURL('https://www.fazenda.sp.gov.br');
    } else if (docName.includes('Federal')) {
      Linking.openURL('https://solucoes.receita.fazenda.gov.br/Servicos/certidaointernet/PJ/Consultar');
    } else if (docName.includes('Trabalhista')) {
      Linking.openURL('https://www.tst.jus.br/certidao');
    } else if (docName.includes('CCMEI')) {
      Linking.openURL('https://www.gov.br/empresas-e-negocios/pt-br/empreendedor');
    } else {
      showAlert('Renovação', `Redirecionando para a renovação de: ${docName}`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Cabeçalho */}
        <View style={styles.headerSection}>
          <Text style={styles.screenTitle}>Meus Documentos</Text>
          <Text style={styles.screenSubtitle}>Gerencie seus documentos para participar de licitações</Text>
        </View>

        {/* Card: Resumo da Documentação */}
        <View style={styles.summaryCard}>
          <Text style={styles.cardTitle}>Resumo da Documentação</Text>
          <View style={styles.progressBarInfo}>
            <Text style={styles.progressBarLabel}>Documentação Completa</Text>
            <Text style={styles.progressBarPercent}>80%</Text>
          </View>
          <View style={styles.progressBarTrack}>
            <View style={[styles.progressBarFill, { width: '80%' }]} />
          </View>

          <View style={styles.statusBoxesRow}>
            <View style={[styles.statusBox, { backgroundColor: '#f0fdf4' }]}>
              <FileCheck size={14} color="#10b981" style={{ marginRight: 6 }} />
              <Text style={[styles.statusBoxText, { color: '#10b981' }]}>4 Regular</Text>
            </View>
            <View style={[styles.statusBox, { backgroundColor: '#fee2e2' }]}>
              <FileWarning size={14} color="#ef4444" style={{ marginRight: 6 }} />
              <Text style={[styles.statusBoxText, { color: '#ef4444' }]}>1 Vencido</Text>
            </View>
            <View style={[styles.statusBox, { backgroundColor: '#f1f5f9' }]}>
              <Clock size={14} color="#64748b" style={{ marginRight: 6 }} />
              <Text style={[styles.statusBoxText, { color: '#64748b' }]}>0 Pendente</Text>
            </View>
          </View>
        </View>

        {/* Linha de Botões de Ações Rápidas */}
        <View style={styles.quickActionsRow}>
          <TouchableOpacity style={styles.actionButton} onPress={handleEmitirCCMEI}>
            <ExternalLink size={14} color="#475569" style={{ marginRight: 6 }} />
            <Text style={styles.actionButtonText}>Emitir CCMEI</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleCertidoesFederais}>
            <ExternalLink size={14} color="#475569" style={{ marginRight: 6 }} />
            <Text style={styles.actionButtonText}>Certidões Federais</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleUpload}>
            <Upload size={14} color="#475569" style={{ marginRight: 6 }} />
            <Text style={styles.actionButtonText}>Upload</Text>
          </TouchableOpacity>
        </View>

        {/* Listagem de Documentos */}
        <Text style={styles.sectionTitle}>Documentos Cadastrados</Text>

        {DOCUMENTS_LIST.map((doc) => {
          const isVencido = doc.status === 'Vencido';
          return (
            <View key={doc.id} style={styles.docCard}>
              <View style={styles.docCardHeader}>
                <View style={styles.docTitleGroup}>
                  <Text style={styles.docName}>{doc.name}</Text>
                  <View style={styles.badgeRow}>
                    <View style={[styles.badge, isVencido ? styles.badgeVencido : styles.badgeRegular]}>
                      <Text style={isVencido ? styles.badgeVencidoText : styles.badgeRegularText}>
                        {doc.status}
                      </Text>
                    </View>
                    <View style={[styles.badge, styles.badgeType]}>
                      <Text style={styles.badgeTypeText}>{doc.type}</Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Informações de Validade */}
              <View style={styles.docDatesRow}>
                <View style={styles.dateCol}>
                  <Text style={styles.dateLabel}>Data de Emissão</Text>
                  <Text style={styles.dateValue}>{doc.emissao}</Text>
                </View>
                <View style={styles.dateCol}>
                  <Text style={styles.dateLabel}>Validade</Text>
                  <Text style={styles.dateValue}>{doc.validade}</Text>
                </View>
                <View style={styles.dateCol}>
                  <Text style={styles.dateLabel}>Dias Restantes</Text>
                  <Text style={[
                    styles.dateValue, 
                    isVencido ? { color: '#f97316' } : { color: '#10b981' },
                    { fontWeight: 'bold' }
                  ]}>
                    {doc.diasRestantes} dias
                  </Text>
                </View>
              </View>

              {/* Se o documento estiver vencido, exibe alerta e botão de renovação */}
              {isVencido && (
                <View style={styles.docWarningAlert}>
                  <FileWarning size={14} color="#ef4444" style={{ marginRight: 6, marginTop: 2 }} />
                  <Text style={styles.docWarningText}>
                    Documento vencido. Você não pode participar de licitações até regularizar.
                  </Text>
                </View>
              )}

              {/* Botões de Ação do Documento */}
              <View style={styles.docCardActions}>
                {isVencido ? (
                  <>
                    <TouchableOpacity 
                      style={[styles.docBtn, styles.docBtnOutline]} 
                      onPress={() => handleDownload(doc.name)}
                    >
                      <Download size={14} color="#475569" style={{ marginRight: 4 }} />
                      <Text style={styles.docBtnTextOutline}>Baixar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={[styles.docBtn, styles.docBtnBlue]} 
                      onPress={() => handleRenovar(doc.name)}
                    >
                      <RefreshCw size={14} color="#fff" style={{ marginRight: 4 }} />
                      <Text style={styles.docBtnTextBlue}>Renovar</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <TouchableOpacity 
                    style={[styles.docBtn, styles.docBtnOutline, { width: '100%' }]} 
                    onPress={() => handleDownload(doc.name)}
                  >
                    <Download size={14} color="#475569" style={{ marginRight: 4 }} />
                    <Text style={styles.docBtnTextOutline}>Baixar</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          );
        })}

        {/* Guia de Documentos Necessários */}
        <View style={styles.guideCard}>
          <Text style={styles.guideTitle}>Documentos Necessários para Licitações</Text>
          <View style={styles.guideList}>
            <View style={styles.guideItem}>
              <Info size={14} color="#2563eb" style={{ marginRight: 8, marginTop: 2 }} />
              <Text style={styles.guideText}>
                <Text style={{ fontWeight: 'bold' }}>CCMEI:</Text> Certificado de Condição de Microempreendedor Individual.
              </Text>
            </View>
            <View style={styles.guideItem}>
              <Info size={14} color="#2563eb" style={{ marginRight: 8, marginTop: 2 }} />
              <Text style={styles.guideText}>
                <Text style={{ fontWeight: 'bold' }}>CNDs:</Text> Certidões Negativas de Débitos (Federal, Estadual, Municipal e Trabalhista).
              </Text>
            </View>
            <View style={styles.guideItem}>
              <Info size={14} color="#2563eb" style={{ marginRight: 8, marginTop: 2 }} />
              <Text style={styles.guideText}>
                <Text style={{ fontWeight: 'bold' }}>Documentos adicionais:</Text> Podem variar conforme o edital.
              </Text>
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
  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  cardTitle: {
    fontSize: 14,
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
  statusBoxesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusBox: {
    flex: 0.31,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 8,
  },
  statusBoxText: {
    fontSize: 11,
    fontWeight: '600',
  },
  quickActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  actionButton: {
    flex: 0.31,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 10,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 2,
    elevation: 1,
  },
  actionButtonText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#475569',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 12,
  },
  docCard: {
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
  docCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  docTitleGroup: {
    flex: 1,
  },
  docName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1e293b',
    lineHeight: 18,
    marginBottom: 6,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 6,
  },
  badgeRegular: {
    backgroundColor: '#dcfce7',
  },
  badgeRegularText: {
    color: '#166534',
    fontSize: 9,
    fontWeight: 'bold',
  },
  badgeVencido: {
    backgroundColor: '#fee2e2',
  },
  badgeVencidoText: {
    color: '#ef4444',
    fontSize: 9,
    fontWeight: 'bold',
  },
  badgeType: {
    backgroundColor: '#f1f5f9',
  },
  badgeTypeText: {
    color: '#64748b',
    fontSize: 9,
    fontWeight: 'bold',
  },
  docDatesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    paddingTop: 12,
    marginBottom: 12,
  },
  dateCol: {
    flex: 1,
  },
  dateLabel: {
    fontSize: 9,
    color: '#94a3b8',
    textTransform: 'uppercase',
    fontWeight: '600',
    marginBottom: 2,
  },
  dateValue: {
    fontSize: 12,
    color: '#1e293b',
    fontWeight: '500',
  },
  docWarningAlert: {
    flexDirection: 'row',
    backgroundColor: '#fee2e2',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 12,
  },
  docWarningText: {
    flex: 1,
    fontSize: 11,
    color: '#ef4444',
    lineHeight: 15,
  },
  docCardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  docBtn: {
    flex: 0.485,
    height: 36,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  docBtnOutline: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#cbd5e1',
  },
  docBtnTextOutline: {
    color: '#475569',
    fontSize: 12,
    fontWeight: '600',
  },
  docBtnBlue: {
    backgroundColor: '#2563eb',
  },
  docBtnTextBlue: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  guideCard: {
    backgroundColor: '#eff6ff',
    borderColor: '#dbeafe',
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
  },
  guideTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 12,
  },
  guideList: {
    marginTop: 4,
  },
  guideItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  guideText: {
    flex: 1,
    fontSize: 11,
    color: '#1e40af',
    lineHeight: 16,
  },
});
