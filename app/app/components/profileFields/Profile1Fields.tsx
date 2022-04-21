import React, { FC } from "react"

import { differenceInYears } from "date-fns"
import { Column, Input, Row, Text, View } from "native-base"
import { Controller, UseFormReturn } from "react-hook-form"

import { CurrentProfile } from "api/index.schemas"
import { useCurrentUser } from "api/users"
import {
  CheckboxField,
  FieldError,
  FieldLabel,
  InputField,
  Profile2Form,
  RadioGroupField,
} from "components"
import { enums } from "utils/enums"

const { gender, femAvatar } = enums
export const profile1Fields = [
  "username",
  "birthMonth",
  "birthYear",
  "gender",
  "trans",
  "femAvatar",
] as const

export type Profile1Form = Pick<CurrentProfile, typeof profile1Fields[number]>

type Props = {
  form: UseFormReturn<Profile1Form & Profile2Form>
}

export const Profile1Fields: FC<Props> = ({ form }) => {
  const { data: discordUsername } = useCurrentUser({
    query: {
      select: (user) => user.discordUsername,
    },
  })

  const { errors } = form.formState

  return (
    <Column space={6}>
      <InputField defaultValue={discordUsername} label="Username" name="username" />
      <View>
        <FieldLabel label="Birth Date" />
        <Row alignItems="center" space={2}>
          <Controller
            control={form.control}
            name="birthMonth"
            render={({ field }) => (
              <Input
                keyboardType="number-pad"
                maxLength={2}
                placeholder="M"
                size="lg"
                value={field.value ? field.value.toString() : ""}
                w="38px"
                onBlur={field.onBlur}
                onChangeText={field.onChange}
              />
            )}
            rules={{
              required: "Birth month is required",
              pattern: {
                value: /^(0?[1-9]|1[0-2])$/,
                message: "Birth month must be between 1 and 12",
              },
            }}
          />
          <Text fontSize="2xl">/</Text>
          <Controller
            control={form.control}
            name="birthYear"
            render={({ field }) => (
              <Input
                keyboardType="number-pad"
                maxLength={4}
                placeholder="YYYY"
                size="lg"
                value={field.value ? field.value.toString() : ""}
                w="58px"
                onBlur={field.onBlur}
                onChangeText={field.onChange}
              />
            )}
            rules={{
              required: "Birth year is required",
              min: {
                value: 1920,
                message: "Birth year must be after 1920",
              },
              validate: (year) => {
                const date = new Date(year, form.getValues("birthMonth"), 1)
                return differenceInYears(new Date(), date) >= 18 || "You must be 18 or older"
              },
            }}
          />
        </Row>
        <FieldError error={errors.birthYear} />
        <FieldError error={errors.birthMonth} />
      </View>
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
