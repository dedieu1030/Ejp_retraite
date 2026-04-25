import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useDataStore, Submission } from '../../store/dataStore';
import { Colors } from '../../constants/Colors';
import { useRouter } from 'expo-router';
import { More } from 'iconsax-react-native';

export default function AdminManagementScreen() {
  const { submissions, deleteSubmission } = useDataStore();
  const router = useRouter();

  const handleDelete = (id: string) => {
    Alert.alert('Supprimer', 'Voulez-vous vraiment supprimer cette soumission ?', [
      { text: 'Annuler', style: 'cancel' },
      { text: 'Supprimer', style: 'destructive', onPress: () => deleteSubmission(id) },
    ]);
  };

  const handleOptions = (item: Submission) => {
    Alert.alert('Options', 'Que voulez-vous faire ?', [
      { text: 'Éditer', onPress: () => router.push(`/(admin)/edit?id=${item.id}`) },
      { text: 'Supprimer', style: 'destructive', onPress: () => handleDelete(item.id) },
      { text: 'Annuler', style: 'cancel' },
    ]);
  };

  const TableHeader = () => (
    <View style={styles.headerRow}>
      <Text style={[styles.headerCell, { flex: 1.5 }]}>SERVICE</Text>
      <Text style={[styles.headerCell, { flex: 1 }]}>NOM</Text>
      <Text style={[styles.headerCell, { flex: 1.5 }]}>DÉTAILS</Text>
      <View style={{ width: 40, alignItems: 'center' }} />
    </View>
  );

  const TableRow = ({ item }: { item: Submission }) => (
    <View style={styles.row}>
      <Text style={[styles.cell, styles.primaryCell, { flex: 1.5 }]} numberOfLines={1}>{item.serviceType}</Text>
      <Text style={[styles.cell, { flex: 1 }]} numberOfLines={1}>{item.name}</Text>
      <Text style={[styles.cell, styles.descCell, { flex: 1.5 }]} numberOfLines={1}>{item.description}</Text>
      <TouchableOpacity 
        style={styles.actionCell} 
        onPress={() => handleOptions(item)}
      >
        <More size={20} color={Colors.textSecondary} variant="Linear" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <TableHeader />
      <ScrollView>
        {submissions.length === 0 ? (
            <Text style={styles.empty}>Aucune soumission à gérer.</Text>
        ) : (
            submissions.map(sub => <TableRow key={sub.id} item={sub} />)
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  headerRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    paddingVertical: 16,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  cell: {
    fontSize: 14,
    color: Colors.text,
    paddingRight: 8,
  },
  primaryCell: {
    fontWeight: '500',
    color: '#000',
  },
  descCell: {
    color: Colors.textSecondary,
  },
  headerCell: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.textSecondary,
    letterSpacing: 0.5,
    paddingRight: 8,
  },
  actionCell: {
    width: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  empty: {
    padding: 32,
    textAlign: 'center',
    color: Colors.textSecondary,
  }
});
