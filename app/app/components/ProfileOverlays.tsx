import React, { FC } from "react"

import { useNavigation } from "@react-navigation/native"
import { Box, IconButton, Row } from "native-base"
import { useMutation, useQueryClient } from "react-query"

import { useApi } from "api/apiProvider"
import { CircleHeartIcon, CircleXIcon } from "components/icons"
import { SynchronizeArrowsIcon } from "components/icons/SynchronizeArrowsIcon"
import { useStore } from "mobx/utils"
import { colors } from "theme/colors"
import { setSecureValue } from "utils/keychain"
import { inject, pressedBackground } from "utils/misc"

const FloatingButton = inject(IconButton, {
  borderRadius: 32,
})

const BackgroundOverlay = inject(Box, {
  position: "absolute",
  bottom: 8,
  display: "flex",
  backgroundColor: colors.gray["900"],
  borderRadius: 32,
})

type Props = {
  profileId: number
  liked?: boolean
  skipped?: boolean
  moveCarousel?(): void
}

export const ProfileOverlays: FC<Props> = ({ profileId, liked, skipped, moveCarousel }) => {
  const api = useApi()
  const { userStore } = useStore()
  const queryClient = useQueryClient()
  const { navigate } = useNavigation()
  const likeProfile = useMutation(api.likes.likeProfile)
  const skipProfile = useMutation(api.likes.skipProfile)
  const forceToken = useMutation(api.users.forceToken, {
    onSuccess: async ({ access, refresh }) => {
      await setSecureValue("accessToken", access)
      await setSecureValue("refreshToken", refresh)
    },
  })

  const handleLike = () => {
    moveCarousel && moveCarousel()
    likeProfile.mutate({ profileId })
  }

  const handleSkip = () => {
    moveCarousel && moveCarousel()
    skipProfile.mutate({ profileId })
  }

  const handleSwitchUser = async () => {
    forceToken.mutate({ profileId })
    queryClient.resetQueries()
    navigate("profilesCarousel")
  }

  return (
    <>
      <Row position="absolute" bottom={0} left={0}>
        <BackgroundOverlay left={8}>
          <FloatingButton
            size={16}
            colorScheme="gray"
            icon={<CircleXIcon color={colors.gray["400"]} />}
            onPress={handleSkip}
            backgroundColor={skipped ? pressedBackground("gray") : undefined}
          />
        </BackgroundOverlay>
        {userStore.staffAuthenticated && (
          <BackgroundOverlay left={32}>
            <FloatingButton
              size={16}
              colorScheme="gray"
              icon={<SynchronizeArrowsIcon color={colors.gray["400"]} />}
              onPress={handleSwitchUser}
              backgroundColor={skipped ? pressedBackground("gray") : undefined}
            />
          </BackgroundOverlay>
        )}
      </Row>
      <BackgroundOverlay right={8}>
        <FloatingButton
          size={16}
          icon={<CircleHeartIcon color={colors.pink["400"]} />}
          onPress={handleLike}
          backgroundColor={liked ? pressedBackground("pink") : undefined}
        />
      </BackgroundOverlay>
    </>
  )
}
