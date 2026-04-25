import { Tabs } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { Setting2, Category } from 'iconsax-react-native';

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
          tabBarIcon: ({ color }) => <Category color={color} size={24} variant="Linear" /> 
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
