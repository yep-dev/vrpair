import React, { FC } from "react"
import { Badge, IBadgeProps } from "native-base"
import colors from "theme/colors"

const RoundBadge: FC<IBadgeProps> = ({ children, ...props }) => (
  <Badge
    bg="red.600"
    rounded={16}
    zIndex={1}
    _text={{
      color: colors.white,
    }}
    {...props}
  >
    {children}
  </Badge>
)

export default RoundBadge
