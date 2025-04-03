import type { TThemeColorScheme } from "../../../domain/models/theme.models";

/**
 * GLOBAL uses COLOR_SCHEME1 by default
 */
export const COLOR_SCHEME1 = {
  base: {
    accent: "#74758b",
    background: "#f4f4f5",
    border: "#e6e6e6",
    decorative: "#294bc3",
    icon: "#115683",
    text: "#333333",
  },
  control: {
    accent: null,
    background: "#ffffff",
    border: "#cccccc",
    decorative: null,
    icon: null,
    text: null,
  },
  primaryButton: {
    accent: null,
    background: "#21a69d",
    border: null,
    decorative: null,
    icon: null,
    text: "#ffffff",
    hover: {
      accent: null,
      background: "#197b74",
      border: null,
      decorative: null,
      icon: null,
      text: "#ffffff",
    },
  },
  secondaryButton: null,
} satisfies TThemeColorScheme;

export const COLOR_SCHEME2 = {
  base: {
    accent: "#ffffff",
    background: "#262636",
    border: "#e6e6e6",
    decorative: "#ffffff",
    icon: "#ffffff",
    text: "#b7bccc",
  },
  control: null,
  primaryButton: null,
  secondaryButton: null,
} satisfies TThemeColorScheme;

export const COLOR_SCHEME_MAP = {
  scheme1: COLOR_SCHEME1,
  scheme2: COLOR_SCHEME2,
};
