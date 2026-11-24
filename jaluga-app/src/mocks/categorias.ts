import type { Bairro, Categoria } from '../types';

export const categorias: Categoria[] = [
  { id: 'ferramentas', nome: 'Ferramentas e casa' },
  { id: 'festas', nome: 'Festas e eventos' },
  { id: 'viagem', nome: 'Viagem e lazer' },
  { id: 'bebe', nome: 'Bebê e família' },
  { id: 'mudanca', nome: 'Mudança e transporte' },
  { id: 'tecnologia', nome: 'Tecnologia e criação' },
  { id: 'saude', nome: 'Saúde e recuperação' },
  { id: 'ocasioes', nome: 'Ocasiões especiais' },
  { id: 'outros', nome: 'Outros' },
];

export const bairros: Bairro[] = [
  'Centro',
  'Mogilar',
  'Vila Oliveira',
  'Braz Cubas',
  'César de Souza',
  'Socorro',
];
