import React, { FC } from "react"

import { Input, IInputProps } from "native-base"
import { useController } from "react-hook-form"

import { FieldError, FieldLabel } from "components"

type Props = {
  name: string
  label: string
  rules?: any // todo
}

export const InputField: FC<Props & IInputProps> = ({
  name,
  label,
  rules,
  defaultValue,
  ...inputProps
}) => {
  const { field, fieldState } = useController({
    name,
    rules: { required: `${label} is required`, ...rules },
    defaultValue,
  })

  return (
    <>
      <FieldLabel label={label} />
      <Input
        onChangeText={field.onChange}
        onBlur={field.onBlur}
        value={field.value}
        size="lg"
        w={{
          base: "75%",
          md: "25%",
        }}
        {...inputProps}
      />
      <FieldError error={fieldState.error} />
    </>
  )
}
