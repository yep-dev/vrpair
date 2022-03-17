import React from "react"

import { createIcon } from "native-base"
import { G, Circle, Path } from "react-native-svg"

export const ProfileIcon = createIcon({
  viewBox: "0 0 24 24",
  path: (
    <G>
      <Circle
        cx="12"
        cy="6.75"
        fill="none"
        r="5.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M3,22.75a9,9,0,0,1,18,0Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
  ),
})
