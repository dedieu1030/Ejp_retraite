import { Tabs } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { Settings, List, PlusCircle } from 'lucide-react-native';

export default function ProviderLayout() {
  return (
    <Tabs 
      screenOptions={{ 
        tabBarActiveTintColor: Colors.primary,
        headerShown: false,
        tabBarStyle: { borderTopWidth: 1, borderTopColor: Colors.border, backgroundColor: Colors.background }
      }}
    >
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: 'Mes Services', 
          tabBarIcon: ({ color }) => <List color={color} size={24} /> 
        }} 
      />
      <Tabs.Screen 
        name="create" 
        options={{ 
          title: 'Nouveau Service',
          href: null, // Hide from tab bar
        }} 
      />
      <Tabs.Screen 
        name="settings" 
        options={{ 
          title: 'Paramètres', 
          tabBarIcon: ({ color }) => <Settings color={color} size={24} /> 
        }} 
      />
    </Tabs>
  );
}
