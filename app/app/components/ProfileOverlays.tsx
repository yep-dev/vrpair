import React, { FC } from "react"

import { observer } from "mobx-react-lite"
import { Box, IconButton, Row } from "native-base"
import { useMutation, useQueryClient } from "react-query"

import { useApi } from "api/apiProvider"
import { Profile, ProfileDetails, profilesKeys } from "api/profiles"
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
  const api = useApi()
  const { userStore } = useStore()
  const queryClient = useQueryClient()
  const rateProfile = useMutation(api.likes.rateProfile, {
    onSuccess: (data) => {
      queryClient.setQueryData<ProfileDetails>(profilesKeys.profileDetails(profile.id), data)
    },
  })
  const forceToken = useForceToken()

  const handleLike = () => {
    moveCarousel && moveCarousel()
    rateProfile.mutate({ profileId: profile.id, liked: true })
  }

  const handleSkip = () => {
    moveCarousel && moveCarousel()
    rateProfile.mutate({ profileId: profile.id, liked: false })
  }

  const handleSwitchUser = async () => {
    forceToken.mutate({ profileId: profile.id.toString() })
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
