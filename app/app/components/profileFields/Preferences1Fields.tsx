import React, { FC } from "react"

import { Column } from "native-base"

import { RadioGroupField } from "components"
import { AgeRangeField } from "components/profileFields/AgeRangeField"
import { GenderCheckboxField } from "components/profileFields/GenderCheckboxField"
import { enums } from "utils/enums"

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
