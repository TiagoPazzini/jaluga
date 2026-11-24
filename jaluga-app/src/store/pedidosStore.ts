import { create } from 'zustand';
import { USUARIO_LOGADO_ID } from '../mocks/usuarios';
import type { Bairro, CategoriaId, Pedido } from '../types';
import { formatDataHora } from '../utils/formatData';

export interface RascunhoPedido {
  titulo: string;
  categoriaId: CategoriaId | null;
  descricao: string;
  fotos: string[];
  inicio: Date | null;
  fim: Date | null;
  bairro: Bairro | null;
  raioKm: number;
}

const rascunhoVazio: RascunhoPedido = {
  titulo: '',
  categoriaId: null,
  descricao: '',
  fotos: [],
  inicio: null,
  fim: null,
  bairro: null,
  raioKm: 5,
};

interface PedidosState {
  rascunho: RascunhoPedido;
  pedidosCriados: Pedido[];
  atualizarRascunho: (parcial: Partial<RascunhoPedido>) => void;
  publicarRascunho: () => string;
  limparRascunho: () => void;
}

let contador = 0;

// Só em memória: some quando o app fecha.
export const usePedidosStore = create<PedidosState>((set, get) => ({
  rascunho: rascunhoVazio,
  pedidosCriados: [],
  atualizarRascunho: (parcial) => set((s) => ({ rascunho: { ...s.rascunho, ...parcial } })),
  publicarRascunho: () => {
    const r = get().rascunho;
    contador += 1;
    const id = `novo-${contador}`;
    const pedido: Pedido = {
      id,
      donoId: USUARIO_LOGADO_ID,
      titulo: r.titulo.trim(),
      categoriaId: r.categoriaId ?? 'outros',
      descricao: r.descricao.trim(),
      bairro: r.bairro ?? 'Centro',
      distanciaKm: 0,
      raioKm: r.raioKm,
      inicio: r.inicio ? formatDataHora(r.inicio) : '',
      fim: r.fim ? formatDataHora(r.fim) : '',
      status: 'aberto',
      icone: 'generico',
      fotos: r.fotos,
    };
    set((s) => ({ pedidosCriados: [pedido, ...s.pedidosCriados], rascunho: rascunhoVazio }));
    return id;
  },
  limparRascunho: () => set({ rascunho: rascunhoVazio }),
}));
