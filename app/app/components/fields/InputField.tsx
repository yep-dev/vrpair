import React, { FC } from "react"

import { View, Text, Input, IInputProps } from "native-base"
import { useController } from "react-hook-form"

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
  const { field } = useController({
    name,
    rules: { required: `${label} is required`, ...rules },
    defaultValue,
  })

  return (
    <View>
      {label && <Text>{label}</Text>}
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
    </View>
  )
}
