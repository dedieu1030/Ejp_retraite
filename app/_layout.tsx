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

    if (!user && inAuthGroup) {
      // Only redirect to login if we are currently in a protected group
      router.replace('/');
    } else if (user && (!segments[0] || segments[0] === 'index')) {
      // Only redirect to dashboard if we are at the login screen
      if (user.role === 'Admin') router.replace('/(admin)');
      else if (user.role === 'Client') router.replace('/(client)');
      else if (user.role === 'Provider') router.replace('/(provider)');
    }
  }, [user, segments[0], navigationState?.key]);

  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        {!user ? (
          <Stack.Screen name="index" />
        ) : (
          <>
            {user.role === 'Provider' && <Stack.Screen name="(provider)" />}
            {user.role === 'Client' && <Stack.Screen name="(client)" />}
            {user.role === 'Admin' && <Stack.Screen name="(admin)" />}
          </>
        )}
      </Stack>
    </>
  );
}
