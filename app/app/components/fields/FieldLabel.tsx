import React, { FC } from "react"

import { Text } from "native-base"

type Props = {
  label: string
}

export const FieldLabel: FC<Props> = ({ label }) => (
  <Text fontSize="md" mb={1}>
    {label}
  </Text>
)
