import React from "react"

import { Icon } from "native-base"
import { Path, G } from "react-native-svg"

import { colors } from "theme/colors"

export const SmileyUnhappy = ({ color = colors.gray["50"] }) => {
  return (
    <Icon viewBox="0 0 24 24" size={12}>
      <G>
        <Path
          d="M0.500 12.000 A11.500 11.500 0 1 0 23.500 12.000 A11.500 11.500 0 1 0 0.500 12.000 Z"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M6.5,9.75a.25.25,0,1,1-.25.25.25.25,0,0,1,.25-.25"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M17.5,9.75a.25.25,0,1,0,.25.25.25.25,0,0,0-.25-.25"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M10.5,19.611a6.8,6.8,0,0,1,7-3"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
    </Icon>
  )
}
