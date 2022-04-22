import React, { FC } from "react"

import { Column } from "native-base"

import { CurrentProfile } from "api/index.schemas"
import { RadioGroupField, AgeRangeField, GenderCheckboxField } from "components"
import { enums } from "utils/enums"

export const preferences1Fields = ["gender", "femAvatar", "ageMin", "ageMax"] as const
export type Preferences1Form = Pick<
  CurrentProfile["preferences"],
  typeof preferences1Fields[number]
>

export const Preferences1Fields: FC = () => {
  return (
    <Column space={6}>
      <GenderCheckboxField />
      <RadioGroupField
        items={Object.values(enums.femAvatar)}
        label="Preferred Avatar Type"
        name="femAvatar"
        rules={{ required: "Select preferred avatar type" }}
      />
      <AgeRangeField />
    </Column>
  )
}
