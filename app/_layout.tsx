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

    // We only need manual redirection for LOGIN or STARTUP (if already logged in)
    // LOGOUT is handled automatically by the Stack re-rendering and removing protected routes
    if (user && (!segments[0] || segments[0] === 'index')) {
      const target = user.role === 'Admin' ? '/(admin)' : user.role === 'Client' ? '/(client)' : '/(provider)';
      router.replace(target as any);
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
