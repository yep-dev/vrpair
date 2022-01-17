import React, { FC } from "react"

import { Badge, IBadgeProps } from "native-base"

export const RoundBadge: FC<IBadgeProps> = ({ children, ...props }) => (
  <Badge
    bg="red.600"
    rounded={16}
    zIndex={1}
    _text={{
      color: "white",
    }}
    {...props}
  >
    {children}
  </Badge>
)
