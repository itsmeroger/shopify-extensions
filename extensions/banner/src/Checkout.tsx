import {
  View,
  Image,
  Style,
  TextBlock,
  Pressable,
  useSettings,
  reactExtension,
} from "@shopify/ui-extensions-react/checkout";

import type {
  Fit,
  Status,
  BorderStyle,
  CornerRadius,
} from "@shopify/ui-extensions-react/checkout";

import type { TextSize } from "@shopify/ui-extensions/build/ts/surfaces/checkout/components/shared";

type TBannerTextStyle =
  | "info"
  | "accent"
  | "success"
  | "warning"
  | "subdued"
  | "critical"
  | "decorative";

type TBannerSettings = {
  to?: string;
  width?: number;
  height?: number;
  status?: Status;
  message?: string;
  endDate?: string;
  startDate?: string;
  textSize?: TextSize;
  backgroundImageFit?: Fit;
  borderStyle?: BorderStyle;
  borderRadius?: CornerRadius;
  textStyle?: TBannerTextStyle;
  mobileBackgroundImage?: string;
  tabletBackgroundImage?: string;
  desktopBackgroundImage?: string;
};

export default reactExtension("purchase.checkout.block.render", () => (
  <Extension />
));

const handleAspectRatio = (params?: { width?: number; height?: number }) => {
  const { width, height } = params ?? {};

  if (!width || Number.isNaN(width)) return;
  if (!height || Number.isNaN(height)) return;

  const aspectRatio = width / height;

  return aspectRatio;
};

const handleIsVisible = (params?: TBannerSettings) => {
  const {
    endDate,
    message,
    startDate,
    mobileBackgroundImage,
    tabletBackgroundImage,
    desktopBackgroundImage,
  } = params ?? {};

  const backgroundImage =
    mobileBackgroundImage || tabletBackgroundImage || desktopBackgroundImage;

  if (!message && !backgroundImage) return false;

  if (!endDate && !startDate) return true;

  const currentTimestamp = Date.now();

  const endTimestamp = Date.parse(endDate);

  if (!Number.isNaN(endTimestamp) && currentTimestamp > endTimestamp) {
    return false;
  }

  const startTimestamp = Date.parse(startDate);

  if (!Number.isNaN(startTimestamp) && currentTimestamp < startTimestamp) {
    return false;
  }

  return true;
};

function Extension() {
  const {
    to,
    width,
    message,
    endDate,
    startDate,
    mobileBackgroundImage,
    tabletBackgroundImage,
    desktopBackgroundImage,
    height = 50,
    textSize = "large",
    textStyle = "info",
    borderStyle = "base",
    borderRadius = "large",
    backgroundImageFit = "contain",
  } = useSettings() as TBannerSettings;

  const Wrapper = to ? Pressable : View;

  const aspectRatio = handleAspectRatio({ width, height });

  const backgroundImage = Style.default(mobileBackgroundImage)
    .when({ viewportInlineSize: { min: "medium" } }, tabletBackgroundImage)
    .when({ viewportInlineSize: { min: "large" } }, desktopBackgroundImage);

  const isVisible = handleIsVisible({
    message,
    endDate,
    startDate,
    mobileBackgroundImage,
    tabletBackgroundImage,
    desktopBackgroundImage,
  });

  if (!isVisible) return null;

  return (
    <Wrapper to={to} minInlineSize="fill">
      <View
        overflow="hidden"
        border={borderStyle}
        maxInlineSize="fill"
        maxBlockSize={height}
        minBlockSize={height}
        blockAlignment="center"
        borderRadius={borderRadius}
        position={{ type: "relative" }}
      >
        {backgroundImage && (
          <Image
            fit={backgroundImageFit}
            source={backgroundImage}
            aspectRatio={aspectRatio}
          />
        )}

        <View
          minInlineSize="fill"
          background="transparent"
          position={{ type: "absolute" }}
        >
          <TextBlock
            size={textSize}
            appearance={textStyle}
            inlineAlignment="center"
          >
            {message}
          </TextBlock>
        </View>
      </View>
    </Wrapper>
  );
}
