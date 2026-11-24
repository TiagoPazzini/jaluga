export type CategoriaId =
  | 'ferramentas'
  | 'festas'
  | 'viagem'
  | 'bebe'
  | 'mudanca'
  | 'tecnologia'
  | 'saude'
  | 'ocasioes'
  | 'outros';

export interface Categoria {
  id: CategoriaId;
  nome: string;
}

export type Bairro =
  | 'Centro'
  | 'Mogilar'
  | 'Vila Oliveira'
  | 'Braz Cubas'
  | 'César de Souza'
  | 'Socorro';

export type IconeItem =
  | 'furadeira'
  | 'som'
  | 'mala'
  | 'cadeirinha'
  | 'barraca'
  | 'lavadora'
  | 'projetor'
  | 'generico';

export interface Usuario {
  id: string;
  nome: string;
  bairro: Bairro;
  nota: number;
  totalAlugueis: number;
  verificado: boolean;
}

export type StatusPedido = 'aberto' | 'aguardando_pagamento';

export interface Pedido {
  id: string;
  donoId: string;
  titulo: string;
  categoriaId: CategoriaId;
  descricao: string;
  bairro: Bairro;
  distanciaKm: number;
  raioKm: number;
  inicio: string; // texto de exibição
  fim: string; // texto de exibição
  status: StatusPedido;
  icone: IconeItem;
  fotos?: string[];
}

export type Porte = 'P' | 'M' | 'G';
export type Modalidade = 'entrega' | 'retirada';

export interface Oferta {
  id: string;
  pedidoId: string;
  ofertanteId: string;
  nomeItem: string;
  icone: IconeItem;
  porte: Porte;
  conservacao: string;
  mensagem: string;
  distanciaKm: number;
  precoTotal: number; // fixo no mock
  precoPorDia: number; // fixo no mock
  modalidades: Modalidade[];
}

export interface ResumoOferta {
  precoAluguel: number;
  taxaServico: number;
  caucao: number;
  voceRecebe: number;
}

export type ListaEstado = 'dados' | 'vazio' | 'carregando';

export type StatusBadgeTipo =
  | 'aberto'
  | 'enviada'
  | 'aguardando_pagamento'
  | 'confirmado'
  | 'em_uso'
  | 'concluido'
  | 'atrasado'
  | 'disputa'
  | 'cancelado';
