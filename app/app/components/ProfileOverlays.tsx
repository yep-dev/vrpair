import React, { FC } from "react"

import { observer } from "mobx-react-lite"
import { Box, IconButton, Row } from "native-base"
import { useQueryClient } from "react-query"

import { Profile, ProfileDetails } from "api/index.schemas"
import { useRateProfile } from "api/likes"
import { getProfileDetailsQueryKey } from "api/profiles"
import { CircleHeartIcon, CircleXIcon, SynchronizeArrowsIcon } from "components/icons"
import { useStore } from "mobx/utils"
import { useForceToken } from "utils/auth"
import { inject, pressedBackground } from "utils/misc"

const FloatingButton = inject(IconButton, {
  borderRadius: 32,
})

const BackgroundOverlay = inject(Box, {
  position: "absolute",
  bottom: 8,
  display: "flex",
  backgroundColor: "gray.900",
  borderRadius: 32,
})

type Props = {
  profile: Profile
  moveCarousel?(): void
}

export const ProfileOverlays: FC<Props> = observer(({ profile, moveCarousel }) => {
  const { userStore } = useStore()
  const queryClient = useQueryClient()
  const rateProfile = useRateProfile({
    mutation: {
      onSuccess: (data) => {
        queryClient.setQueryData<ProfileDetails>(getProfileDetailsQueryKey(profile.id), data)
      },
    },
  })
  const forceToken = useForceToken()

  const handleLike = () => {
    moveCarousel && moveCarousel()
    rateProfile.mutate({ data: { profileId: profile.id, liked: true } })
  }

  const handleSkip = () => {
    moveCarousel && moveCarousel()
    rateProfile.mutate({ data: { profileId: profile.id, liked: false } })
  }

  const handleSwitchUser = async () => {
    forceToken.mutate({ profileId: profile.id })
  }

  return (
    <>
      <Row position="absolute" bottom={0} left={0}>
        <BackgroundOverlay left={8}>
          <FloatingButton
            size={16}
            colorScheme="gray"
            icon={<CircleXIcon color="gray.400" />}
            onPress={handleSkip}
            backgroundColor={profile.liked === false ? pressedBackground("gray") : undefined}
          />
        </BackgroundOverlay>
        {userStore.staffAuthenticated && (
          <BackgroundOverlay left={32}>
            <FloatingButton
              size={16}
              colorScheme="gray"
              icon={<SynchronizeArrowsIcon color="gray.400" />}
              onPress={handleSwitchUser}
            />
          </BackgroundOverlay>
        )}
      </Row>
      <BackgroundOverlay right={8}>
        <FloatingButton
          size={16}
          icon={<CircleHeartIcon color="pink.400" />}
          onPress={handleLike}
          backgroundColor={profile.liked === true ? pressedBackground("pink") : undefined}
        />
      </BackgroundOverlay>
    </>
  )
})
