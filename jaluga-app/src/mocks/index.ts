import type { Oferta, Pedido, Usuario } from '../types';
import { categorias } from './categorias';
import { ofertas } from './ofertas';
import { pedidos } from './pedidos';
import { USUARIO_LOGADO_ID, usuarios } from './usuarios';

export * from './categorias';
export * from './ofertas';
export * from './pedidos';
export * from './referencia';
export * from './usuarios';

// Buscas simples. Só find e filter, sem regras.
export function getUsuario(id: string): Usuario | undefined {
  return usuarios.find((u) => u.id === id);
}

export function getPedidoMock(id: string): Pedido | undefined {
  return pedidos.find((p) => p.id === id);
}

export function getOfertasDoPedido(pedidoId: string): Oferta[] {
  return ofertas.filter((o) => o.pedidoId === pedidoId);
}

export function getMeusPedidosMock(): Pedido[] {
  return pedidos.filter((p) => p.donoId === USUARIO_LOGADO_ID);
}

export function getPedidosDeVizinhos(): Pedido[] {
  return pedidos.filter((p) => p.donoId !== USUARIO_LOGADO_ID);
}

export function getNomeCategoria(id: string): string {
  return categorias.find((c) => c.id === id)?.nome ?? 'Outros';
}
