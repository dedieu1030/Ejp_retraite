import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, KeyboardAvoidingView, Platform, Text } from 'react-native';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Colors } from '../../constants/Colors';
import { useDataStore } from '../../store/dataStore';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function AdminEditScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { submissions, updateSubmission } = useDataStore();
  const router = useRouter();

  const submission = submissions.find(s => s.id === id);

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [availableAmount, setAvailableAmount] = useState('');
  const [availability, setAvailability] = useState('');
  const [contact, setContact] = useState('');

  useEffect(() => {
    if (submission) {
      setName(submission.name);
      setAge(submission.age);
      setCity(submission.city);
      setServiceType(submission.serviceType);
      setDescription(submission.description);
      setPrice(submission.price);
      setTotalAmount(submission.totalAmountRetirement);
      setAvailableAmount(submission.availableAmount);
      setAvailability(submission.availability);
      setContact(submission.contact);
    }
  }, [submission]);

  const calculateRemaining = () => {
    const total = parseFloat(totalAmount) || 0;
    const available = parseFloat(availableAmount) || 0;
    const remaining = total - available;
    return remaining > 0 ? remaining.toString() : '0';
  };

  const handleUpdate = () => {
    if (!submission) return;

    updateSubmission(submission.id, {
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

    router.back();
  };

  if (!submission) {
    return <Text style={styles.error}>Soumission introuvable.</Text>;
  }

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Modifier la soumission</Text>
        <Input label="Nom" value={name} onChangeText={setName} />
        <Input label="Âge" value={age} onChangeText={setAge} keyboardType="numeric" />
        <Input label="Ville" value={city} onChangeText={setCity} />
        <Input label="Type de service" value={serviceType} onChangeText={setServiceType} />
        <Input label="Description" value={description} onChangeText={setDescription} multiline />
        <Input label="Prix du service (€)" value={price} onChangeText={setPrice} keyboardType="numeric" />
        <Input label="Montant total retraite (€)" value={totalAmount} onChangeText={setTotalAmount} keyboardType="numeric" />
        <Input label="Montant disponible (€)" value={availableAmount} onChangeText={setAvailableAmount} keyboardType="numeric" />
        <Input label="Montant restant à payer (€)" value={calculateRemaining()} editable={false} />
        <Input label="Disponibilité" value={availability} onChangeText={setAvailability} />
        <Input label="Contact (Email ou Tél)" value={contact} onChangeText={setContact} />

        <Button title="Enregistrer les modifications" onPress={handleUpdate} style={{ marginTop: 20, marginBottom: 40 }} />
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
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 20,
  },
  error: {
    padding: 20,
    color: Colors.danger,
    textAlign: 'center',
  }
});
