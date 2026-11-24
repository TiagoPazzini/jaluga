import '../global.css';

import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { cores } from '../src/theme/colors';
import { fontesDoApp } from '../src/theme/fonts';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontesProntas, erro] = useFonts(fontesDoApp);

  useEffect(() => {
    if (fontesProntas || erro) SplashScreen.hideAsync();
  }, [fontesProntas, erro]);

  // Mantém a tela de abertura até as fontes carregarem.
  if (!fontesProntas && !erro) return null;

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: cores.primary50 } }}>
        <Stack.Screen name="pedido/publicado" options={{ gestureEnabled: false }} />
        <Stack.Screen name="oferta/enviada" options={{ gestureEnabled: false }} />
      </Stack>
    </SafeAreaProvider>
  );
}
