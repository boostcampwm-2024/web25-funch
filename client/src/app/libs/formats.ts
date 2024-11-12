export const comma = (value: string | number) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
