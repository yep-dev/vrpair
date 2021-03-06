import React from "react"

import { createIcon } from "native-base"
import { Path, G } from "react-native-svg"

export const CircleXIcon = createIcon({
  viewBox: "0 0 24 24",
  path: (
    <G>
      <Path
        d="M0.500 12.000 A11.500 11.500 0 1 0 23.500 12.000 A11.500 11.500 0 1 0 0.500 12.000 Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16.241 7.758L7.756 16.243"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16.241 16.243L7.756 7.758"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
  ),
})
