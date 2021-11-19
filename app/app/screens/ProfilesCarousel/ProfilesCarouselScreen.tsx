import React, { FC } from "react"
import { Screen } from "components"
import { View } from "react-native"
import Carousel from "react-native-reanimated-carousel"

export const ProfilesCarouselScreen: FC = () => {
  return (
    <Screen>
      <Carousel<{ color: string }>
        width={400}
        data={[{ color: "red" }, { color: "purple" }, { color: "yellow" }]}
        renderItem={({ color }) => {
          return (
            <View
              style={{
                backgroundColor: color,
                justifyContent: "center",
                flex: 1,
              }}
            />
          )
        }}
      />
    </Screen>
  )
}
