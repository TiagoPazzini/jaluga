import { Redirect } from 'expo-router';

// Só ocupa o lugar da aba central. O botão "+ Pedir" abre /pedido/novo.
export default function PedirAba() {
  return <Redirect href="/pedido/novo" />;
}
