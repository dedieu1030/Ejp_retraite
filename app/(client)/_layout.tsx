import { Tabs } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { Settings, LayoutGrid } from 'lucide-react-native';

export default function ClientLayout() {
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
          title: 'Services', 
          tabBarIcon: ({ color }) => <LayoutGrid color={color} size={24} /> 
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
