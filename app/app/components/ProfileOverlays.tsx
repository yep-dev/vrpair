import React, { FC } from "react"

import { observer } from "mobx-react-lite"
import { Box, IconButton, Row } from "native-base"
import { useMutation } from "react-query"

import { useApi } from "api/apiProvider"
import { CircleHeartIcon, CircleXIcon } from "components/icons"
import { SynchronizeArrowsIcon } from "components/icons/SynchronizeArrowsIcon"
import { useStore } from "mobx/utils"
import { useForceToken } from "utils/hooks"
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
  profileId: number
  liked?: boolean
  skipped?: boolean
  moveCarousel?(): void
}

export const ProfileOverlays: FC<Props> = observer(
  ({ profileId, liked, skipped, moveCarousel }) => {
    const api = useApi()
    const { userStore } = useStore()
    const likeProfile = useMutation(api.likes.likeProfile)
    const skipProfile = useMutation(api.likes.skipProfile)
    const forceToken = useForceToken()

    const handleLike = () => {
      moveCarousel && moveCarousel()
      likeProfile.mutate({ profileId })
    }

    const handleSkip = () => {
      moveCarousel && moveCarousel()
      skipProfile.mutate({ profileId })
    }

    const handleSwitchUser = async () => {
      forceToken.mutate({ profileId: profileId.toString() })
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
              backgroundColor={skipped ? pressedBackground("gray") : undefined}
            />
          </BackgroundOverlay>
          {userStore.staffAuthenticated && (
            <BackgroundOverlay left={32}>
              <FloatingButton
                size={16}
                colorScheme="gray"
                icon={<SynchronizeArrowsIcon color="gray.400" />}
                onPress={handleSwitchUser}
                backgroundColor={skipped ? pressedBackground("gray") : undefined}
              />
            </BackgroundOverlay>
          )}
        </Row>
        <BackgroundOverlay right={8}>
          <FloatingButton
            size={16}
            icon={<CircleHeartIcon color="pink.400" />}
            onPress={handleLike}
            backgroundColor={liked ? pressedBackground("pink") : undefined}
          />
        </BackgroundOverlay>
      </>
    )
  },
)
