import React from "react"

import { createIcon } from "native-base"
import { Path, G } from "react-native-svg"

export const CircleHeartIcon = createIcon({
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
        d="M12,18,6.887,12.665A3.027,3.027,0,0,1,6.32,9.172h0a3.026,3.026,0,0,1,4.846-.786L12,9.222l.835-.835a3.025,3.025,0,0,1,4.845.786h0a3.027,3.027,0,0,1-.567,3.493Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
  ),
})
