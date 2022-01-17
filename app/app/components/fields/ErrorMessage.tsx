import React, { FC } from "react"

import { Text } from "native-base"
import { FieldError } from "react-hook-form"

type Props = {
  error?: FieldError
}

export const ErrorMessage: FC<Props> = ({ error }) =>
  error?.message ? <Text color="red.400">{error.message}</Text> : null
