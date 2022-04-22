import React, { FC } from "react"

import { Column } from "native-base"

import { CurrentProfile } from "api/index.schemas"
import { CheckboxGroupField, RadioGroupField } from "components"
import { enums } from "utils/enums"
import { storage } from "utils/misc"

export const preferences2Fields = ["setup", "role", "mute", "furry"] as const
export type Preferences2Form = Pick<
  CurrentProfile["preferences"],
  typeof preferences2Fields[number]
>

export const Preferences2Fields: FC = () => {
  return (
    <Column space={6}>
      <CheckboxGroupField
        items={Object.values(enums.setup)}
        label="Preferred Setups"
        name="setup"
        rules={{ required: "Select your setup preference" }}
      />
      <CheckboxGroupField
        items={Object.values(enums.role)}
        label="Preferred Roles"
        name="role"
        rules={{ required: "Select your role preference" }}
      />
      <RadioGroupField
        defaultValue={enums.mute.any.key}
        items={Object.values(enums.mute)}
        label="Mutes Preference"
        name="mute"
      />
      <RadioGroupField
        defaultValue={
          storage.getObj("profile1").furry ? enums.furry.any.key : enums.furry.false.key
        }
        items={Object.values(enums.furry)}
        label="Furries Preference"
        name="furry"
      />
    </Column>
  )
}
