import React, { FC, useRef } from "react"

import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel"
import { useQuery } from "react-query"

import { useApi } from "api/apiProvider"
import { profilesKeys } from "api/profiles"
import { Screen, Profile, ProfileOverlays } from "components"

export const ProfilesCarouselScreen: FC = () => {
  const api = useApi()
  const { data } = useQuery(profilesKeys.profileList, api.profiles.profileList, {
    staleTime: 60 * 1000,
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
