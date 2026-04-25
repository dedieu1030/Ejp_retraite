import { Tabs } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { Setting2, ClipboardList, AddSquare } from 'iconsax-react-native';

export default function ProviderLayout() {
  return (
    <Tabs 
      screenOptions={{ 
        tabBarActiveTintColor: Colors.primary,
        headerShown: false,
      }}>
      <Tabs.Screen 
        name="index" 
        options={{
          title: 'Mes Services',
          tabBarIcon: ({ color }) => <ClipboardList color={color} size={24} variant="Linear" />,
        }} 
      />
      <Tabs.Screen 
        name="create" 
        options={{
          title: 'Nouveau',
          tabBarIcon: ({ color }) => <AddSquare color={color} size={24} variant="Linear" />,
        }} 
      />
      <Tabs.Screen 
        name="settings" 
        options={{
          title: 'Paramètres',
          tabBarIcon: ({ color }) => <Setting2 color={color} size={24} variant="Linear" />,
        }} 
      />
    </Tabs>
  );
}
