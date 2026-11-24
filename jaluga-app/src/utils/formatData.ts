const DIAS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

function doisDigitos(n: number): string {
  return n < 10 ? `0${n}` : `${n}`;
}

// Ex.: "Sáb, 29/11 · 08:00". Só formatação de exibição.
export function formatDataHora(data: Date): string {
  const dia = DIAS[data.getDay()];
  return `${dia}, ${doisDigitos(data.getDate())}/${doisDigitos(data.getMonth() + 1)} · ${doisDigitos(
    data.getHours(),
  )}:${doisDigitos(data.getMinutes())}`;
}
