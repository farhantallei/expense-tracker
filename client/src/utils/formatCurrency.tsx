function formatCurrency(number: number) {
  return new Intl.NumberFormat(undefined).format(number);
}

export default formatCurrency;
