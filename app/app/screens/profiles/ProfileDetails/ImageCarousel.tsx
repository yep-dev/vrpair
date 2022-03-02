import { FC } from "react"
import * as React from "react"
import { Dimensions } from "react-native"

import { View } from "native-base"
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated"
import Carousel from "react-native-reanimated-carousel"

import { ProfileImage as TProfileImage } from "api/index.schemas"
import { colors } from "theme/colors"

import { ProfileImage } from "./ProfileImage"

const PAGE_WIDTH = Dimensions.get("window").width

type Props = {
  images: TProfileImage[]
}

const ImageCarousel: FC<Props> = ({ images }) => {
  const progressValue = useSharedValue<number>(0)
  return (
    <View alignItems="center">
      <Carousel
        data={images}
        height={300}
        loop={false}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        renderItem={({ item }) => <ProfileImage image={item} />}
        snapEnabled
        width={PAGE_WIDTH}
        onProgressChange={(_, absoluteProgress) => (progressValue.value = absoluteProgress)}
      />
      {!!progressValue && (
        <View
          alignSelf="center"
          bottom={5}
          flexDirection="row"
          justifyContent="space-between"
          position="absolute"
        >
          {images.map((_, index) => {
            return (
              <Indicator
                key={index}
                animValue={progressValue}
                index={index}
                length={images.length}
              />
            )
          })}
        </View>
      )}
    </View>
  )
}

const Indicator: React.FC<{
  index: number
  length: number
  animValue: Animated.SharedValue<number>
  isRotate?: boolean
}> = (props) => {
  const { animValue, index, length } = props
  const width = 12

  const animStyle = useAnimatedStyle(() => {
    let inputRange = [index - 1, index, index + 1]
    let outputRange = [-width, 0, width]

    if (index === 0 && animValue?.value > length - 1) {
      inputRange = [length - 1, length, length + 1]
      outputRange = [-width, 0, width]
    }

    return {
      transform: [
        {
          translateX: interpolate(animValue?.value, inputRange, outputRange, Extrapolate.CLAMP),
        },
      ],
    }
  }, [animValue, index, length])
  return (
    <View
      backgroundColor="gray.300"
      borderRadius={12}
      height={3}
      marginX={3}
      overflow="hidden"
      width={3}
    >
      <Animated.View
        style={[
          {
            borderRadius: 12,
            flex: 1,
            backgroundColor: colors.pink["500"],
          },
          animStyle,
        ]}
      />
    </View>
  )
}

export default ImageCarousel
