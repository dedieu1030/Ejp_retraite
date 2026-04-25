import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Button } from '../../components/ui/Button';
import { User, ShieldTick, Profile2User, Trash } from 'iconsax-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Mock simple list of users
const INITIAL_USERS = [
  { id: '1', name: 'Alice Dupont', role: 'Provider' },
  { id: '2', name: 'Bob Martin', role: 'Client' },
  { id: '3', name: 'Admin Manager', role: 'Admin' },
];

export default function AdminUsersScreen() {
  const [users, setUsers] = useState(INITIAL_USERS);

  const deleteUser = (id: string) => {
    Alert.alert('Confirmer', 'Voulez-vous vraiment bannir cet utilisateur ?', [
      { text: 'Annuler', style: 'cancel' },
      { text: 'Bannir', style: 'destructive', onPress: () => setUsers(users.filter(u => u.id !== id)) },
    ]);
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'Admin': return <ShieldTick size={20} color={Colors.primary} variant="Bold" />;
      case 'Provider': return <User size={20} color="#FF9800" variant="Bold" />;
      case 'Client': return <Profile2User size={20} color="#4CAF50" variant="Bold" />;
      default: return <User size={20} color={Colors.textSecondary} />;
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Utilisateurs</Text>
        <Text style={styles.subtitle}>{users.length} membres inscrits</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {users.map(u => (
          <View key={u.id} style={styles.card}>
            <View style={styles.userInfo}>
              <View style={[styles.roleIcon, { backgroundColor: u.role === 'Admin' ? '#F0F4FF' : u.role === 'Provider' ? '#FFF8E1' : '#E8F5E9' }]}>
                {getRoleIcon(u.role)}
              </View>
              <View>
                <Text style={styles.name}>{u.name}</Text>
                <Text style={styles.role}>{u.role}</Text>
              </View>
            </View>
            <TouchableOpacity 
              style={styles.deleteButton} 
              onPress={() => deleteUser(u.id)}
            >
              <Trash size={20} color={Colors.danger} variant="Linear" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.text,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '500',
    marginTop: 2,
  },
  content: {
    padding: 20,
    paddingTop: 0,
    gap: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  roleIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
  },
  role: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontWeight: '500',
    marginTop: 1,
  },
  deleteButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#FFF5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
