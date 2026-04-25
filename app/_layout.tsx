import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useAuthStore } from '../store/authStore';
import { useEffect } from 'react';
import { useRouter, useSegments, useRootNavigationState } from 'expo-router';

export default function RootLayout() {
  const { user } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();
  const navigationState = useRootNavigationState();

  useEffect(() => {
    if (!navigationState?.key) return;

    const inAuthGroup = segments[0] === '(admin)' || segments[0] === '(client)' || segments[0] === '(provider)';

    // Use a small timeout to ensure the layout is fully mounted before navigating
    const timer = setTimeout(() => {
      if (!user && inAuthGroup) {
        router.replace('/');
      } else if (user) {
        if (!segments[0] || segments[0] === 'index') {
          if (user.role === 'Admin') router.replace('/(admin)');
          else if (user.role === 'Client') router.replace('/(client)');
          else if (user.role === 'Provider') router.replace('/(provider)');
        }
      }
    }, 1);

    return () => clearTimeout(timer);
  }, [user, segments, navigationState?.key]);

  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(provider)" />
        <Stack.Screen name="(client)" />
        <Stack.Screen name="(admin)" />
      </Stack>
    </>
  );
}
