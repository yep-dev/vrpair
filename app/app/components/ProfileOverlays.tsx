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
        <Row position="absolute" bottom={0} left={0}>
          <BackgroundOverlay left={8}>
            <FloatingButton
              size={16}
              colorScheme="gray"
              icon={<CircleXIcon color="gray.400" />}
              onPress={handlePress(false)}
              backgroundColor={liked === false ? pressedBackground("gray") : undefined}
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
            onPress={handlePress(true)}
            backgroundColor={liked === true ? pressedBackground("pink") : undefined}
          />
        </BackgroundOverlay>
      </>
    )
  },
)
