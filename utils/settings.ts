export const multiLineTextToArray = (value?: string) => {
  if (!value) return [];

  const splittedValues = value.split("\n");
  const sanitizedValues = splittedValues.map((value) => value.trim());

  return sanitizedValues;
};
