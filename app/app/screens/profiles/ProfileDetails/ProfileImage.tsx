import * as React from "react"
import { FC } from "react"

import { IImageProps, Image } from "native-base"

import { ProfileImage as TProfileImage } from "api/index.schemas"

type Props = {
  image: TProfileImage
} & IImageProps

export const ProfileImage: FC<Props> = ({ image, ...props }) => (
  <Image
    alt="user photo"
    borderRadius={8}
    height="300px"
    source={{ uri: image.image }}
    {...props}
  />
)
