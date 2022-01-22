import React, { FC } from "react"

import { Column, Heading, Input, Row, Text, View } from "native-base"
import { Controller, FormProvider, useForm } from "react-hook-form"
import { useQuery } from "react-query"

import { useApi } from "api/apiProvider"
import { FieldError, FieldLabel, InputField, RadioGroupField } from "components"
import { CheckboxField } from "components/fields/CheckboxField"
import { SetupStep } from "screens/setup/SetupStep"
import { enums } from "utils/enums"

const { gender, femAvatar } = enums

export const Profile1Step: FC = () => {
  const api = useApi()
  const { data: discordUsername } = useQuery("currentUser", api.users.currentUser, {
    select: (user) => user.discordUsername,
  })
  const form = useForm()
  const { errors } = form.formState
  const handleNext = () => {
    form.handleSubmit(console.log)()
  }

  return (
    <SetupStep handleNext={handleNext}>
      <FormProvider {...form}>
        <Column space={5}>
          <Heading>Profile</Heading>
          <InputField name="username" label="Username" defaultValue={discordUsername} />
          <View>
            <FieldLabel label="Birth date" />
            <Row space={2} alignItems="center">
              <Controller
                control={form.control}
                rules={{
                  required: "Birth month is required",
                }}
                render={({ field }) => (
                  <Input
                    onChangeText={field.onChange}
                    onBlur={field.onBlur}
                    value={field.value}
                    w="38px"
                    size="lg"
                    placeholder="M"
                    keyboardType="number-pad"
                  />
                )}
                name="birth.month"
              />
              <Text fontSize="2xl">/</Text>
              <Controller
                control={form.control}
                rules={{
                  required: "Birth year is required",
                }}
                render={({ field }) => (
                  <Input
                    onChangeText={field.onChange}
                    onBlur={field.onBlur}
                    value={field.value}
                    w="58px"
                    size="lg"
                    placeholder="YYYY"
                  />
                )}
                name="birth.year"
              />
            </Row>
            <FieldError error={errors.birth?.month} />
            <FieldError error={errors.birth?.year} />
          </View>
          <View>
            <RadioGroupField
              name="gender"
              label="Gender"
              rules={{ required: "Select your gender" }}
              items={[gender.male, gender.female, gender.nonBinary]}
            />
            <CheckboxField name="trans" size="sm" mt={2}>
              Transgender
            </CheckboxField>
          </View>
          <RadioGroupField
            name="femAvatar"
            label="Avatar"
            rules={{ required: "Select your avatar type" }}
            items={[femAvatar.true, femAvatar.false]}
          />
        </Column>
      </FormProvider>
    </SetupStep>
  )
}
