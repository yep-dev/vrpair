import React, { FC, useRef } from "react"

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

  return (
    <Screen>
      {data ? (
        <Carousel
          ref={carousel}
          windowSize={20}
          width={400}
          data={data.results}
          renderItem={({ item }) => <Profile profile={item} />}
        />
      ) : null}
      <ProfileOverlays profile={{}} moveCarousel={() => carousel.current?.next()} />
    </Screen>
  )
}
