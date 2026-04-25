import React, { useState } from 'react';
import { ScrollView, StyleSheet, KeyboardAvoidingView, Platform, View, Text, TouchableOpacity } from 'react-native';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Colors } from '../../constants/Colors';
import { useAuthStore } from '../../store/authStore';
import { useDataStore } from '../../store/dataStore';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Briefcase, InfoCircle } from 'iconsax-react-native';
import { PROPOSALS } from '../../constants/Proposals';

export default function FormScreen() {
  const { user } = useAuthStore();
  const addSubmission = useDataStore(state => state.addSubmission);
  const router = useRouter();
  const params = useLocalSearchParams();

  const [name, setName] = useState(user?.name || '');
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');
  const [serviceType, setServiceType] = useState((params.serviceType as string) || '');
  const [description, setDescription] = useState((params.description as string) || '');
  const [price, setPrice] = useState((params.price as string) || '');
  const [totalAmount, setTotalAmount] = useState('');
  const [availableAmount, setAvailableAmount] = useState('');
  const [availability, setAvailability] = useState('');
  const [contact, setContact] = useState('');

  const fillProposal = (proposal: typeof PROPOSALS[0]) => {
    setServiceType(proposal.serviceType);
    setDescription(proposal.description);
    setPrice(proposal.price);
  };

  const calculateRemaining = () => {
    const total = parseFloat(totalAmount) || 0;
    const available = parseFloat(availableAmount) || 0;
    const remaining = total - available;
    return remaining > 0 ? remaining.toString() : '0';
  };

  const handleSubmit = () => {
    if (!name || !age || !city || !serviceType || !description || !price || !totalAmount || !availableAmount || !availability || !contact) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    addSubmission({
      providerId: user!.id,
      name,
      age,
      city,
      serviceType,
      description,
      price,
      totalAmountRetirement: totalAmount,
      availableAmount,
      remainingAmount: calculateRemaining(),
      availability,
      contact
    });

    router.replace('/(provider)');
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Briefcase size={22} color={Colors.primary} variant="Linear" />
            <Text style={styles.sectionTitle}>Type de service</Text>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.serviceTypes}>
            {PROPOSALS.map((p) => (
              <TouchableOpacity 
                key={p.serviceType}
                style={[
                  styles.serviceTypeButton,
                  serviceType === p.serviceType && styles.serviceTypeActive
                ]}
                onPress={() => setServiceType(p.serviceType)}
              >
                <Text style={[
                  styles.serviceTypeText,
                  serviceType === p.serviceType && styles.serviceTypeTextActive
                ]}>{p.serviceType}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <InfoCircle size={22} color={Colors.primary} variant="Linear" />
            <Text style={styles.sectionTitle}>Détails</Text>
          </View>

        <Input label="Nom" value={name} onChangeText={setName} />
        <Input label="Âge" value={age} onChangeText={setAge} keyboardType="numeric" />
        <Input label="Ville" value={city} onChangeText={setCity} />
        <Input label="Type de service" value={serviceType} onChangeText={setServiceType} placeholder="Ex: Bricolage, Informatique..." />
        <Input label="Description" value={description} onChangeText={setDescription} multiline />
        <Input label="Prix du service (€)" value={price} onChangeText={setPrice} keyboardType="numeric" />
        
        <Input label="Montant total retraite (€)" value={totalAmount} onChangeText={setTotalAmount} keyboardType="numeric" />
        <Input label="Montant disponible (€)" value={availableAmount} onChangeText={setAvailableAmount} keyboardType="numeric" />
        <Input label="Montant restant à payer (€)" value={calculateRemaining()} editable={false} />
        
        <Input label="Disponibilité" value={availability} onChangeText={setAvailability} placeholder="Ex: Week-ends, Soirées..." />
        <Input label="Contact (Email ou Tél)" value={contact} onChangeText={setContact} keyboardType="email-address" />

        <Button title="Soumettre le service" onPress={handleSubmit} style={{ marginTop: 20, marginBottom: 40 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: {
    padding: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.text,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 24,
  }
});
