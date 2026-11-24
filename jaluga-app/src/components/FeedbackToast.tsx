import { Info } from 'lucide-react-native';
import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { cores } from '../theme/colors';

interface FeedbackToastProps {
  mensagem: string;
  visivel: boolean;
  onFechar: () => void;
}

// Aviso curto no topo do rodapé. Some sozinho.
export function FeedbackToast({ mensagem, visivel, onFechar }: FeedbackToastProps) {
  useEffect(() => {
    if (!visivel) return;
    const t = setTimeout(onFechar, 2800);
    return () => clearTimeout(t);
  }, [visivel, onFechar]);

  if (!visivel) return null;
  return (
    <View
      className="absolute bottom-24 left-4 right-4 flex-row items-center gap-2 rounded-card bg-primary-900 px-4 py-3"
      accessibilityLiveRegion="polite"
      accessibilityRole="alert"
    >
      <Info size={20} color={cores.accent400} />
      <Text className="flex-1 font-body-medium text-body-14 text-white">{mensagem}</Text>
    </View>
  );
}
