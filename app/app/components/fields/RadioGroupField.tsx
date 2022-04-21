import React, { FC } from "react"

import { useController } from "react-hook-form"

import { FieldError, FieldLabel, RadioGroup, RadioGroupProps } from "components"

type Props = {
  name: string
  label: string
  defaultValue?: string | boolean
  rules?: any // todo
} & Omit<RadioGroupProps, "value" | "onChange">

export const RadioGroupField: FC<Props> = ({
  name,
  label,
  rules,
  defaultValue,
  ...radioGroupProps
}) => {
  const { field, fieldState } = useController({
    name,
    rules,
    defaultValue,
  })

  return (
    <>
      <FieldLabel label={label} />
      <RadioGroup {...radioGroupProps} value={field.value} onChange={field.onChange} />
      <FieldError error={fieldState.error} />
    </>
  )
}
