import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useDataStore, Submission } from '../../store/dataStore';
import { Colors } from '../../constants/Colors';
import { useRouter } from 'expo-router';
import { Pencil, Trash2 } from 'lucide-react-native';

export default function AdminManagementScreen() {
  const { submissions, deleteSubmission } = useDataStore();
  const router = useRouter();

  const handleDelete = (id: string) => {
    Alert.alert('Supprimer', 'Voulez-vous vraiment supprimer cette soumission ?', [
      { text: 'Annuler', style: 'cancel' },
      { text: 'Supprimer', style: 'destructive', onPress: () => deleteSubmission(id) },
    ]);
  };

  const TableHeader = () => (
    <View style={styles.row}>
      <Text style={[styles.cell, styles.headerCell, { width: 100 }]}>Actions</Text>
      <Text style={[styles.cell, styles.headerCell, { width: 120 }]}>Nom</Text>
      <Text style={[styles.cell, styles.headerCell, { width: 150 }]}>Service</Text>
      <Text style={[styles.cell, styles.headerCell, { width: 200 }]}>Description</Text>
      <Text style={[styles.cell, styles.headerCell, { width: 100 }]}>Restant</Text>
    </View>
  );

  const TableRow = ({ item }: { item: Submission }) => (
    <View style={styles.row}>
      <View style={[styles.cell, { width: 100, flexDirection: 'row', gap: 12 }]}>
        <TouchableOpacity onPress={() => router.push(`/(admin)/edit?id=${item.id}`)}>
          <Pencil color={Colors.primary} size={20} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item.id)}>
          <Trash2 color={Colors.danger} size={20} />
        </TouchableOpacity>
      </View>
      <Text style={[styles.cell, { width: 120 }]}>{item.name}</Text>
      <Text style={[styles.cell, { width: 150, fontWeight: 'bold' }]}>{item.serviceType}</Text>
      <Text style={[styles.cell, { width: 200 }]} numberOfLines={2}>{item.description}</Text>
      <Text style={[styles.cell, { width: 100, color: Colors.danger, fontWeight: 'bold' }]}>{item.remainingAmount} €</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.horizontalScroll}>
        <View>
          <TableHeader />
          <ScrollView>
            {submissions.length === 0 ? (
               <Text style={styles.empty}>Aucune soumission à gérer.</Text>
            ) : (
               submissions.map(sub => <TableRow key={sub.id} item={sub} />)
            )}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  horizontalScroll: {
    flex: 1,
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
    paddingRight: 16,
  },
  headerCell: {
    fontWeight: '700',
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  empty: {
    padding: 32,
    textAlign: 'center',
    color: Colors.textSecondary,
  }
});
