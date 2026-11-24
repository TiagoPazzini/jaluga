import { Fragment, type ReactNode } from 'react';
import { View } from 'react-native';
import type { ListaEstado } from '../types';
import { EmptyState, type EmptyStateProps } from './EmptyState';
import { SkeletonCard } from './SkeletonCard';

interface ListaProps<T> {
  estado: ListaEstado;
  dados: T[];
  renderItem: (item: T) => ReactNode;
  keyExtractor: (item: T) => string;
  vazio: EmptyStateProps;
  skeletonCount?: number;
}

// Aplica os três estados de lista: dados, vazio (com mascote) e carregando (skeleton).
export function Lista<T>({ estado, dados, renderItem, keyExtractor, vazio, skeletonCount = 3 }: ListaProps<T>) {
  if (estado === 'carregando') {
    return (
      <View>
        {Array.from({ length: skeletonCount }, (_, i) => (
          <SkeletonCard key={i} />
        ))}
      </View>
    );
  }
  if (estado === 'vazio' || dados.length === 0) {
    return <EmptyState {...vazio} />;
  }
  return (
    <View>
      {dados.map((item) => (
        <Fragment key={keyExtractor(item)}>{renderItem(item)}</Fragment>
      ))}
    </View>
  );
}
