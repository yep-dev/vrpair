import { CircleHeartIcon, CircleXIcon } from "components/icons"
import { IconButton } from "native-base"
import React, { FC } from "react"
import colors from "theme/colors"
import { inject } from "utils/misc"

export const LikeButton = inject(IconButton, {
  position: "absolute",
  bottom: 8,
  right: 8,
  display: "flex",
  borderRadius: 32,
  backgroundColor: colors.gray["900"],
})

export const SkipButton = inject(LikeButton, {
  borderWidth: 0,
  left: 8,
})

type Props = {
  handleLike?(): void
  handleSkip?(): void
}

const ProfileOverlays: FC<Props> = ({ handleLike = () => null, handleSkip = () => null }) => {
  return (
    <>
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
    </>
  )
}
export default ProfileOverlays
