import type { Usuario } from '../types';

export const USUARIO_LOGADO_ID = 'u-tiago';

// Pessoas fictícias. Sem fotos de pessoas reais.
export const usuarios: Usuario[] = [
  { id: 'u-tiago', nome: 'Tiago M.', bairro: 'Centro', nota: 4.8, totalAlugueis: 12, verificado: true },
  { id: 'u-ana', nome: 'Ana P.', bairro: 'Mogilar', nota: 4.9, totalAlugueis: 23, verificado: true },
  { id: 'u-carlos', nome: 'Carlos R.', bairro: 'Vila Oliveira', nota: 4.6, totalAlugueis: 8, verificado: true },
  { id: 'u-beatriz', nome: 'Beatriz S.', bairro: 'Braz Cubas', nota: 5.0, totalAlugueis: 31, verificado: true },
  { id: 'u-rafael', nome: 'Rafael L.', bairro: 'César de Souza', nota: 4.4, totalAlugueis: 5, verificado: false },
  { id: 'u-juliana', nome: 'Juliana C.', bairro: 'Socorro', nota: 4.7, totalAlugueis: 17, verificado: true },
];
