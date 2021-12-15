import React from "react"

import { Icon } from "native-base"
import { Path, G } from "react-native-svg"

export const ProfileSearchIcon = ({ color }) => {
  return (
    <Icon viewBox="0 0 24 24">
      <G>
        <Path
          d="M7.250 7.750 A3.250 3.250 0 1 0 13.750 7.750 A3.250 3.250 0 1 0 7.250 7.750 Z"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M15.556,16a5.321,5.321,0,0,0-10,0"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth=".989"
        />
        <Path
          d="M0.500 10.500 A10.000 10.000 0 1 0 20.500 10.500 A10.000 10.000 0 1 0 0.500 10.500 Z"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M23.5 23.5L17.571 17.571"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
    </Icon>
  )
}
