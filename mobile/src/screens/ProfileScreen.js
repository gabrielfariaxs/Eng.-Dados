import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { User, Mail, FileText, Settings, LogOut, Download, Trash2, ShieldCheck } from 'lucide-react-native';
import { AuthContext } from '../context/AuthContext';

export default function ProfileScreen({ navigation }) {
  const { logout } = useContext(AuthContext);

  const handleExportData = () => {
    Alert.alert(
      'Exportar Meus Dados',
      'De acordo com a LGPD (Direito à Portabilidade), um arquivo estruturado com suas informações será enviado para o seu e-mail.',
      [{ text: 'Entendi' }]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Excluir Conta',
      'Tem certeza que deseja excluir sua conta? Todos os seus dados serão apagados permanentemente de nossos servidores de acordo com a LGPD (Direito ao Esquecimento).',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Excluir', 
          style: 'destructive',
          onPress: () => {
            // Simula a exclusão dos dados
            Alert.alert('Conta Excluída', 'Seus dados foram removidos com sucesso.');
            logout();
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <User size={40} color="#fff" />
        </View>
        <Text style={styles.name}>João Silva</Text>
        <Text style={styles.role}>Empreendedor MEI</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <ShieldCheck size={20} color="#2563eb" />
          <Text style={styles.sectionTitle}>Meus Dados (LGPD)</Text>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Mail size={18} color="#64748b" />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>E-mail</Text>
              <Text style={styles.infoValue}>con***@licitamei.com.br</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <FileText size={18} color="#64748b" />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>CNPJ</Text>
              <Text style={styles.infoValue}>12.***.***/0001-90</Text>
            </View>
          </View>
          
          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Settings size={18} color="#64748b" />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Preferências de Licitação</Text>
              <Text style={styles.infoValue}>Serviços de TI, Desenvolvimento de Software</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Direitos do Titular</Text>
        
        <TouchableOpacity style={styles.actionButton} onPress={handleExportData}>
          <View style={styles.actionIconContainer}>
            <Download size={20} color="#2563eb" />
          </View>
          <View style={styles.actionTextContainer}>
            <Text style={styles.actionTitle}>Exportar Meus Dados</Text>
            <Text style={styles.actionDescription}>Receba uma cópia dos seus dados.</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButtonDestructive} onPress={handleDeleteAccount}>
          <View style={[styles.actionIconContainer, { backgroundColor: '#fee2e2' }]}>
            <Trash2 size={20} color="#ef4444" />
          </View>
          <View style={styles.actionTextContainer}>
            <Text style={[styles.actionTitle, { color: '#ef4444' }]}>Excluir Conta</Text>
            <Text style={styles.actionDescription}>Apague todos os seus dados.</Text>
          </View>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={() => logout()}>
        <LogOut size={20} color="#64748b" />
        <Text style={styles.logoutText}>Sair do Aplicativo</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    padding: 24,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#2563eb',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  role: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginLeft: 8,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoTextContainer: {
    marginLeft: 16,
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 15,
    color: '#1e293b',
    marginTop: 2,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#f1f5f9',
    marginVertical: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  actionButtonDestructive: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#fee2e2',
  },
  actionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#eff6ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  actionTextContainer: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  actionDescription: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 2,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    marginTop: 10,
  },
  logoutText: {
    marginLeft: 8,
    fontSize: 15,
    color: '#64748b',
    fontWeight: '600',
  }
});
