import React from "react"
import { TouchableOpacity, StyleSheet } from "react-native"

import { View, Text } from "native-base"

import { colors } from "theme/colors"
import { ChoiceEnum } from "utils/enums"

export type RadioGroupProps = {
  items: ChoiceEnum[]
  value: string | boolean
  onChange(e: string): void
}

export const RadioGroup = ({ items, value, onChange }: RadioGroupProps) => {
  value = value?.toString()
  return (
    <View borderColor="primary.500" borderRadius={4} borderWidth={1} flexDirection="row">
      {items.map(({ key, label }) => {
        key = key.toString()
        return (
          <TouchableOpacity
            key={key}
            style={[s.button, value === key && s.activeButton]}
            onPress={() => onChange(key)}
          >
            <Text color="primary.500" fontWeight="bold" style={value === key && s.textActive}>
              {label}
            </Text>
          </TouchableOpacity>
        )
      })}
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
