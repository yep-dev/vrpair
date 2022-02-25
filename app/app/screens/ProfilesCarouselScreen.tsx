import React, { FC, useRef, useState } from "react"

import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel"

import { useProfileFeed } from "api/profiles"
import { Screen, Profile, ProfileOverlays } from "components"

export const ProfilesCarouselScreen: FC = () => {
  const { data } = useProfileFeed(undefined, {
    query: {
      staleTime: 60 * 1000,
    },
  })
  const carousel = useRef<ICarouselInstance | null>(null)
  const [index, setIndex] = useState(0)

  const handlePress = () => {
    setIndex(index + 1)
    carousel.current?.next()
  }

  return (
    <Screen>
      {data?.results ? (
        <>
          <Carousel
            ref={carousel}
            data={data.results}
            renderItem={({ item }) => <Profile details={item.profile} profile={item.profile} />}
            width={400}
            windowSize={20}
            onScrollEnd={(_, current) => setIndex(current)}
          />
          <ProfileOverlays handlePress={handlePress} profile={data.results[index].profile} />
        </>
      ) : null}
    </Screen>
  )
}
