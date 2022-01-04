import React from "react"

import { Icon } from "native-base"
import { Path, G } from "react-native-svg"

export const SynchronizeArrowsIcon = ({ color }) => {
  return (
    <Icon viewBox="0 0 24 24" size={16}>
      <G>
        <Path
          d="M1.000 11.998 A11.000 11.000 0 1 0 23.000 11.998 A11.000 11.000 0 1 0 1.000 11.998 Z"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M18,10H9a3,3,0,0,0,0,6h1.5"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M14.997 12.998L17.997 9.998 14.997 6.998"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
    </Icon>
  )
}
