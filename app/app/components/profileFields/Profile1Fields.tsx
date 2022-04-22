import React, { FC } from "react"

import { Column, Row, Text, View } from "native-base"

import { CurrentProfile } from "api/index.schemas"
import { CheckboxField, RadioGroupField } from "components"
import { enums } from "utils/enums"

const { gender, femAvatar } = enums
export const profile1Fields = ["gender", "trans", "femAvatar"] as const

export type Profile1Form = Pick<CurrentProfile, typeof profile1Fields[number]>

export const Profile1Fields: FC = () => {
  return (
    <Column space={6}>
      <View>
        <RadioGroupField
          items={[gender.male, gender.female, gender.nonBinary]}
          label="Gender"
          name="gender"
          rules={{ required: "Select your gender" }}
        />
        <CheckboxField mt={2} name="trans" size="sm">
          Transgender
        </CheckboxField>
      </View>
      <View>
        <RadioGroupField
          items={[femAvatar.true, femAvatar.false]}
          label="Avatar Type"
          name="femAvatar"
          rules={{ required: "Select your avatar type" }}
        />
        <Row justifyContent="space-evenly" mt={1}>
          <Text>Includes femboy</Text>
          <Text>Includes tomboy</Text>
        </Row>
      </View>
    </Column>
  )
}
