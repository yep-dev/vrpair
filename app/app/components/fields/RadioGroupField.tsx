import React, { FC } from "react"

import { useController } from "react-hook-form"

import { FieldError, FieldLabel, RadioGroup } from "components"
import { RadioGroupProps } from "components/RadioGroup"

type Props = {
  name: string
  label: string
  defaultValue?: string
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
      <RadioGroup {...radioGroupProps} onChange={field.onChange} value={field.value} />
      <FieldError error={fieldState.error} />
    </>
  )
}
