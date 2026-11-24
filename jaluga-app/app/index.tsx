import { Redirect } from 'expo-router';

// Por enquanto o app abre direto nas abas.
// Quando o Onboarding e o login forem construídos, este redirect passa a apontar para eles.
export default function Index() {
  return <Redirect href="/inicio" />;
}
