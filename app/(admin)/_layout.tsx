import { Tabs } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { Settings, Users, ShieldAlert } from 'lucide-react-native';

export default function AdminLayout() {
  return (
    <Tabs 
      screenOptions={{ 
        tabBarActiveTintColor: Colors.primary,
        headerStyle: { backgroundColor: Colors.background },
        headerShadowVisible: false,
        tabBarStyle: { borderTopWidth: 1, borderTopColor: Colors.border, backgroundColor: Colors.background }
      }}
    >
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: 'Gestion', 
          tabBarIcon: ({ color }) => <ShieldAlert color={color} size={24} /> 
        }} 
      />
      <Tabs.Screen 
        name="edit" 
        options={{ 
          href: null // Hide from tab bar
        }} 
      />
      <Tabs.Screen 
        name="users" 
        options={{ 
          title: 'Utilisateurs', 
          tabBarIcon: ({ color }) => <Users color={color} size={24} /> 
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
