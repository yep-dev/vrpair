import React, { FC } from "react"

import { observer } from "mobx-react-lite"
import { Box, IconButton, Row } from "native-base"
import { useQuery, useQueryClient } from "react-query"

import { Profile, RateProfile } from "api/index.schemas"
import { useRateProfile } from "api/likes"
import { getRateProfileQueryKey } from "apiClient/custom"
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
  liked?: boolean
  handlePress?(): void
}

export const ProfileOverlays: FC<Props> = observer(
  ({ profile, liked, handlePress: handlePressCarousel }) => {
    const { userStore } = useStore()
    const queryClient = useQueryClient()
    const { data } = useQuery<RateProfile>(getRateProfileQueryKey(profile.id), {
      enabled: false,
    })
    const rateProfile = useRateProfile({
      mutation: {
        onMutate: ({ data }) => {
          queryClient.setQueryData(getRateProfileQueryKey(profile.id), data)
        },
        // onError todo: rollback on error
      },
    })
    const forceToken = useForceToken()
    liked = data?.liked ?? liked

    const handlePress = (liked) => () => {
      handlePressCarousel && handlePressCarousel()
      rateProfile.mutate({ data: { profileId: profile.id, liked } })
    }

    const handleSwitchUser = async () => {
      forceToken.mutate({ profileId: profile.id })
    }

    return (
      <>
        <Row bottom={0} left={0} position="absolute">
          <BackgroundOverlay left={8}>
            <FloatingButton
              backgroundColor={liked === false ? pressedBackground("gray") : undefined}
              colorScheme="gray"
              icon={<CircleXIcon color="gray.400" size={16} />}
              size={16}
              onPress={handlePress(false)}
            />
          </BackgroundOverlay>
          {userStore.staffAuthenticated && (
            <BackgroundOverlay left={32}>
              <FloatingButton
                colorScheme="gray"
                icon={<SynchronizeArrowsIcon color="gray.400" size={16} />}
                size={16}
                onPress={handleSwitchUser}
              />
            </BackgroundOverlay>
          )}
        </Row>
        <BackgroundOverlay right={8}>
          <FloatingButton
            backgroundColor={liked === true ? pressedBackground("pink") : undefined}
            icon={<CircleHeartIcon color="pink.400" size={16} />}
            size={16}
            onPress={handlePress(true)}
          />
        </BackgroundOverlay>
      </>
    )
  },
)
