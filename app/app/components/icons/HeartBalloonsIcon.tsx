import React from "react"

import { Icon } from "native-base"
import { Path, G } from "react-native-svg"

export const HeartBalloonsIcon = ({ color }) => {
  return (
    <Icon viewBox="0 0 24 24">
      <G>
        <Path
          d="M9,16.045s8.5-5.805,8.5-10.5c0-5.5-6.5-7-8.5-2-2-5-8.5-3.5-8.5,2C.5,10.24,9,16.045,9,16.045Z"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M11.283,16.975a33.871,33.871,0,0,0,1.681,3.7.487.487,0,0,0,.544.249c1.633-.374,8.233-2.052,9.591-5.023,1.791-3.921-2.8-7.521-6.128-3.275A5.991,5.991,0,0,0,17.078,11"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M9,16.045s.25,5.7-1.5,7.455"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
    </Icon>
  )
}
