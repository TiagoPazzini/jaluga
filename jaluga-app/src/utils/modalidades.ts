import type { Modalidade } from '../types';

export function textoModalidades(modalidades: Modalidade[]): string {
  if (modalidades.includes('entrega') && modalidades.includes('retirada')) return 'Entrega ou retirada';
  return modalidades.includes('entrega') ? 'Só entrega' : 'Só retirada';
}
