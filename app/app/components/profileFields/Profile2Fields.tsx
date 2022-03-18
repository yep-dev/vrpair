import React, { FC } from "react"

import { Column } from "native-base"

import { CheckboxField, RadioGroupField } from "components"
import { enums } from "utils/enums"

const { setup, role } = enums

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
