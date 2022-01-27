import React from "react"

import { Checkbox, Row, View } from "native-base"
import { useController } from "react-hook-form"

import { FieldError, FieldLabel } from "components"
import { enums } from "utils/enums"

const { gender } = enums

const rows = [
  [gender.male, gender.maleTrans],
  [gender.female, gender.femaleTrans],
]

export const GenderCheckboxField = () => {
  const { field, fieldState } = useController({
    name: "gender",
    rules: { required: "Select genders that you prefer" },
    defaultValue: [],
  })

  const handleChange = (values) => {
    if (values.includes(gender.male.key) && !field.value.includes(gender.male.key)) {
      field.onChange([...values, enums.gender.maleTrans.key])
    } else if (values.includes(gender.female.key) && !field.value.includes(gender.female.key)) {
      field.onChange([...values, enums.gender.femaleTrans.key])
    } else {
      field.onChange(values)
    }
  }

  return (
    <Checkbox.Group onChange={handleChange} value={field.value}>
      <FieldLabel label="Preferred genders" />
      {rows.map((row, i) => (
        <Row key={i} flex={1}>
          {row.map(({ key, label }) => (
            <View key={key} flex={1} mb={3}>
              <Checkbox value={key} flex={1}>
                {label}
              </Checkbox>
            </View>
          ))}
        </Row>
      ))}
      <Checkbox value={gender.nonBinary.key}>{gender.nonBinary.label}</Checkbox>
      <FieldError error={fieldState.error} />
    </Checkbox.Group>
  )
}
