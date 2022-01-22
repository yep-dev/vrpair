import React from "react"
import { TouchableOpacity, StyleSheet } from "react-native"

import { View, Text } from "native-base"

import { colors } from "theme/colors"
import { ChoiceEnum } from "utils/enums"

export type TRadioGroup = {
  items: ChoiceEnum[]
  value: string
  onChange(e: string): void
}

export const RadioGroup = ({ items, value, onChange }: TRadioGroup) => {
  return (
    <View flexDirection="row" borderColor="primary.500" borderWidth={1} borderRadius={4}>
      {items.map(({ key, label }) => (
        <TouchableOpacity
          onPress={() => onChange(key)}
          key={key}
          style={[s.button, value === key && s.activeButton]}
        >
          <Text color="primary.500" style={value === key && s.textActive}>
            {label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

const s = StyleSheet.create({
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 9,
  },
  activeButton: {
    backgroundColor: colors.primary["500"],
  },
  textActive: {
    color: colors.white,
  },
})
