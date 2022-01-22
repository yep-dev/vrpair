import React, { FC } from "react"

import { Checkbox, ICheckboxProps } from "native-base"
import { useController } from "react-hook-form"

import { FieldError, FieldLabel } from "components"

type Props = {
  name: string
  label?: string
  rules?: any
} & Omit<ICheckboxProps, "value" | "onChange">

export const CheckboxField: FC<Props> = ({ name, label, rules, ...props }) => {
  const { field, fieldState } = useController({
    name,
    rules,
    defaultValue: false,
  })

  return (
    <>
      {label && <FieldLabel label={label} />}
      <Checkbox {...props} onChange={field.onChange} value={field.value} />
      <FieldError error={fieldState.error} />
    </>
  )
}
