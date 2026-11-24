import { getPedidoMock } from '../mocks';
import { usePedidosStore } from '../store/pedidosStore';
import type { Pedido } from '../types';

// Procura primeiro nos pedidos criados em memória e depois nos mocks.
export function usePedido(id: string | undefined): Pedido | undefined {
  const criados = usePedidosStore((s) => s.pedidosCriados);
  if (!id) return undefined;
  return criados.find((p) => p.id === id) ?? getPedidoMock(id);
}
