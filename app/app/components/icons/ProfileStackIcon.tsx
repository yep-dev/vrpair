import React from "react"

import { createIcon } from "native-base"
import { Path, Rect, G } from "react-native-svg"

export const ProfileStackIcon = createIcon({
  viewBox: "0 0 24 24",
  path: (
    <G>
      <Path
        d="M6.5,17.5h-5a1,1,0,0,1-1-1V1.5a1,1,0,0,1,1-1h15a1,1,0,0,1,1,1v5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Rect
        fill="none"
        height="17"
        rx="1"
        ry="1"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        width="17"
        x="6.5"
        y="6.5"
      />
    </G>
  ),
})
