import { Text, View } from 'react-native';
import { formatBRL } from '../utils/formatBRL';

interface ResumoLinhaProps {
  rotulo: string;
  valor: number;
  destaque?: boolean;
  observacao?: string;
}

// Linha de resumo de valores. Só exibe, não calcula.
export function ResumoLinha({ rotulo, valor, destaque = false, observacao }: ResumoLinhaProps) {
  return (
    <View className={`flex-row items-start justify-between py-2 ${destaque ? 'border-t border-border pt-3' : ''}`}>
      <View className="flex-1 pr-3">
        <Text className={destaque ? 'font-body-semibold text-body-16 text-primary-900' : 'font-body text-body-14 text-primary-900'}>
          {rotulo}
        </Text>
        {observacao ? <Text className="font-body text-body-12 text-text-muted">{observacao}</Text> : null}
      </View>
      <Text className={destaque ? 'font-title-xbold text-title-20 text-primary-900' : 'font-body-semibold text-body-14 text-primary-900'}>
        {formatBRL(valor)}
      </Text>
    </View>
  );
}
