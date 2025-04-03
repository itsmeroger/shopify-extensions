export interface TThemeProfile {
  id: string;
  name: string;
}

/**
 * Represents the available token options for each section on a Shopify Theme.
 * If set to null, fallbacks to the Shopify original color value.
 */
export interface TThemeBaseColorTokens {
  accent?: string | null;
  background?: string | null;
  border?: string | null;
  decorative?: string | null;
  icon?: string | null;
  text?: string | null;
}

export interface TThemeCtaColorTokens extends TThemeBaseColorTokens {
  hover?: TThemeBaseColorTokens;
}

/**
 * Represents the color scheme of a section on a Shopify Theme.
 * If set to null, fallbacks to the Shopify original scheme value.
 */
export interface TThemeColorScheme {
  base?: TThemeBaseColorTokens | null;
  control?: TThemeBaseColorTokens | null;
  primaryButton?: TThemeCtaColorTokens | null;
  secondaryButton?: TThemeCtaColorTokens | null;
}

export interface TThemeCornerRadius {
  small?: number | null;
  base?: number | null;
  large?: number | null;
}
