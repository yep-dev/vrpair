import React, { FC } from "react"

import { ITextProps, Text } from "native-base"
import { FieldError as TFieldError } from "react-hook-form"

type Props = {
  error?: TFieldError
} & ITextProps

export const FieldError: FC<Props> = ({ error, ...props }) =>
  error?.message ? (
    <Text color="red.400" mt={1} {...props}>
      {error.message}
    </Text>
  ) : null
