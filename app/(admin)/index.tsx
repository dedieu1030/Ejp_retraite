import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, TextInput } from 'react-native';
import { useDataStore, Submission } from '../../store/dataStore';
import { Colors } from '../../constants/Colors';
import { useRouter } from 'expo-router';
import { More, SearchNormal1, Trash, Edit2, User, Location, Briefcase } from 'iconsax-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AdminManagementScreen() {
  const { submissions, deleteSubmission } = useDataStore();
  const [search, setSearch] = useState('');
  const router = useRouter();

  const filteredSubmissions = submissions.filter(sub => 
    sub.name.toLowerCase().includes(search.toLowerCase()) || 
    sub.serviceType.toLowerCase().includes(search.toLowerCase()) ||
    sub.city.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string) => {
    Alert.alert('Supprimer', 'Voulez-vous vraiment supprimer cette soumission ?', [
      { text: 'Annuler', style: 'cancel' },
      { text: 'Supprimer', style: 'destructive', onPress: () => deleteSubmission(id) },
    ]);
  };

  const handleEdit = (id: string) => {
    router.push(`/(admin)/edit?id=${id}`);
  };

  const AdminCard = ({ item }: { item: Submission }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.serviceInfo}>
          <View style={styles.iconContainer}>
            <Briefcase size={20} color={Colors.primary} variant="Bold" />
          </View>
          <View>
            <Text style={styles.serviceName}>{item.serviceType}</Text>
            <Text style={styles.providerName}>{item.name}</Text>
          </View>
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={styles.iconButton} 
            onPress={() => handleEdit(item.id)}
          >
            <Edit2 size={18} color={Colors.primary} variant="Linear" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.iconButton, styles.deleteBtn]} 
            onPress={() => handleDelete(item.id)}
          >
            <Trash size={18} color={Colors.danger} variant="Linear" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.cardDivider} />

      <View style={styles.cardFooter}>
        <View style={styles.infoRow}>
          <Location size={14} color={Colors.textSecondary} variant="Linear" />
          <Text style={styles.infoText}>{item.city}</Text>
        </View>
        <View style={styles.priceBadge}>
          <Text style={styles.priceBadgeText}>{item.price}€</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Gestion des Services</Text>
        <Text style={styles.subtitle}>{submissions.length} soumission(s) au total</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <SearchNormal1 size={18} color={Colors.textSecondary} />
          <TextInput 
            style={styles.searchInput}
            placeholder="Rechercher un nom, service ou ville..."
            value={search}
            onChangeText={setSearch}
            placeholderTextColor={Colors.textSecondary}
          />
        </View>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredSubmissions.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Aucun résultat trouvé</Text>
          </View>
        ) : (
          filteredSubmissions.map(sub => <AdminCard key={sub.id} item={sub} />)
        )}
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
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 2,
    fontWeight: '500',
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: Colors.text,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 0,
    gap: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E9ECEF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  serviceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F0F4FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
  },
  providerName: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontWeight: '500',
    marginTop: 1,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteBtn: {
    backgroundColor: '#FFF5F5',
  },
  cardDivider: {
    height: 1,
    backgroundColor: '#F1F3F5',
    marginVertical: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  infoText: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  priceBadge: {
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  priceBadgeText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.text,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    color: Colors.textSecondary,
    fontSize: 15,
    fontWeight: '500',
  },
});
