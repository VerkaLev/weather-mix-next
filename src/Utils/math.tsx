export const sum = (arr: number[]): number =>
  arr.reduce((acc, value) => acc + value, 0);

export const roundedValue = (value: number | string) => {
  return typeof value === 'number' ? Math.round(value * 10) / 10 : '?';
};

export const averageValue = (arr: number[]) =>
  roundedValue(arr.length !== 0 ? sum(arr) / arr.length : '?');
