import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, KeyboardAvoidingView, Platform, View, Text, TouchableOpacity, Modal } from 'react-native';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { Colors } from '../constants/Colors';
import { useAuthStore } from '../store/authStore';
import { useDataStore } from '../store/dataStore';
import { Briefcase, InfoCircle, CloseCircle } from 'iconsax-react-native';
import { PROPOSALS } from '../constants/Proposals';

interface CreateServiceModalProps {
  visible: boolean;
  onClose: () => void;
  initialServiceType?: string;
  initialDescription?: string;
  initialPrice?: string;
}

export default function CreateServiceModal({ visible, onClose, initialServiceType, initialDescription, initialPrice }: CreateServiceModalProps) {
  const { user } = useAuthStore();
  const addSubmission = useDataStore(state => state.addSubmission);

  const [name, setName] = useState(user?.name || '');
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');
  const [serviceType, setServiceType] = useState(initialServiceType || '');
  const [description, setDescription] = useState(initialDescription || '');
  const [price, setPrice] = useState(initialPrice || '');
  const [totalAmount, setTotalAmount] = useState('');
  const [availableAmount, setAvailableAmount] = useState('');
  const [availability, setAvailability] = useState('');
  const [contact, setContact] = useState('');

  // Reset form when opened with new initials
  useEffect(() => {
    if (visible) {
      setServiceType(initialServiceType || '');
      setDescription(initialDescription || '');
      setPrice(initialPrice || '');
    }
  }, [visible, initialServiceType, initialDescription, initialPrice]);

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

    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Nouveau Service</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <CloseCircle size={28} color={Colors.textSecondary} variant="Linear" />
          </TouchableOpacity>
        </View>

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
                  onPress={() => {
                    setServiceType(p.serviceType);
                    setDescription(p.description);
                    setPrice(p.price);
                  }}
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
          </View>

          <Button title="Soumettre le service" onPress={handleSubmit} style={{ marginTop: 20, marginBottom: 40 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 20 : 40,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
  },
  closeBtn: {
    padding: 4,
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
  section: {
    marginBottom: 24,
  },
  serviceTypes: {
    paddingBottom: 8,
    gap: 12,
  },
  serviceTypeButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#F2F5FA',
    borderWidth: 1,
    borderColor: '#E1E8F5',
    marginRight: 12,
  },
  serviceTypeActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  serviceTypeText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  serviceTypeTextActive: {
    color: '#fff',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 24,
  }
});
