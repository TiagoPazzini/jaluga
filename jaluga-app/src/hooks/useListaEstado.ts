import { useListaEstadoStore } from '../store/listaEstadoStore';
import type { ListaEstado } from '../types';

export function useListaEstado(): ListaEstado {
  return useListaEstadoStore((s) => s.estado);
}
