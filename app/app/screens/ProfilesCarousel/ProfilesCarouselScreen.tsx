import { useApi } from "api/apiProvider"
import { Profile } from "components/Profile/Profile"
import { ProfileOverlays } from "components/ProfileOverlays/ProfileOverlays"
import React, { FC, useRef } from "react"
import { Screen } from "components"
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel"
import { useQuery } from "react-query"

export const ProfilesCarouselScreen: FC = () => {
  const api = useApi()
  const { data } = useQuery("profileList", api.profiles.profileList, { staleTime: 60 * 1000 })
  const carousel = useRef<ICarouselInstance | null>(null)

  const handleLike = () => {
    carousel.current?.next()
  }

  const handleSkip = () => {
    carousel.current?.next()
  }

  return (
    <Screen>
      {data ? (
        <Carousel
          ref={carousel}
          windowSize={20}
          width={400}
          data={data.results}
          renderItem={(profile) => <Profile profile={profile} />}
        />
      ) : null}
      <ProfileOverlays handleLike={handleLike} handleSkip={handleSkip} />
    </Screen>
  )
}
