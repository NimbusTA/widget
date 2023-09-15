export const numberWithCommas = (
  x: number | string,
  decimalsCount = 0,
): string => {
  const xNumber = typeof x === 'string' ? parseFloat(x) : x;
  if (isNaN(xNumber)) return x.toString();

  return xNumber.toFixed(decimalsCount).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
