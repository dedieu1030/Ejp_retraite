import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '../../store/authStore';
import { useDataStore, Submission } from '../../store/dataStore';
import { Colors } from '../../constants/Colors';
import { useRouter } from 'expo-router';
import { User, Briefcase, Location, Trash } from 'iconsax-react-native';
import { PROPOSALS } from '../../constants/Proposals';

export default function ProviderSubmissionsScreen() {
  const { user } = useAuthStore();
  const { submissions, removeSubmission } = useDataStore();
  const router = useRouter();

  const mySubmissions = submissions.filter(sub => sub.providerId === user?.id);

  const onSelectProposal = (p: typeof PROPOSALS[0]) => {
    router.push({
      pathname: '/(provider)/create',
      params: { 
        serviceType: p.serviceType,
        description: p.description,
        price: p.price
      }
    });
  };

  const ServiceCard = ({ item }: { item: Submission }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.serviceTag}>
          <Briefcase size={18} color={Colors.primary} variant="Linear" />
          <Text style={styles.serviceTagText}>{item.serviceType}</Text>
        </View>
        <Text style={styles.priceText}>{item.price} €</Text>
      </View>

      <View style={styles.locationRow}>
        <Location size={18} color={Colors.textSecondary} variant="Linear" />
        <Text style={styles.locationText}>{item.city}</Text>
      </View>

      <Text style={styles.descriptionText} numberOfLines={2}>{item.description}</Text>

      <View style={styles.footer}>
        <View style={styles.statGroup}>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>Total</Text>
            <Text style={styles.statValue}>{item.totalAmountRetirement} €</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>Restant</Text>
            <Text style={[styles.statValue, { color: Colors.danger }]}>{item.remainingAmount} €</Text>
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.deleteButton} 
          onPress={() => removeSubmission(item.id)}
          activeOpacity={0.7}
        >
          <Trash size={22} color={Colors.danger} variant="Linear" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        
        {/* Fixed Header */}
        <View style={styles.header}>
          <Text style={styles.greetingText}>
            Bonjour, {user?.name || 'Utilisateur'}
          </Text>
          <TouchableOpacity 
            style={styles.avatarButton} 
            onPress={() => router.push('/(provider)/settings')}
          >
            <View style={styles.avatarContainer}>
              <User color={Colors.primary} size={24} variant="Linear" />
            </View>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Que voulez-vous proposer ?</Text>
            
            <View style={styles.proposalsList}>
              {PROPOSALS.map((p, i) => (
                <TouchableOpacity 
                  key={i} 
                  style={styles.proposalCardContainer}
                  activeOpacity={0.9}
                  onPress={() => onSelectProposal(p)}
                >
                  <View style={styles.proposalRow}>
                    <Image source={p.image} style={styles.proposalImage} />
                    
                    <View style={styles.proposalRightBlock}>
                      <View style={styles.proposalTitleRow}>
                        <Text style={styles.proposalTitle} numberOfLines={1}>{p.title}</Text>
                        <Text style={styles.proposalPrice}>{p.price}€/h</Text>
                      </View>
                      
                      <Text style={styles.proposalDescText} numberOfLines={2}>{p.description}</Text>
                      
                      <View style={styles.proposalActionButton}>
                        <Text style={styles.proposalActionText}>Proposer</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

        </ScrollView>

        <TouchableOpacity 
          style={styles.fab} 
          onPress={() => router.push('/(provider)/create')}
          activeOpacity={0.8}
        >
          <Add color="#fff" size={32} variant="Linear" />
        </TouchableOpacity>
      </View>
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
  },
  content: {
    padding: 24,
    gap: 32,
    paddingBottom: 100,
    paddingTop: 32, // More space after header
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 4, // Higher up
    paddingBottom: 8,
  },
  greetingText: {
    fontSize: 26,
    fontWeight: '700',
    color: '#000',
    letterSpacing: -0.5, // Make it more compact
  },
  avatarButton: {
    padding: 2,
  },
  avatarContainer: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#F2F5FA',
    borderWidth: 1,
    borderColor: '#E1E8F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    gap: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#000',
  },
  proposalsList: {
    gap: 12,
  },
  proposalCardContainer: {
    backgroundColor: '#F2F5FA', // More visible light blue-gray
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E1E8F5',
  },
  proposalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  proposalImage: {
    width: 100,
    height: 100,
    borderRadius: 16,
    backgroundColor: '#E1E8F5',
  },
  proposalRightBlock: {
    flex: 1,
    height: 100,
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  proposalTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  proposalTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#000',
    flex: 1,
  },
  proposalPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.primary,
  },
  proposalDescText: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  proposalActionButton: {
    alignSelf: 'flex-end',
    backgroundColor: '#000',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 8,
  },
  proposalActionText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '700',
  },
  emptyContainer: {
    paddingVertical: 24,
    alignItems: 'center',
  },
  emptySubtitle: {
    fontSize: 15,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
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
    marginBottom: 16,
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
    backgroundColor: 'rgba(0, 82, 255, 0.08)',
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
  statGroup: {
    flexDirection: 'row',
    gap: 24,
  },
  stat: {
    gap: 2,
  },
  statLabel: {
    fontSize: 11,
    color: Colors.textSecondary,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.text,
  },
  deleteButton: {
    padding: 10,
    backgroundColor: 'rgba(255, 59, 48, 0.08)',
    borderRadius: 14,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
});
