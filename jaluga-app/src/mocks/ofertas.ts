import type { Oferta } from '../types';

// Valores escritos à mão. Nenhum é calculado.
export const ofertas: Oferta[] = [
  // Furadeira (3 ofertas)
  {
    id: 'o-fur-1', pedidoId: 'p-furadeira', ofertanteId: 'u-ana',
    nomeItem: 'Furadeira de impacto Bosch', icone: 'furadeira', porte: 'P',
    conservacao: 'Como nova', mensagem: 'Acompanha jogo de brocas para parede.',
    distanciaKm: 1.8, precoTotal: 25, precoPorDia: 25, modalidades: ['entrega', 'retirada'],
  },
  {
    id: 'o-fur-2', pedidoId: 'p-furadeira', ofertanteId: 'u-carlos',
    nomeItem: 'Furadeira e parafusadeira', icone: 'furadeira', porte: 'P',
    conservacao: 'Bom estado', mensagem: 'Bateria carregada, é só usar.',
    distanciaKm: 2.4, precoTotal: 18, precoPorDia: 18, modalidades: ['retirada'],
  },
  {
    id: 'o-fur-3', pedidoId: 'p-furadeira', ofertanteId: 'u-juliana',
    nomeItem: 'Furadeira Makita com maleta', icone: 'furadeira', porte: 'M',
    conservacao: 'Como nova', mensagem: 'Levo até você se precisar.',
    distanciaKm: 3.5, precoTotal: 30, precoPorDia: 30, modalidades: ['entrega'],
  },
  // Caixa de som (2 ofertas)
  {
    id: 'o-som-1', pedidoId: 'p-som', ofertanteId: 'u-beatriz',
    nomeItem: 'Caixa JBL PartyBox', icone: 'som', porte: 'M',
    conservacao: 'Como nova', mensagem: 'Tem luz colorida, a criançada adora.',
    distanciaKm: 4.1, precoTotal: 60, precoPorDia: 60, modalidades: ['entrega', 'retirada'],
  },
  {
    id: 'o-som-2', pedidoId: 'p-som', ofertanteId: 'u-rafael',
    nomeItem: 'Caixa de som bluetooth 100 W', icone: 'som', porte: 'M',
    conservacao: 'Bom estado', mensagem: 'Acompanha microfone sem fio.',
    distanciaKm: 3.2, precoTotal: 40, precoPorDia: 40, modalidades: ['retirada'],
  },
  // Mala (2 ofertas)
  {
    id: 'o-mala-1', pedidoId: 'p-mala', ofertanteId: 'u-ana',
    nomeItem: 'Mala grande de rodinhas', icone: 'mala', porte: 'G',
    conservacao: 'Bom estado', mensagem: 'Cabe tranquilo roupa para 15 dias.',
    distanciaKm: 1.8, precoTotal: 210, precoPorDia: 15, modalidades: ['entrega', 'retirada'],
  },
  {
    id: 'o-mala-2', pedidoId: 'p-mala', ofertanteId: 'u-juliana',
    nomeItem: 'Mala rígida 32 polegadas', icone: 'mala', porte: 'G',
    conservacao: 'Como nova', mensagem: 'Tem cadeado com senha.',
    distanciaKm: 3.5, precoTotal: 280, precoPorDia: 20, modalidades: ['retirada'],
  },
  // Cadeirinha (2 ofertas)
  {
    id: 'o-cad-1', pedidoId: 'p-cadeirinha', ofertanteId: 'u-beatriz',
    nomeItem: 'Cadeirinha de 9 a 36 kg', icone: 'cadeirinha', porte: 'M',
    conservacao: 'Como nova', mensagem: 'Higienizada e com manual.',
    distanciaKm: 2.9, precoTotal: 45, precoPorDia: 15, modalidades: ['entrega', 'retirada'],
  },
  {
    id: 'o-cad-2', pedidoId: 'p-cadeirinha', ofertanteId: 'u-juliana',
    nomeItem: 'Cadeirinha com Isofix', icone: 'cadeirinha', porte: 'M',
    conservacao: 'Bom estado', mensagem: 'Ajudo a instalar no carro.',
    distanciaKm: 1.2, precoTotal: 60, precoPorDia: 20, modalidades: ['retirada'],
  },
  // Barraca (2 ofertas)
  {
    id: 'o-bar-1', pedidoId: 'p-barraca', ofertanteId: 'u-tiago',
    nomeItem: 'Barraca para 4 pessoas', icone: 'barraca', porte: 'M',
    conservacao: 'Bom estado', mensagem: 'Usada só duas vezes.',
    distanciaKm: 2.4, precoTotal: 75, precoPorDia: 25, modalidades: ['retirada'],
  },
  {
    id: 'o-bar-2', pedidoId: 'p-barraca', ofertanteId: 'u-rafael',
    nomeItem: 'Barraca iglu 5 pessoas', icone: 'barraca', porte: 'G',
    conservacao: 'Com marcas de uso', mensagem: 'Vai com lona extra.',
    distanciaKm: 5.0, precoTotal: 66, precoPorDia: 22, modalidades: ['entrega', 'retirada'],
  },
  // Lavadora (2 ofertas)
  {
    id: 'o-lav-1', pedidoId: 'p-lavadora', ofertanteId: 'u-carlos',
    nomeItem: 'Lavadora Karcher K3', icone: 'lavadora', porte: 'M',
    conservacao: 'Bom estado', mensagem: 'Mangueira de 6 metros.',
    distanciaKm: 4.6, precoTotal: 35, precoPorDia: 35, modalidades: ['entrega'],
  },
  {
    id: 'o-lav-2', pedidoId: 'p-lavadora', ofertanteId: 'u-ana',
    nomeItem: 'Lavadora 1.800 libras', icone: 'lavadora', porte: 'M',
    conservacao: 'Como nova', mensagem: 'Acompanha bico turbo.',
    distanciaKm: 3.9, precoTotal: 40, precoPorDia: 40, modalidades: ['entrega', 'retirada'],
  },
  // Projetor (2 ofertas)
  {
    id: 'o-proj-1', pedidoId: 'p-projetor', ofertanteId: 'u-juliana',
    nomeItem: 'Projetor Full HD com tela', icone: 'projetor', porte: 'M',
    conservacao: 'Como nova', mensagem: 'Tela de 100 polegadas inclusa.',
    distanciaKm: 4.4, precoTotal: 80, precoPorDia: 80, modalidades: ['entrega', 'retirada'],
  },
  {
    id: 'o-proj-2', pedidoId: 'p-projetor', ofertanteId: 'u-beatriz',
    nomeItem: 'Projetor portátil HDMI', icone: 'projetor', porte: 'P',
    conservacao: 'Bom estado', mensagem: 'Cabo HDMI de 5 metros.',
    distanciaKm: 2.1, precoTotal: 50, precoPorDia: 50, modalidades: ['retirada'],
  },
];
