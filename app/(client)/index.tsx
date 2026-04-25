import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image, Platform } from 'react-native';
import { useDataStore, Submission } from '../../store/dataStore';
import { Colors } from '../../constants/Colors';
import { Button } from '../../components/ui/Button';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { SearchNormal1, Location, Briefcase, ExportCurve, Filter } from 'iconsax-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const serviceImages: Record<string, any> = {
  'Jardinage': require('../../assets/proposals/jardinage.png'),
  'Ménage': require('../../assets/proposals/menage.png'),
  'Informatique': require('../../assets/proposals/informatique.png'),
  'Courses': require('../../assets/proposals/courses.png'),
};

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
      const escape = (str: string) => `"${(str || '').replace(/"/g, '""')}"`;
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
      const fileUri = FileSystem.documentDirectory + 'retraite_services.csv';
      await FileSystem.writeAsStringAsync(fileUri, header + csvData, { encoding: FileSystem.EncodingType.UTF8 });
      
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri);
      } else {
        alert('Le partage n\'est pas disponible sur cet appareil');
      }
    } catch (e) {
      alert('Erreur lors de l\'exportation CSV');
    }
  };

  const ServiceCard = ({ item }: { item: Submission }) => (
    <View style={styles.card}>
      <Image 
        source={serviceImages[item.serviceType] || serviceImages['Courses']} 
        style={styles.cardImage}
      />
      <View style={styles.cardBody}>
        <View style={styles.cardHeader}>
          <View style={styles.serviceTag}>
            <Briefcase size={14} color={Colors.primary} variant="Bold" />
            <Text style={styles.serviceTagText}>{item.serviceType}</Text>
          </View>
          <Text style={styles.priceText}>{item.price}€</Text>
        </View>
        
        <Text style={styles.providerName}>{item.name}, {item.age} ans</Text>
        
        <View style={styles.locationRow}>
          <Location size={14} color={Colors.textSecondary} variant="Linear" />
          <Text style={styles.locationText}>{item.city}</Text>
        </View>

        <Text style={styles.descriptionText} numberOfLines={2}>{item.description}</Text>

        <View style={styles.footer}>
          <View style={styles.retirementBox}>
            <Text style={styles.retirementLabel}>Aide retraite</Text>
            <Text style={styles.remainingValue}>{item.remainingAmount}€</Text>
          </View>
          <TouchableOpacity style={styles.contactButton} activeOpacity={0.8}>
            <Text style={styles.contactButtonText}>Contacter</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.mainHeader}>
        <Text style={styles.title}>Services disponibles</Text>
        <TouchableOpacity style={styles.exportButton} onPress={exportToCSV}>
          <ExportCurve size={20} color={Colors.primary} variant="Bold" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchSection}>
        <View style={styles.searchBar}>
          <SearchNormal1 size={18} color={Colors.textSecondary} variant="Linear" />
          <TextInput 
            style={styles.searchInput} 
            placeholder="Rechercher une ville ou un service..." 
            value={filterCity || filterService}
            onChangeText={(text) => {
              // Simple unified search for better UX
              setFilterCity(text);
              setFilterService(text);
            }}
            placeholderTextColor={Colors.textSecondary}
          />
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={18} color={Colors.primary} variant="Bold" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredSubmissions.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Aucun service trouvé</Text>
          </View>
        ) : (
          filteredSubmissions.map(sub => <ServiceCard key={sub.id} item={sub} />)
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FE',
  },
  mainHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.text,
    letterSpacing: -0.5,
  },
  searchSection: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 56,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: Colors.text,
    fontWeight: '500',
  },
  filterButton: {
    backgroundColor: '#F0F4FF',
    padding: 8,
    borderRadius: 10,
  },
  exportButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 0,
    gap: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  cardImage: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  cardBody: {
    padding: 20,
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
    backgroundColor: '#F0F4FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    gap: 6,
  },
  serviceTagText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.primary,
  },
  priceText: {
    fontSize: 22,
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
    gap: 6,
    marginBottom: 12,
  },
  locationText: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  descriptionText: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 16,
  },
  retirementBox: {
    flex: 1,
  },
  retirementLabel: {
    fontSize: 11,
    color: Colors.textSecondary,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  remainingValue: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.danger,
  },
  contactButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 14,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  contactButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
  emptyContainer: {
    padding: 60,
    alignItems: 'center',
  },
  emptyText: {
    color: Colors.textSecondary,
    fontSize: 16,
    fontWeight: '500',
  },
});
