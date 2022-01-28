import React from "react"

import { Slider } from "@miblanchard/react-native-slider"
import { Text, View } from "native-base"
import { useController } from "react-hook-form"

import { FieldLabel } from "components"
import { colors } from "theme/colors"

export const AgeRangeField = () => {
  const ageMin = useController({
    name: "ageMin",
    defaultValue: 18,
  })
  const ageMax = useController({
    name: "ageMax",
    defaultValue: 35,
  })

  return (
    <View>
      <FieldLabel label="Preferred Age Range" mb={6} />
      <Slider
        onValueChange={(value) => {
          ageMin.field.onChange(value[0])
          ageMax.field.onChange(value[1])
        }}
        value={[ageMin.field.value, ageMax.field.value]}
        animateTransitions
        maximumTrackTintColor={colors.gray["400"]}
        maximumValue={35}
        minimumTrackTintColor={colors.pink["300"]}
        minimumValue={18}
        step={1}
        thumbTintColor={colors.primary["500"]}
        renderAboveThumbComponent={(index) => (
          <Text mb={-1} ml="-1px" fontSize="md">
            {[ageMin, ageMax][index].field.value}
            {ageMax.field.value === 35 && index === 1 && "+"}
          </Text>
        )}
      />
    </View>
  )
}
