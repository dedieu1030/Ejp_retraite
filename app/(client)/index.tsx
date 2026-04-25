import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { useDataStore, Submission } from '../../store/dataStore';
import { Colors } from '../../constants/Colors';
import { Button } from '../../components/ui/Button';
import { File, Paths } from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Search, MapPin, Briefcase, Download } from 'lucide-react-native';

export default function ClientServicesScreen() {
  const { submissions } = useDataStore();
  const [filterCity, setFilterCity] = useState('');
  const [filterService, setFilterService] = useState('');

  const filteredSubmissions = submissions.filter(sub => {
    const matchCity = sub.city.toLowerCase().includes(filterCity.toLowerCase());
    const matchService = sub.serviceType.toLowerCase().includes(filterService.toLowerCase());
    return matchCity && matchService;
  });

  const exportToCSV = async () => {
    const header = 'Nom,Âge,Ville,Service,Description,Prix,Montant total,Montant disponible,Montant restant,Disponibilité,Contact\n';
    const csvData = filteredSubmissions.map(sub => {
      const escape = (str: string) => `"${str.replace(/"/g, '""')}"`;
      return [
        escape(sub.name),
        escape(sub.age),
        escape(sub.city),
        escape(sub.serviceType),
        escape(sub.description),
        escape(sub.price),
        escape(sub.totalAmountRetirement),
        escape(sub.availableAmount),
        escape(sub.remainingAmount),
        escape(sub.availability),
        escape(sub.contact),
      ].join(',');
    }).join('\n');
    
    try {
      const file = new File(Paths.document, 'retraite_services.csv');
      file.write(header + csvData);
      
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(file.uri);
      } else {
        alert('Le partage n\'est pas disponible sur cet appareil');
      }
    } catch (e) {
      alert('Erreur lors de l\'exportation CSV');
    }
  };

  const ServiceCard = ({ item }: { item: Submission }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.serviceTag}>
          <Briefcase size={14} color={Colors.primary} />
          <Text style={styles.serviceTagText}>{item.serviceType}</Text>
        </View>
        <Text style={styles.priceText}>{item.price} €</Text>
      </View>
      
      <Text style={styles.providerName}>{item.name}, {item.age} ans</Text>
      
      <View style={styles.locationRow}>
        <MapPin size={14} color={Colors.textSecondary} />
        <Text style={styles.locationText}>{item.city}</Text>
      </View>

      <Text style={styles.descriptionText} numberOfLines={3}>{item.description}</Text>

      <View style={styles.footer}>
        <View style={styles.retirementBox}>
          <Text style={styles.retirementLabel}>Reste à financer</Text>
          <Text style={styles.remainingValue}>{item.remainingAmount} €</Text>
        </View>
        <TouchableOpacity style={styles.contactButton} activeOpacity={0.7}>
          <Text style={styles.contactButtonText}>Contacter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <View style={styles.searchInputWrapper}>
            <Search size={18} color={Colors.textSecondary} style={styles.searchIcon} />
            <TextInput 
              style={styles.searchInput} 
              placeholder="Ville..." 
              value={filterCity}
              onChangeText={setFilterCity}
              placeholderTextColor={Colors.textSecondary}
            />
          </View>
          <View style={styles.searchInputWrapper}>
            <Briefcase size={18} color={Colors.textSecondary} style={styles.searchIcon} />
            <TextInput 
              style={styles.searchInput} 
              placeholder="Service..." 
              value={filterService}
              onChangeText={setFilterService}
              placeholderTextColor={Colors.textSecondary}
            />
          </View>
        </View>
        
        <TouchableOpacity style={styles.exportButton} onPress={exportToCSV}>
          <Download size={20} color={Colors.primary} />
          <Text style={styles.exportText}>CSV</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {filteredSubmissions.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Aucun service trouvé</Text>
          </View>
        ) : (
          filteredSubmissions.map(sub => <ServiceCard key={sub.id} item={sub} />)
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
  header: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  searchContainer: {
    flex: 1,
    gap: 8,
  },
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: 12,
    height: 44,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: Colors.text,
  },
  exportButton: {
    backgroundColor: Colors.card,
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  exportText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.primary,
  },
  scrollContent: {
    padding: 16,
    gap: 16,
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E1E8F5',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 6,
  },
  serviceTagText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
  },
  priceText: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.text,
  },
  providerName: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 12,
  },
  locationText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  descriptionText: {
    fontSize: 15,
    color: Colors.textSecondary,
    lineHeight: 22,
    marginBottom: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 16,
  },
  retirementBox: {
    flex: 1,
  },
  retirementLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  remainingValue: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.danger,
  },
  contactButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
  },
  contactButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    color: Colors.textSecondary,
    fontSize: 16,
  },
});
