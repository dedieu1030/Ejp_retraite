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

    // Small delay to ensure navigation is ready
    const timer = setTimeout(() => {
      if (!user) {
        // Always go to login if no user
        router.replace('/');
      } else {
        // If user is logged in and at the root/login screen, redirect them to their dashboard
        if (!segments[0] || segments[0] === 'index') {
          if (user.role === 'Admin') router.replace('/(admin)');
          else if (user.role === 'Client') router.replace('/(client)');
          else if (user.role === 'Provider') router.replace('/(provider)');
        }
      }
    }, 10);

    return () => clearTimeout(timer);
  }, [user, segments[0], navigationState?.key]);

  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        {user?.role === 'Provider' && <Stack.Screen name="(provider)" />}
        {user?.role === 'Client' && <Stack.Screen name="(client)" />}
        {user?.role === 'Admin' && <Stack.Screen name="(admin)" />}
      </Stack>
    </>
  );
}
