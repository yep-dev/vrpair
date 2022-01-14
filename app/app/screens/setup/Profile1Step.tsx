import React, { FC } from "react"

import { Column, Heading } from "native-base"
import { FormProvider, useForm } from "react-hook-form"

import { InputField } from "components/fields/InputField"
import { SetupStep } from "screens/setup/SetupStep"

export const Profile1Step: FC = () => {
  const form = useForm()
  const handleNext = () => {
    form.handleSubmit(console.log)()
  }

  return (
    <SetupStep handleNext={handleNext}>
      <FormProvider {...form}>
        <Column space={4}>
          <Heading>Profile</Heading>
          <InputField name="username" label="Username" />
          {/* <FormInput name="birthDate" label="Birth Date" /> */}
          {/* <FormInput name="gender" label="Gender" /> */}
          {/* <FormInput name="avatar" label="Avatar" /> */}
        </Column>
      </FormProvider>
    </SetupStep>
  )
}
