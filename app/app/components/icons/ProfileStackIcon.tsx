import React from "react"
import { Icon } from "native-base"
import { Path, Rect, G } from "react-native-svg"

export const ProfileStackIcon = ({ color }) => {
  return (
    <Icon viewBox="0 0 24 24">
      <G>
        <Path
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.5,17.5h-5a1,1,0,0,1-1-1V1.5a1,1,0,0,1,1-1h15a1,1,0,0,1,1,1v5"
        />
        <Rect
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          x="6.5"
          y="6.5"
          width="17"
          height="17"
          rx="1"
          ry="1"
        />
      </G>
    </Icon>
  )
}