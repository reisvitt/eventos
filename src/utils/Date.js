const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

export const getDay = (date) => {
  const temp = new Date(date);
  return temp.getUTCDate();
};

export const getMonthName = (date) => {
  const number = new Date(date).getMonth();
  return months[number];
};

export const getMonth = (date) => {
  return new Date(date).getMonth();
};

export const getYear = (date) => {
  return new Date(date).getFullYear();
};
