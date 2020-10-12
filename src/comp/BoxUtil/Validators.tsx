export const ValueMax = (value: string): string | undefined => {
  if (value && value.length > 15) return 'more then 15';

  return undefined;
};

export default ValueMax;
