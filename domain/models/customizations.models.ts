export type TColorScheme =
  | "COLOR_SCHEME1"
  | "COLOR_SCHEME2"
  | "COLOR_SCHEME3"
  | "COLOR_SCHEME4"
  | "TRANSPARENT";

export type TCornerRadius = "NONE" | "SMALL" | "BASE" | "LARGE";

export interface TBaseCustomizationFields {
  colorScheme?: TColorScheme | null;
  cornerRadius?: TCornerRadius | null;
}

export type TImage = {
  id?: string;
  url: string;
  width: number;
  height: number;
  altText?: string | null;
};

export interface TLogoCustomizations {
  /**
   * If set to null, displays the store name.
   */
  image?: TImage | null;
  maxWidth?: number | null;
}

export interface THeaderCustomizationFields extends TBaseCustomizationFields {
  logo?: TLogoCustomizations | null;
}

export interface TCheckoutCustomizationSettings {
  main?: TBaseCustomizationFields | null;
  global?: TBaseCustomizationFields | null;
  footer?: TBaseCustomizationFields | null;
  select?: TBaseCustomizationFields | null;
  favicon?: TBaseCustomizationFields | null;
  control?: TBaseCustomizationFields | null;
  header?: THeaderCustomizationFields | null;
  cartLink?: TBaseCustomizationFields | null;
  checkbox?: TBaseCustomizationFields | null;
  textField?: TBaseCustomizationFields | null;
  choiceList?: TBaseCustomizationFields | null;
  buyerJourney?: TBaseCustomizationFields | null;
  orderSummary?: TBaseCustomizationFields | null;
  headingLevel1?: TBaseCustomizationFields | null;
  headingLevel2?: TBaseCustomizationFields | null;
  headingLevel3?: TBaseCustomizationFields | null;
  primaryButton?: TBaseCustomizationFields | null;
  secondaryButton?: TBaseCustomizationFields | null;
  expressCheckout?: TBaseCustomizationFields | null;
  merchandiseThumbnail?: TBaseCustomizationFields | null;
}
