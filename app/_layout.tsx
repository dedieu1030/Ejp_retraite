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

    if (!user) {
      // If no user, we must be at the root (index.tsx)
      // If segments[0] is present, we are currently in a protected group, so redirect to root
      if (segments[0]) {
        router.replace('/');
      }
    } else {
      // If user is logged in and at the root/login screen, redirect them to their dashboard
      if (!segments[0] || segments[0] === 'index') {
        const target = user.role === 'Admin' ? '/(admin)' : user.role === 'Client' ? '/(client)' : '/(provider)';
        router.replace(target as any);
      }
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
