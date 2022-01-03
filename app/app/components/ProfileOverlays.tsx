import React, { FC } from "react"

import { Box, IconButton } from "native-base"

import { CircleHeartIcon, CircleXIcon } from "components/icons"
import { colors } from "theme/colors"
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
  liked?: boolean
  skipped?: boolean
  handleLike(): void
  handleSkip(): void
}

export const ProfileOverlays: FC<Props> = ({ liked, skipped, handleLike, handleSkip }) => {
  return (
    <>
      <BackgroundOverlay left={8}>
        <FloatingButton
          size={16}
          colorScheme="gray"
          icon={<CircleXIcon color={colors.gray["400"]} />}
          onPress={handleSkip}
          backgroundColor={skipped ? pressedBackground("gray") : undefined}
        />
      </BackgroundOverlay>
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
