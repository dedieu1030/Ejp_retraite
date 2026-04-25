import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Button } from '../../components/ui/Button';

// Mock simple list of users
const INITIAL_USERS = [
  { id: '1', name: 'Alice Dupont', role: 'Provider' },
  { id: '2', name: 'Bob Martin', role: 'Client' },
  { id: '3', name: 'Admin Manager', role: 'Admin' },
];

export default function AdminUsersScreen() {
  const [users, setUsers] = useState(INITIAL_USERS);

  const deleteUser = (id: string) => {
    setUsers(users.filter(u => u.id !== id));
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Gestion des utilisateurs</Text>
      
      {users.map(u => (
        <View key={u.id} style={styles.card}>
          <View>
            <Text style={styles.name}>{u.name}</Text>
            <Text style={styles.role}>{u.role}</Text>
          </View>
          <Button 
            title="Bannir" 
            variant="danger" 
            onPress={() => deleteUser(u.id)} 
            style={styles.btn}
            textStyle={styles.btnText}
          />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: 20,
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 8,
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  role: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  btn: {
    width: 80,
    height: 40,
    paddingHorizontal: 0,
    borderRadius: 8,
  },
  btnText: {
    fontSize: 14,
  }
});
