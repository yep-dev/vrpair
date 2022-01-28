import React, { FC } from "react"

import { ITextProps, Text } from "native-base"

type Props = {
  label: string
} & ITextProps

export const FieldLabel: FC<Props> = ({ label, ...props }) => (
  <Text fontSize="lg" mb={2} {...props}>
    {label}
  </Text>
)
