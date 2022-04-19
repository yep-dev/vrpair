import React, { FC } from "react"

import { Column } from "native-base"

import { CurrentProfile } from "api/index.schemas"
import { CheckboxField, RadioGroupField } from "components"
import { enums } from "utils/enums"

const { setup, role } = enums
export const profile2Fields = ["setup", "role", "mute", "furry"] as const

export type Profile2Form = Pick<CurrentProfile, typeof profile2Fields[number]>

export const Profile2Fields: FC = () => {
  return (
    <Column space={6}>
      <RadioGroupField
        items={[setup.quest, setup.pcvr, setup.fbt]}
        label="VR Setup"
        name="setup"
        rules={{ required: "Select your VR setup type" }}
      />
      <RadioGroupField
        items={[role.sub, role.dom, role.switch]}
        label="Role"
        name="role"
        rules={{ required: "Select your role" }}
      />
      <CheckboxField name="mute" size="sm">
        Mute
      </CheckboxField>
      <CheckboxField name="furry" size="sm">
        Furry
      </CheckboxField>
    </Column>
  )
}
