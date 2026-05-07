import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image } from 'react-native';

export default function OnboardingScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>LicitaMEI</Text>
          <Text style={styles.subtitle}>Democratizando o acesso a licitações para MEIs</Text>
        </View>

        <View style={styles.illustration}>
          {/* Espaço para uma ilustração ou logo */}
          <View style={styles.circle} />
        </View>

        <View style={styles.footer}>
          <Text style={styles.description}>
            Encontre editais, organize seus documentos e participe de concorrências públicas de forma simplificada.
          </Text>
          
          <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.replace('Login')}
          >
            <Text style={styles.buttonText}>Começar Agora</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  header: {
    marginTop: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2563eb',
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    marginTop: 8,
  },
  illustration: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#eff6ff',
  },
  footer: {
    marginBottom: 40,
  },
  description: {
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center',
    marginBottom: 32,
  },
  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
