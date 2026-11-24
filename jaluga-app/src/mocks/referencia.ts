import type { ResumoOferta } from '../types';

// Resumo fixo exibido na tela Enviar oferta. Valores só para exibição, sem cálculo.
// A taxa de serviço é paga pelo cliente (somada ao valor dele), por isso
// o ofertante recebe o valor do aluguel.
export const resumoOfertaReferencia: ResumoOferta = {
  precoAluguel: 40,
  taxaServico: 10,
  caucao: 40,
  voceRecebe: 40,
};

export const TEXTO_COMPARTILHAR =
  'Oi, vizinho! Publiquei um pedido no JALUGA e estou precisando de um item emprestado. ' +
  'Se você tiver, faça uma oferta pelo app. Você pede. O bairro oferta.';

export const opcoesConservacao = ['Novo', 'Como novo', 'Bom estado', 'Com marcas de uso'];

export const opcoesRaioKm = [1, 3, 5, 10];
