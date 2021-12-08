import { useApi } from "api/apiProvider"
import { CircleHeartIcon, CircleXIcon } from "components/icons"
import { Profile } from "components/Profile/Profile"
import { IconButton } from "native-base"
import React, { FC, useRef } from "react"
import { Screen } from "components"
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel"
import { useQuery } from "react-query"
import styled from "styled-components"
import colors from "theme/colors"

const LikeButton = styled(IconButton)`
  position: absolute;
  bottom: 32px;
  right: 32px;
  display: flex;
  border-radius: 32px;
`

const SkipButton = styled(LikeButton)`
  left: 32px;
`

export const ProfilesCarouselScreen: FC = () => {
  const api = useApi()
  const { data } = useQuery("profileList", api.profiles.profileList)
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
      <LikeButton
        size={16}
        icon={<CircleHeartIcon color={colors.pink["400"]} />}
        onPress={handleLike}
      />
      <SkipButton
        size={16}
        colorScheme="gray"
        icon={<CircleXIcon color={colors.gray["400"]} />}
        onPress={handleSkip}
      />
    </Screen>
  )
}
