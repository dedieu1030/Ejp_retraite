import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { useAuthStore, UserRole } from '../store/authStore';
import { useRouter } from 'expo-router';
import { Colors } from '../constants/Colors';
import { Button } from '../components/ui/Button';

export default function LoginScreen() {
  const [name, setName] = useState('');
  const login = useAuthStore(state => state.login);
  const router = useRouter();

  const handleLogin = (role: UserRole) => {
    // "Passoire" auth - use the entered name or default to "Utilisateur"
    login(name.trim() || 'Utilisateur', role);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.header}>
          <View style={styles.heroImagePlaceholder}>
             <Text style={styles.heroLogo}>EJP</Text>
          </View>
          <Text style={styles.title}>Financez la retraite</Text>
          <Text style={styles.subtitle}>Connectez-vous pour commencer à proposer ou chercher de l'aide.</Text>
        </View>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Votre nom (optionnel)"
            placeholderTextColor={Colors.textSecondary}
            value={name}
            onChangeText={setName}
            autoCorrect={false}
          />
          
          <Text style={styles.roleLabel}>Je suis :</Text>
          <View style={styles.buttonGroup}>
            <Button 
              title="Jeune (Proposer Service)" 
              onPress={() => handleLogin('Provider')} 
            />
            <Button 
              title="Retraité (Chercher Aide)" 
              variant="secondary"
              onPress={() => handleLogin('Client')} 
            />
            <Button 
              title="Administrateur" 
              variant="secondary"
              onPress={() => handleLogin('Admin')} 
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    gap: 40,
  },
  header: {
    alignItems: 'center',
  },
  heroImagePlaceholder: {
    width: 120,
    height: 120,
    backgroundColor: Colors.primary,
    borderRadius: 32,
    marginBottom: 32,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 8,
  },
  heroLogo: {
    color: '#fff',
    fontSize: 40,
    fontWeight: '800',
    letterSpacing: -1.5,
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 16,
  },
  form: {
    width: '100%',
    gap: 20,
  },
  input: {
    height: 60,
    backgroundColor: Colors.card,
    borderRadius: 20,
    paddingHorizontal: 20,
    fontSize: 16,
    color: Colors.text,
    fontWeight: '500',
  },
  roleLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginTop: 4,
    marginLeft: 4,
  },
  buttonGroup: {
    gap: 16,
  }
});
