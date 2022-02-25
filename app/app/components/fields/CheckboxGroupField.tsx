import React, { FC } from "react"

import { Checkbox, Column, ICheckboxProps } from "native-base"
import { useController } from "react-hook-form"

import { FieldError, FieldLabel } from "components"
import { ChoiceEnum } from "utils/enums"

type Props = {
  name: string
  label: string
  rules?: any
  items: ChoiceEnum[]
} & Omit<ICheckboxProps, "value" | "onChange">

export const CheckboxGroupField: FC<Props> = ({ name, label, rules, items }) => {
  const { field, fieldState } = useController({
    name,
    rules,
    defaultValue: [],
  })

  return (
    <Checkbox.Group value={field.value} onChange={field.onChange}>
      {label && <FieldLabel label={label} />}
      <Column space={3}>
        {items.map(({ key, label }) => (
          <Checkbox key={key} value={key}>
            {label}
          </Checkbox>
        ))}
      </Column>
      <FieldError error={fieldState.error} />
    </Checkbox.Group>
  )
}
