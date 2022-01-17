import React, { FC } from "react"

import { View, Text, Input, IInputProps, Column } from "native-base"
import { useController } from "react-hook-form"

import { ErrorMessage } from "components/fields/ErrorMessage"

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
    <Column space={1}>
      <Text fontSize="md">{label}</Text>
      <View>
        <Input
          onChangeText={field.onChange}
          onBlur={field.onBlur}
          value={field.value}
          w={{
            base: "75%",
            md: "25%",
          }}
          {...inputProps}
        />
      </View>
      <ErrorMessage error={fieldState.error} />
    </Column>
  )
}
