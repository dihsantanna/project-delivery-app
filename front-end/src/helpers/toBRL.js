export default (value) => (+value)
  .toLocaleString('pt-br', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
