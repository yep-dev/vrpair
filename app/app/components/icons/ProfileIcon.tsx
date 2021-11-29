import React from "react"
import { Icon } from "native-base"
import { Path, G } from "react-native-svg"

export const ProfileIcon = ({ color }) => {
  return (
    <Icon viewBox="0 0 24 24">
      <G>
        <Path
          d="M0.500 12.000 A11.500 11.500 0 1 0 23.500 12.000 A11.500 11.500 0 1 0 0.500 12.000 Z"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M3.959,20.221a25.59,25.59,0,0,1,5.413-2.352c.837-.309.928-2.229.328-2.889-.866-.953-1.6-2.07-1.6-4.766A3.812,3.812,0,0,1,12,6.047a3.812,3.812,0,0,1,3.9,4.167c0,2.7-.734,3.813-1.6,4.766-.6.66-.509,2.58.328,2.889a25.59,25.59,0,0,1,5.413,2.352"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
    </Icon>
  )
}
