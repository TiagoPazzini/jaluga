import { create } from 'zustand';
import type { ListaEstado } from '../types';

interface ListaEstadoState {
  estado: ListaEstado;
  setEstado: (estado: ListaEstado) => void;
}

// Modo de teste das listas: dados, vazio ou carregando.
export const useListaEstadoStore = create<ListaEstadoState>((set) => ({
  estado: 'dados',
  setEstado: (estado) => set({ estado }),
}));
