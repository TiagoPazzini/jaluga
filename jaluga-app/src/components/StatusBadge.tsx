import { Text, View } from 'react-native';
import type { StatusBadgeTipo } from '../types';

interface StatusBadgeProps {
  status: StatusBadgeTipo;
  rotulo?: string;
}

const config: Record<StatusBadgeTipo, { fundo: string; texto: string; rotulo: string }> = {
  aberto: { fundo: 'bg-primary-100', texto: 'text-primary-900', rotulo: 'Aberto' },
  enviada: { fundo: 'bg-primary-100', texto: 'text-primary-900', rotulo: 'Enviada' },
  aguardando_pagamento: { fundo: 'bg-accent-400', texto: 'text-primary-900', rotulo: 'Aguardando pagamento' },
  confirmado: { fundo: 'bg-primary-600', texto: 'text-white', rotulo: 'Confirmado' },
  em_uso: { fundo: 'bg-primary-600', texto: 'text-white', rotulo: 'Em uso' },
  concluido: { fundo: 'bg-success', texto: 'text-white', rotulo: 'Concluído' },
  atrasado: { fundo: 'bg-danger', texto: 'text-white', rotulo: 'Atrasado' },
  disputa: { fundo: 'bg-danger', texto: 'text-white', rotulo: 'Em disputa' },
  cancelado: { fundo: 'bg-danger', texto: 'text-white', rotulo: 'Cancelado' },
};

export function StatusBadge({ status, rotulo }: StatusBadgeProps) {
  const c = config[status];
  return (
    <View className={`self-start rounded-pill px-3 py-1 ${c.fundo}`}>
      <Text className={`font-body-semibold text-body-12 ${c.texto}`}>{rotulo ?? c.rotulo}</Text>
    </View>
  );
}
