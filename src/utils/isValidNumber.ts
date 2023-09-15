export const isValidNumber = (value: string): boolean => {
  return !!value.match(/^((0|([1-9][0-9]*))([.,][0-9]+)?)$/);
};
