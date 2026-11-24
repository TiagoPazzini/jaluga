// Só formata número em texto. Não calcula nada.
export function formatBRL(valor: number): string {
  const [inteiro, centavos] = Math.abs(valor).toFixed(2).split('.');
  const comMilhar = inteiro.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${valor < 0 ? '-' : ''}R$ ${comMilhar},${centavos}`;
}
