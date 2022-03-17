import React from "react"

import { createIcon } from "native-base"
import { G, Path } from "react-native-svg"

export const ArrowLeftIcon = createIcon({
  viewBox: "0 0 24 24",
  path: (
    <G>
      <G>
        <Path
          d="M4.658,12.376l12.47,10.8a.5.5,0,0,0,.707-.052l1.559-1.82a.5.5,0,0,0-.056-.706l-9.892-8.4a.249.249,0,0,1,0-.381l9.892-8.4a.5.5,0,0,0,.056-.706L17.835.881a.5.5,0,0,0-.707-.052L4.658,11.62A.5.5,0,0,0,4.658,12.376Z"
          fill="currentColor"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
    </G>
  ),
})
