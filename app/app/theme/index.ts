import components from "native-base/src/theme/components"
import base from "native-base/src/theme/base"
import borderWidths from "./borders"
import breakpoints from "./breakpoints"
import colors from "./colors"
import radii from "./radius"
import shadows from "./shadows"
import sizes from "./sizes"
import { spacing } from "./space"
import typography from "./typography"
import opacity from "./opacity"

const theme = {
  ...base,
  borderWidths,
  breakpoints,
  colors,
  radii,
  ...typography,
  sizes,
  space: spacing,
  shadows,
  opacity,
  config: {
    useSystemColorMode: false, // TODO: implement this (native-base)
    initialColorMode: "dark",
    accessibleColors: false,
  },
  components,
}

export type ITheme = typeof theme

export const themePropertyMap: any = {
  borderRadius: "radii",
  color: "colors",
  letterSpacing: "letterSpacings",
  lineHeight: "lineHeights",
  fontFamily: "fonts",
  fontSize: "fontSizes",
  fontWeight: "fontWeights",
  size: "sizes",
  space: "space",
  border: "borders",
  shadow: "shadows",
}

export default theme
