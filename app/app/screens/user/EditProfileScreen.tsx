import React, { FC } from "react"

import { Button, Column } from "native-base"
import { FormProvider, useForm } from "react-hook-form"

import { Screen, Profile1Fields, Profile2Fields } from "components"

export const EditProfileScreen: FC = () => {
  const form = useForm({ defaultValues: {} })

  return (
    <FormProvider {...form}>
      <Screen
        _contentContainerStyle={{
          mx: 5,
        }}
        handlePrev
        heading="Edit Profile"
        scroll
      >
        <Column space={6}>
          <Profile1Fields form={form} />
          <Profile2Fields />
          <Button flex={1} size="lg" onPress={form.handleSubmit()}>
            Save
          </Button>
        </Column>
      </Screen>
    </FormProvider>
  )
}
