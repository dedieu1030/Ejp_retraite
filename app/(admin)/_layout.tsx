import { Tabs } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { Setting2, ShieldTick, Profile2User } from 'iconsax-react-native';

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
          tabBarIcon: ({ color }) => <ShieldTick color={color} size={24} variant="Linear" /> 
        }} 
      />
      <Tabs.Screen 
        name="edit" 
        options={{ 
          title: 'Éditer', 
          href: null, 
        }} 
      />
      <Tabs.Screen 
        name="users" 
        options={{ 
          title: 'Utilisateurs', 
          tabBarIcon: ({ color }) => <Profile2User color={color} size={24} variant="Linear" /> 
        }} 
      />
      <Tabs.Screen 
        name="settings" 
        options={{ 
          title: 'Paramètres', 
          tabBarIcon: ({ color }) => <Setting2 color={color} size={24} variant="Linear" /> 
        }} 
      />
    </Tabs>
  );
}
