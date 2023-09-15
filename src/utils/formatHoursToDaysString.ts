export const formatHoursToDaysString = (numberOfHours: number): string => {
  const days = Math.floor(numberOfHours / 24);
  const remainder = numberOfHours % 24;

  return days === 0 && remainder > 0 ? `<1d` : days ? `${days}d` : '';
};
