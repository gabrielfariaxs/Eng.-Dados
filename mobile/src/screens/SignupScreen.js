import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { Lock, Mail, User, Eye, EyeOff, FileText, ArrowLeft } from 'lucide-react-native';

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [cnpj, setCnpj] = useState('');
  const [preferences, setPreferences] = useState('');
  const [lgpdConsent, setLgpdConsent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleCnpjChange = (text) => {
    let cleaned = text.replace(/\D/g, '');
    if (cleaned.length > 14) cleaned = cleaned.slice(0, 14);

    let formatted = cleaned;
    if (cleaned.length > 2) formatted = `${cleaned.slice(0, 2)}.${cleaned.slice(2)}`;
    if (cleaned.length > 5) formatted = `${formatted.slice(0, 6)}.${cleaned.slice(5)}`;
    if (cleaned.length > 8) formatted = `${formatted.slice(0, 10)}/${cleaned.slice(8)}`;
    if (cleaned.length > 12) formatted = `${formatted.slice(0, 15)}-${cleaned.slice(12)}`;

    setCnpj(formatted);
  };

  const validatePassword = (pass) => {
    const minLength = pass.length >= 8;
    const hasUpper = /[A-Z]/.test(pass);
    const hasLower = /[a-z]/.test(pass);
    const hasNumber = /[0-9]/.test(pass);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pass);

    return minLength && hasUpper && hasLower && hasNumber && hasSpecial;
  };

  const handleSignup = () => {
    setErrorMessage('');
    
    if (!name || !email || !password || !cnpj) {
      setErrorMessage('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    if (!lgpdConsent) {
      setErrorMessage('Você precisa concordar com os Termos de Uso e Política de Privacidade (LGPD) para criar sua conta.');
      return;
    }

    if (!validatePassword(password)) {
      setErrorMessage('Sua senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e símbolos.');
      return;
    }

    // Simulando chamada a API
    console.log('Conta criada com sucesso para:', email);
    if (Platform.OS === 'web') {
      window.alert('Conta criada com sucesso! Faça login para continuar.');
      navigation.navigate('Login');
    } else {
      Alert.alert('Sucesso', 'Conta criada! Faça login para continuar.', [
        { text: 'OK', onPress: () => navigation.navigate('Login') }
      ]);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
          >
            <ArrowLeft color="#64748b" size={24} />
          </TouchableOpacity>
          <View style={styles.iconContainer}>
            <FileText color="#fff" size={32} />
          </View>
          <Text style={styles.title}>Criar Conta</Text>
          <Text style={styles.subtitle}>Junte-se ao LicitaMEI</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.inputLabel}>Nome completo</Text>
          <View style={styles.inputWrapper}>
            <User color="#94a3b8" size={18} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Digite seu nome"
              placeholderTextColor="#94a3b8"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />
          </View>

          <Text style={styles.inputLabel}>CNPJ do MEI</Text>
          <View style={styles.inputWrapper}>
            <FileText color="#94a3b8" size={18} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="00.000.000/0001-00"
              placeholderTextColor="#94a3b8"
              value={cnpj}
              onChangeText={handleCnpjChange}
              keyboardType="number-pad"
              maxLength={18}
            />
          </View>

          <Text style={styles.inputLabel}>E-mail profissional</Text>
          <View style={styles.inputWrapper}>
            <Mail color="#94a3b8" size={18} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="seuemail@exemplo.com.br"
              placeholderTextColor="#94a3b8"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <Text style={styles.inputLabel}>Senha de segurança</Text>
          <View style={styles.inputWrapper}>
            <Lock color="#94a3b8" size={18} style={styles.inputIcon} />
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="Crie uma senha forte"
              placeholderTextColor="#94a3b8"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            {Platform.OS !== 'web' && (
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <EyeOff color="#64748b" size={18} />
                ) : (
                  <Eye color="#64748b" size={18} />
                )}
              </TouchableOpacity>
            )}
          </View>

          <Text style={styles.inputLabel}>Preferências de licitação (Opcional)</Text>
          <View style={styles.inputWrapper}>
            <FileText color="#94a3b8" size={18} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Ex: Serviços de TI, Transporte"
              placeholderTextColor="#94a3b8"
              value={preferences}
              onChangeText={setPreferences}
            />
          </View>

          <TouchableOpacity 
            style={styles.checkboxContainer} 
            onPress={() => setLgpdConsent(!lgpdConsent)}
          >
            <View style={[styles.checkbox, lgpdConsent && styles.checkboxChecked]}>
              {lgpdConsent && <View style={styles.checkboxInner} />}
            </View>
            <Text style={styles.checkboxLabel}>
              Li e concordo com os Termos de Uso e a coleta dos meus dados para encontrar licitações de acordo com meu perfil (LGPD).
            </Text>
          </TouchableOpacity>

          {errorMessage ? (
            <Text style={styles.errorText}>{errorMessage}</Text>
          ) : null}

          <TouchableOpacity style={styles.button} onPress={handleSignup}>
            <Text style={styles.buttonText}>Cadastrar MEI</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.loginButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.loginText}>
              Já tem uma conta? <Text style={styles.loginHighlight}>Faça Login</Text>
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            🔐 Seus dados estão protegidos conforme a LGPD.
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 0,
    top: 0,
    padding: 8,
    zIndex: 10,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: '#2563eb',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 6,
    fontWeight: '500',
  },
  form: {
    width: '100%',
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#475569',
    marginBottom: 6,
    marginLeft: 2,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 2,
    elevation: 1,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: 50,
    color: '#1e293b',
    fontSize: 15,
    ...(Platform.OS === 'web' ? { outlineStyle: 'none' } : {}),
  },
  errorText: {
    color: '#ef4444',
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 12,
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#2563eb',
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  loginButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  loginText: {
    color: '#64748b',
    fontSize: 13,
  },
  loginHighlight: {
    color: '#2563eb',
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 40,
    alignItems: 'center',
  },
  footerText: {
    color: '#94a3b8',
    fontSize: 11,
    textAlign: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
    paddingRight: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#cbd5e1',
    borderRadius: 4,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    borderColor: '#2563eb',
    backgroundColor: '#2563eb',
  },
  checkboxInner: {
    width: 10,
    height: 10,
    backgroundColor: '#fff',
  },
  checkboxLabel: {
    flex: 1,
    fontSize: 12,
    color: '#475569',
    lineHeight: 18,
  }
});
