type TOptions = Intl.NumberFormatOptions & {
  locale?: Intl.LocalesArgument;
};

const defaultOptions: TOptions = {
  locale: "en-US",
};

export const numberFormat = (value?: number, options?: TOptions) => {
  if (!value) return;

  const formatterOptions = Object.assign(defaultOptions, options);

  const formatter = new Intl.NumberFormat(
    formatterOptions.locale,
    formatterOptions
  );

  return formatter.format(value);
};
