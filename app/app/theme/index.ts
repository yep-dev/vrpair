import base from "native-base/src/theme/base"

import { borderWidths } from "./borders"
import { breakpoints } from "./breakpoints"
import { colors } from "./colors"
import { components } from "./components"
import { opacity } from "./opacity"
import { radii } from "./radius"
import { shadows } from "./shadows"
import { typography } from "./typography"

export const theme: any = {
  ...base,
  borderWidths,
  breakpoints,
  // @ts-ignore todo: fix typings
  colors,
  radii,
  ...typography,
  shadows,
  opacity,
  config: {
    useSystemColorMode: false, // TODO: implement this (native-base)
    initialColorMode: "dark",
    accessibleColors: false,
  },
  components,
}

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
