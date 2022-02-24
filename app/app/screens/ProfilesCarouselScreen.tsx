import React, { FC, useRef, useState } from "react"

import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel"

import { useProfileList } from "api/profiles"
import { Screen, Profile, ProfileOverlays } from "components"

export const ProfilesCarouselScreen: FC = () => {
  const { data } = useProfileList(undefined, {
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
            windowSize={20}
            width={400}
            onScrollEnd={(_, current) => setIndex(current)}
            data={data.results}
            renderItem={({ item }) => <Profile profile={item} />}
          />
          <ProfileOverlays profile={data.results[index]} handlePress={handlePress} />
        </>
      ) : null}
    </Screen>
  )
}
